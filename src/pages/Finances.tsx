import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const Finances = () => {
  const transactions = [
    {
      id: 1,
      type: "Sale",
      amount: "+$49.99",
      description: "Summer Dress - Order #1234",
      date: "Today, 2:30 PM",
      status: "Completed"
    },
    {
      id: 2,
      type: "Payout",
      amount: "-$125.50",
      description: "Weekly payout to bank",
      date: "Yesterday, 9:00 AM",
      status: "Processing"
    },
    {
      id: 3,
      type: "Sale",
      amount: "+$89.99",
      description: "Winter Jacket - Order #1235",
      date: "Jan 14, 4:15 PM",
      status: "Completed"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 pb-20">
      {/* Header */}
      <header className="p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-sm mx-auto">
          <h1 className="text-xl font-bold text-primary">Finances</h1>
        </div>
      </header>

      <div className="px-4 py-6 max-w-sm mx-auto space-y-6">
        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm opacity-90">Available Balance</p>
                <p className="text-3xl font-bold">$2,456.78</p>
              </div>
              <Wallet className="h-8 w-8 opacity-90" />
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm" className="flex-1">
                Withdraw
              </Button>
              <Button variant="outline" size="sm" className="flex-1 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                Add Funds
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-primary">$4,892.50</div>
              <div className="text-xs text-muted-foreground">This Month</div>
              <div className="text-xs text-green-600">+23%</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-primary">$15,234.75</div>
              <div className="text-xs text-muted-foreground">All Time</div>
              <div className="text-xs text-green-600">Total Revenue</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-16 flex-col">
            <span className="text-xl mb-1">📊</span>
            <span className="text-xs">Analytics</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col">
            <span className="text-xl mb-1">📄</span>
            <span className="text-xs">Reports</span>
          </Button>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm">{transaction.type}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'Completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
                <span className={`font-bold text-sm ${
                  transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Finances;