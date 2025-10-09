import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import BurgerMenu from "@/components/BurgerMenu";

const CryptoDeposit = () => {
  const cryptoOptions = [
    {
      id: 'btc',
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: '₿',
      path: '/deposit/btc'
    },
    {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      icon: 'Ξ',
      path: '/deposit/eth'
    },
    {
      id: 'usdt-trc',
      name: 'USDT (TRC-20)',
      symbol: 'USDT TRC',
      icon: '₮',
      path: '/deposit/usdt-trc'
    },
    {
      id: 'usdt-erc',
      name: 'USDT (ERC-20)',
      symbol: 'USDT ERC',
      icon: '₮',
      path: '/deposit/usdt-erc'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 pb-20">
      {/* Header */}
      <header className="p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-sm mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BurgerMenu />
            <h1 className="text-xl font-bold text-primary">Crypto Deposit</h1>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/finances">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <div className="px-4 py-6 max-w-sm mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Cryptocurrency</CardTitle>
            <CardDescription>Choose your preferred deposit method</CardDescription>
          </CardHeader>
        </Card>

        {/* Crypto Options */}
        <div className="space-y-3">
          {cryptoOptions.map((crypto) => (
            <Card key={crypto.id} className="hover:border-primary transition-colors">
              <Link to={crypto.path}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                        {crypto.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{crypto.name}</h3>
                        <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default CryptoDeposit;
