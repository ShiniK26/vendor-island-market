-- Create wallet/ledger system for users
CREATE TABLE public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  available_balance NUMERIC(18, 8) NOT NULL DEFAULT 0,
  reserved_balance NUMERIC(18, 8) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USDT',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own wallet"
ON public.wallets FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all wallets"
ON public.wallets FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update wallets"
ON public.wallets FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Create wallet upon user signup (add to existing trigger or create new)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, user_display_id, account_level)
  VALUES (NEW.id, generate_user_display_id(), 'normal');
  
  INSERT INTO public.wallets (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

-- Product catalog for imported products
CREATE TABLE public.catalog_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
  
  -- Basic info
  name TEXT NOT NULL,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  
  -- Supplier info
  supplier_name TEXT,
  supplier_link TEXT,
  supplier_product_id TEXT,
  
  -- Pricing
  cost_price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  shipping_cost NUMERIC(10, 2) NOT NULL DEFAULT 0,
  selling_price NUMERIC(10, 2),
  
  -- Shipping
  shipping_time_min INTEGER, -- days
  shipping_time_max INTEGER, -- days
  country_restrictions TEXT[] DEFAULT '{}',
  
  -- Variants stored as JSONB
  variants JSONB DEFAULT '[]',
  
  -- Status
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  
  -- Price tracking
  last_price_check TIMESTAMP WITH TIME ZONE,
  price_changed BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.catalog_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own products"
ON public.catalog_products FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own products"
ON public.catalog_products FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own products"
ON public.catalog_products FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own products"
ON public.catalog_products FOR DELETE
USING (auth.uid() = user_id);

-- Pricing rules engine
CREATE TABLE public.pricing_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  name TEXT NOT NULL,
  priority INTEGER NOT NULL DEFAULT 0, -- higher = applied first
  
  -- Conditions (all optional, combined with AND)
  category TEXT,
  min_price NUMERIC(10, 2),
  max_price NUMERIC(10, 2),
  shipping_zone TEXT,
  
  -- Markup settings
  markup_type TEXT NOT NULL DEFAULT 'percentage' CHECK (markup_type IN ('percentage', 'fixed', 'tiered')),
  markup_value NUMERIC(10, 2) NOT NULL DEFAULT 25, -- percentage or fixed amount
  
  -- Additional fees
  handling_fee NUMERIC(10, 2) DEFAULT 0,
  minimum_profit NUMERIC(10, 2) DEFAULT 3, -- minimum profit per item
  
  -- Rounding
  rounding_rule TEXT DEFAULT 'none' CHECK (rounding_rule IN ('none', 'up', 'down', 'nearest', 'end_99')),
  
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.pricing_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pricing rules"
ON public.pricing_rules FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own pricing rules"
ON public.pricing_rules FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pricing rules"
ON public.pricing_rules FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own pricing rules"
ON public.pricing_rules FOR DELETE
USING (auth.uid() = user_id);

-- Orders table
CREATE TYPE public.order_status AS ENUM (
  'pending_payment',
  'paid',
  'funds_reserved',
  'needs_topup',
  'ordered_from_supplier',
  'shipped',
  'delivered',
  'settled',
  'cancelled',
  'refunded'
);

CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  store_id UUID REFERENCES public.stores(id),
  
  -- Customer info
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  shipping_address JSONB,
  
  -- Order details
  order_number TEXT NOT NULL UNIQUE,
  status order_status NOT NULL DEFAULT 'pending_payment',
  
  -- Financials
  subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0,
  shipping_total NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total_paid NUMERIC(10, 2) NOT NULL DEFAULT 0,
  
  supplier_cost NUMERIC(10, 2),
  reserved_amount NUMERIC(10, 2),
  profit NUMERIC(10, 2),
  platform_fee NUMERIC(10, 2),
  
  -- Tracking
  supplier_order_id TEXT,
  tracking_number TEXT,
  tracking_url TEXT,
  
  -- Timestamps
  paid_at TIMESTAMP WITH TIME ZONE,
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  settled_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vendors can view own orders"
ON public.orders FOR SELECT
USING (auth.uid() = vendor_id);

CREATE POLICY "Admins can view all orders"
ON public.orders FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update orders"
ON public.orders FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Order items
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.catalog_products(id),
  
  product_name TEXT NOT NULL,
  variant_info JSONB,
  quantity INTEGER NOT NULL DEFAULT 1,
  
  unit_price NUMERIC(10, 2) NOT NULL,
  cost_price NUMERIC(10, 2) NOT NULL,
  shipping_cost NUMERIC(10, 2) DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items"
ON public.order_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND orders.vendor_id = auth.uid()
  )
);

-- Wallet transactions ledger
CREATE TYPE public.transaction_type AS ENUM (
  'deposit',
  'withdrawal',
  'reserve',
  'release',
  'profit',
  'fee',
  'refund'
);

CREATE TABLE public.wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID REFERENCES public.wallets(id) ON DELETE CASCADE NOT NULL,
  order_id UUID REFERENCES public.orders(id),
  
  type transaction_type NOT NULL,
  amount NUMERIC(18, 8) NOT NULL,
  balance_after NUMERIC(18, 8) NOT NULL,
  
  description TEXT,
  reference_id TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
ON public.wallet_transactions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.wallets 
    WHERE wallets.id = wallet_transactions.wallet_id 
    AND wallets.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can view all transactions"
ON public.wallet_transactions FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at columns
CREATE TRIGGER update_wallets_updated_at
BEFORE UPDATE ON public.wallets
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_catalog_products_updated_at
BEFORE UPDATE ON public.catalog_products
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pricing_rules_updated_at
BEFORE UPDATE ON public.pricing_rules
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Generate order number function
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  RETURN 'ORD-' || TO_CHAR(now(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0');
END;
$$;