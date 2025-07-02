import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

const Market = () => {
  const vendors = [
    {
      id: 1,
      name: "Trendy Fashion Store",
      category: "Fashion",
      rating: 4.8,
      products: 24,
      image: "👗"
    },
    {
      id: 2,
      name: "Tech Gadgets Hub",
      category: "Electronics",
      rating: 4.6,
      products: 45,
      image: "📱"
    },
    {
      id: 3,
      name: "Home Essentials",
      category: "Home & Garden",
      rating: 4.9,
      products: 33,
      image: "🏠"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 pb-20">
      {/* Header */}
      <header className="p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-sm mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-primary">
            VendorIsland
          </Link>
          <Button variant="outline" size="sm">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="px-4 py-6 max-w-sm mx-auto space-y-6">
        <h1 className="text-xl font-bold text-primary">Marketplace</h1>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search vendors..." className="pl-10" />
        </div>
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button variant="outline" size="sm" className="whitespace-nowrap">All</Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">Fashion</Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">Electronics</Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">Home</Button>
        </div>

        {/* Vendors */}
        <div className="space-y-3">
          {vendors.map((vendor) => (
            <Card key={vendor.id}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-xl">
                    {vendor.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{vendor.name}</h3>
                    <p className="text-sm text-muted-foreground">{vendor.category}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs">⭐ {vendor.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        {vendor.products} products
                      </span>
                    </div>
                  </div>
                  <Button size="sm" asChild>
                    <Link to="/storefront">Visit</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Market;