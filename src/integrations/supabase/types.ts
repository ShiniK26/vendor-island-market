export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      catalog_products: {
        Row: {
          cost_price: number
          country_restrictions: string[] | null
          created_at: string
          description: string | null
          id: string
          images: string[] | null
          last_price_check: string | null
          name: string
          price_changed: boolean | null
          selling_price: number | null
          shipping_cost: number
          shipping_time_max: number | null
          shipping_time_min: number | null
          status: string
          store_id: string | null
          supplier_link: string | null
          supplier_name: string | null
          supplier_product_id: string | null
          updated_at: string
          user_id: string
          variants: Json | null
        }
        Insert: {
          cost_price?: number
          country_restrictions?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          last_price_check?: string | null
          name: string
          price_changed?: boolean | null
          selling_price?: number | null
          shipping_cost?: number
          shipping_time_max?: number | null
          shipping_time_min?: number | null
          status?: string
          store_id?: string | null
          supplier_link?: string | null
          supplier_name?: string | null
          supplier_product_id?: string | null
          updated_at?: string
          user_id: string
          variants?: Json | null
        }
        Update: {
          cost_price?: number
          country_restrictions?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          last_price_check?: string | null
          name?: string
          price_changed?: boolean | null
          selling_price?: number | null
          shipping_cost?: number
          shipping_time_max?: number | null
          shipping_time_min?: number | null
          status?: string
          store_id?: string | null
          supplier_link?: string | null
          supplier_name?: string | null
          supplier_product_id?: string | null
          updated_at?: string
          user_id?: string
          variants?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "catalog_products_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      deposit_requests: {
        Row: {
          amount: number
          created_at: string
          crypto_type: Database["public"]["Enums"]["crypto_type"]
          id: string
          receipt_url: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          crypto_type: Database["public"]["Enums"]["crypto_type"]
          id?: string
          receipt_url?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          crypto_type?: Database["public"]["Enums"]["crypto_type"]
          id?: string
          receipt_url?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          cost_price: number
          created_at: string
          id: string
          order_id: string
          product_id: string | null
          product_name: string
          quantity: number
          shipping_cost: number | null
          unit_price: number
          variant_info: Json | null
        }
        Insert: {
          cost_price: number
          created_at?: string
          id?: string
          order_id: string
          product_id?: string | null
          product_name: string
          quantity?: number
          shipping_cost?: number | null
          unit_price: number
          variant_info?: Json | null
        }
        Update: {
          cost_price?: number
          created_at?: string
          id?: string
          order_id?: string
          product_id?: string | null
          product_name?: string
          quantity?: number
          shipping_cost?: number | null
          unit_price?: number
          variant_info?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "catalog_products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_email: string
          customer_name: string | null
          delivered_at: string | null
          id: string
          order_number: string
          paid_at: string | null
          platform_fee: number | null
          profit: number | null
          reserved_amount: number | null
          settled_at: string | null
          shipped_at: string | null
          shipping_address: Json | null
          shipping_total: number
          status: Database["public"]["Enums"]["order_status"]
          store_id: string | null
          subtotal: number
          supplier_cost: number | null
          supplier_order_id: string | null
          total_paid: number
          tracking_number: string | null
          tracking_url: string | null
          updated_at: string
          vendor_id: string
        }
        Insert: {
          created_at?: string
          customer_email: string
          customer_name?: string | null
          delivered_at?: string | null
          id?: string
          order_number: string
          paid_at?: string | null
          platform_fee?: number | null
          profit?: number | null
          reserved_amount?: number | null
          settled_at?: string | null
          shipped_at?: string | null
          shipping_address?: Json | null
          shipping_total?: number
          status?: Database["public"]["Enums"]["order_status"]
          store_id?: string | null
          subtotal?: number
          supplier_cost?: number | null
          supplier_order_id?: string | null
          total_paid?: number
          tracking_number?: string | null
          tracking_url?: string | null
          updated_at?: string
          vendor_id: string
        }
        Update: {
          created_at?: string
          customer_email?: string
          customer_name?: string | null
          delivered_at?: string | null
          id?: string
          order_number?: string
          paid_at?: string | null
          platform_fee?: number | null
          profit?: number | null
          reserved_amount?: number | null
          settled_at?: string | null
          shipped_at?: string | null
          shipping_address?: Json | null
          shipping_total?: number
          status?: Database["public"]["Enums"]["order_status"]
          store_id?: string | null
          subtotal?: number
          supplier_cost?: number | null
          supplier_order_id?: string | null
          total_paid?: number
          tracking_number?: string | null
          tracking_url?: string | null
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_rules: {
        Row: {
          category: string | null
          created_at: string
          handling_fee: number | null
          id: string
          is_active: boolean
          markup_type: string
          markup_value: number
          max_price: number | null
          min_price: number | null
          minimum_profit: number | null
          name: string
          priority: number
          rounding_rule: string | null
          shipping_zone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          handling_fee?: number | null
          id?: string
          is_active?: boolean
          markup_type?: string
          markup_value?: number
          max_price?: number | null
          min_price?: number | null
          minimum_profit?: number | null
          name: string
          priority?: number
          rounding_rule?: string | null
          shipping_zone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          handling_fee?: number | null
          id?: string
          is_active?: boolean
          markup_type?: string
          markup_value?: number
          max_price?: number | null
          min_price?: number | null
          minimum_profit?: number | null
          name?: string
          priority?: number
          rounding_rule?: string | null
          shipping_zone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_level: Database["public"]["Enums"]["account_level"]
          created_at: string
          id: string
          updated_at: string
          user_display_id: string
        }
        Insert: {
          account_level?: Database["public"]["Enums"]["account_level"]
          created_at?: string
          id: string
          updated_at?: string
          user_display_id: string
        }
        Update: {
          account_level?: Database["public"]["Enums"]["account_level"]
          created_at?: string
          id?: string
          updated_at?: string
          user_display_id?: string
        }
        Relationships: []
      }
      stores: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          amount: number
          balance_after: number
          created_at: string
          description: string | null
          id: string
          order_id: string | null
          reference_id: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          wallet_id: string
        }
        Insert: {
          amount: number
          balance_after: number
          created_at?: string
          description?: string | null
          id?: string
          order_id?: string | null
          reference_id?: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          wallet_id: string
        }
        Update: {
          amount?: number
          balance_after?: number
          created_at?: string
          description?: string | null
          id?: string
          order_id?: string | null
          reference_id?: string | null
          type?: Database["public"]["Enums"]["transaction_type"]
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wallet_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          available_balance: number
          created_at: string
          currency: string
          id: string
          reserved_balance: number
          updated_at: string
          user_id: string
        }
        Insert: {
          available_balance?: number
          created_at?: string
          currency?: string
          id?: string
          reserved_balance?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          available_balance?: number
          created_at?: string
          currency?: string
          id?: string
          reserved_balance?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_order_number: { Args: never; Returns: string }
      generate_user_display_id: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      account_level: "normal" | "vip" | "restricted"
      app_role: "admin" | "user"
      crypto_type: "BTC" | "ETH" | "USDT_TRC" | "USDT_ERC"
      order_status:
        | "pending_payment"
        | "paid"
        | "funds_reserved"
        | "needs_topup"
        | "ordered_from_supplier"
        | "shipped"
        | "delivered"
        | "settled"
        | "cancelled"
        | "refunded"
      transaction_type:
        | "deposit"
        | "withdrawal"
        | "reserve"
        | "release"
        | "profit"
        | "fee"
        | "refund"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_level: ["normal", "vip", "restricted"],
      app_role: ["admin", "user"],
      crypto_type: ["BTC", "ETH", "USDT_TRC", "USDT_ERC"],
      order_status: [
        "pending_payment",
        "paid",
        "funds_reserved",
        "needs_topup",
        "ordered_from_supplier",
        "shipped",
        "delivered",
        "settled",
        "cancelled",
        "refunded",
      ],
      transaction_type: [
        "deposit",
        "withdrawal",
        "reserve",
        "release",
        "profit",
        "fee",
        "refund",
      ],
    },
  },
} as const
