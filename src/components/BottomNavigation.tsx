import { Button } from "@/components/ui/button";
import { Home, ShoppingCart, Package, Search, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Home" },
    { path: "/market", icon: ShoppingCart, label: "Market" },
    { path: "/orders", icon: Package, label: "Orders" },
    { path: "/product-finder", icon: Search, label: "Finder" },
    { path: "/finances", icon: Wallet, label: "Finances" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t shadow-lg">
      <div className="max-w-sm mx-auto px-2 py-2">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button 
                key={item.path}
                variant="ghost" 
                size="sm" 
                className={`h-14 flex-col ${isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}
                asChild
              >
                <Link to={item.path}>
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;