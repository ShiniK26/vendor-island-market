import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, User, Lock, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import BurgerMenu from "@/components/BurgerMenu";
import ProfileMenu from "@/components/ProfileMenu";
import { useWallet } from "@/hooks/useWallet";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

const Finances = () => {
  const { wallet, transactions, loading } = useWallet();

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      case "reserve":
        return <Lock className="h-4 w-4 text-amber-600" />;
      case "release":
        return <Lock className="h-4 w-4 text-blue-600" />;
      case "profit":
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      default:
        return <Wallet className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 pb-20">
      {/* Header */}
      <header className="p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-sm mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BurgerMenu />
            <Link to="/" className="text-xl font-bold text-primary">
              VendorIsland
            </Link>
          </div>
          <ProfileMenu>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </ProfileMenu>
        </div>
      </header>

      <div className="px-4 py-6 max-w-sm mx-auto space-y-6">
        <h1 className="text-xl font-bold text-primary">Finances</h1>
        
        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm opacity-90">Available Balance</p>
                {loading ? (
                  <Skeleton className="h-9 w-32 bg-primary-foreground/20" />
                ) : (
                  <p className="text-3xl font-bold">
                    {formatAmount(wallet?.available_balance || 0)}
                  </p>
                )}
              </div>
              <Wallet className="h-8 w-8 opacity-90" />
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm" className="flex-1">
                Withdraw
              </Button>
              <Button variant="outline" size="sm" className="flex-1 border-foreground/20 text-foreground dark:text-white hover:text-white hover:bg-foreground/30 dark:hover:text-black dark:hover:bg-white/30" asChild>
                <Link to="/crypto-deposit">Add Funds</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Lock className="h-4 w-4 text-amber-600" />
                <span className="text-xs text-muted-foreground">Reserved</span>
              </div>
              {loading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                <div className="text-lg font-bold text-primary">
                  {formatAmount(wallet?.reserved_balance || 0)}
                </div>
              )}
              <div className="text-xs text-muted-foreground">For pending orders</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Wallet className="h-4 w-4 text-green-600" />
                <span className="text-xs text-muted-foreground">Total</span>
              </div>
              {loading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                <div className="text-lg font-bold text-primary">
                  {formatAmount((wallet?.available_balance || 0) + (wallet?.reserved_balance || 0))}
                </div>
              )}
              <div className="text-xs text-muted-foreground">Available + Reserved</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Button variant="outline" className="w-full h-16 flex-col" asChild>
          <Link to="/orders">
            <span className="text-xl mb-1">📦</span>
            <span className="text-xs">Orders</span>
          </Link>
        </Button>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-start">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              ))
            ) : transactions.length > 0 ? (
              transactions.map((tx) => (
                <div key={tx.id} className="flex justify-between items-start">
                  <div className="flex items-start gap-2">
                    {getTransactionIcon(tx.type)}
                    <div>
                      <h3 className="font-medium text-sm capitalize">{tx.type}</h3>
                      <p className="text-xs text-muted-foreground">
                        {tx.description || "Transaction"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(tx.created_at))} ago
                      </p>
                    </div>
                  </div>
                  <span className={`font-bold text-sm ${
                    tx.amount > 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {tx.amount > 0 ? "+" : ""}{formatAmount(tx.amount)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-muted-foreground py-4">
                No transactions yet. Deposit funds to get started.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Finances;
