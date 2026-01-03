import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Wallet {
  id: string;
  user_id: string;
  available_balance: number;
  reserved_balance: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

interface WalletTransaction {
  id: string;
  wallet_id: string;
  order_id: string | null;
  type: "deposit" | "withdrawal" | "reserve" | "release" | "profit" | "fee" | "refund";
  amount: number;
  balance_after: number;
  description: string | null;
  reference_id: string | null;
  created_at: string;
}

export function useWallet() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchWallet = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      setWallet(data);
    } catch (error: any) {
      console.error("Error fetching wallet:", error);
      toast({
        title: "Error",
        description: "Failed to load wallet data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      if (!wallet) return;

      const { data, error } = await supabase
        .from("wallet_transactions")
        .select("*")
        .eq("wallet_id", wallet.id)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error: any) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  useEffect(() => {
    if (wallet) {
      fetchTransactions();
    }
  }, [wallet]);

  return {
    wallet,
    transactions,
    loading,
    refetch: fetchWallet,
  };
}
