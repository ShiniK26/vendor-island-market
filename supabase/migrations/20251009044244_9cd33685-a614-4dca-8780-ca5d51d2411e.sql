-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create enum for crypto types
CREATE TYPE public.crypto_type AS ENUM ('BTC', 'ETH', 'USDT_TRC', 'USDT_ERC');

-- Create deposit_requests table
CREATE TABLE public.deposit_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  crypto_type public.crypto_type NOT NULL,
  amount DECIMAL(20, 8) NOT NULL,
  receipt_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.deposit_requests ENABLE ROW LEVEL SECURITY;

-- Users can view their own deposit requests
CREATE POLICY "Users can view own deposits"
  ON public.deposit_requests
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own deposit requests
CREATE POLICY "Users can create own deposits"
  ON public.deposit_requests
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_deposit_requests_updated_at
  BEFORE UPDATE ON public.deposit_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for deposit receipts
INSERT INTO storage.buckets (id, name, public)
VALUES ('deposit-receipts', 'deposit-receipts', false);

-- Storage policies for deposit receipts
CREATE POLICY "Users can upload their own receipts"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'deposit-receipts' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own receipts"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'deposit-receipts' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );