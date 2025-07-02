import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

const ProductFinder = () => {
  const suppliers = [
    {
      id: 1,
      name: "AliExpress Dropship",
      products: "2.5M+",
      category: "General",
      commission: "5-15%",
      image: "🛍️"
    },
    {
      id: 2,
      name: "Fashion Wholesale",
      products: "150K+",
      category: "Fashion",
      commission: "10-25%",
      image: "👗"
    },
    {
      id: 3,
      name: "Tech Suppliers Hub",
      products: "75K+",
      category: "Electronics",
      commission: "8-20%",
      image: "📱"
    }
  ];

  const trendingProducts = [
    { name: "Wireless Earbuds", price: "$25.99", profit: "$15.00" },
    { name: "Phone Case", price: "$8.99", profit: "$5.50" },
    { name: "Fitness Tracker", price: "$35.99", profit: "$20.00" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 pb-20">
      {/* Header */}
      <header className="p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-sm mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Menu className="h-4 w-4" />
            </Button>
            <Link to="/" className="text-xl font-bold text-primary">
              VendorIsland
            </Link>
          </div>
          <Button variant="outline" size="sm">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="px-4 py-6 max-w-sm mx-auto space-y-6">
        <h1 className="text-xl font-bold text-primary">Product Finder</h1>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>
        {/* Trending Products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trending Products</CardTitle>
            <CardDescription>High-demand items with good profit margins</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {trendingProducts.map((product, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">Cost: {product.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">+{product.profit}</p>
                  <Button size="sm" variant="outline">Import</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Suppliers */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Dropshipping Suppliers</h3>
          {suppliers.map((supplier) => (
            <Card key={supplier.id}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-xl">
                    {supplier.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{supplier.name}</h3>
                    <p className="text-sm text-muted-foreground">{supplier.category}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {supplier.products} products
                      </span>
                      <span className="text-xs text-green-600">
                        {supplier.commission} commission
                      </span>
                    </div>
                  </div>
                  <Button size="sm">Connect</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Browse by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-16 flex-col">
                <span className="text-xl mb-1">👗</span>
                <span className="text-xs">Fashion</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <span className="text-xl mb-1">📱</span>
                <span className="text-xs">Electronics</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <span className="text-xl mb-1">🏠</span>
                <span className="text-xs">Home</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <span className="text-xl mb-1">💄</span>
                <span className="text-xs">Beauty</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ProductFinder;