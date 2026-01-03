import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

interface CatalogProduct {
  id: string;
  user_id: string;
  store_id: string | null;
  name: string;
  description: string | null;
  images: string[];
  supplier_name: string | null;
  supplier_link: string | null;
  supplier_product_id: string | null;
  cost_price: number;
  shipping_cost: number;
  selling_price: number | null;
  shipping_time_min: number | null;
  shipping_time_max: number | null;
  country_restrictions: string[];
  variants: Json;
  status: "draft" | "published" | "archived";
  last_price_check: string | null;
  price_changed: boolean;
  created_at: string;
  updated_at: string;
}

interface CreateProductInput {
  name: string;
  description?: string;
  images?: string[];
  supplier_name?: string;
  supplier_link?: string;
  supplier_product_id?: string;
  cost_price: number;
  shipping_cost?: number;
  selling_price?: number;
  shipping_time_min?: number;
  shipping_time_max?: number;
  country_restrictions?: string[];
  variants?: Json;
  status?: "draft" | "published" | "archived";
}

export function useCatalogProducts() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("catalog_products")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts((data || []) as CatalogProduct[]);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (input: CreateProductInput) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("catalog_products")
        .insert({
          user_id: user.id,
          ...input,
        })
        .select()
        .single();

      if (error) throw error;

      setProducts((prev) => [data as CatalogProduct, ...prev]);
      toast({
        title: "Success",
        description: "Product added to catalog",
      });
      return data;
    } catch (error: any) {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateProduct = async (id: string, updates: Partial<CreateProductInput>) => {
    try {
      const { data, error } = await supabase
        .from("catalog_products")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? (data as CatalogProduct) : p))
      );
      toast({
        title: "Success",
        description: "Product updated",
      });
      return data;
    } catch (error: any) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from("catalog_products")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast({
        title: "Success",
        description: "Product removed from catalog",
      });
    } catch (error: any) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts,
  };
}
