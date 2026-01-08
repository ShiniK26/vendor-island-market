import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";
import { useState } from "react";
import { getMockProductsArray } from "@/data/mockProducts";

const VendorStorefront = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Get products from shared mock data store
  const products = getMockProductsArray();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <header className="p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-sm mx-auto flex justify-between items-center">
          <BackButton />
          <Link to="/dashboard" className="text-xl font-bold text-primary">
            Trendy Fashion Store
          </Link>
          <Button variant="outline" size="sm">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="px-4 py-6 max-w-sm mx-auto space-y-6">
        {/* Store Banner */}
        <Card>
          <CardContent className="p-6 text-center bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-primary-foreground">
              TF
            </div>
            <CardTitle className="text-xl mb-2">Trendy Fashion Store</CardTitle>
            <CardDescription>
              Premium fashion and accessories for the modern lifestyle
            </CardDescription>
            <div className="flex justify-center gap-4 mt-4 text-sm text-muted-foreground">
              <span>⭐ 4.8 (500+ reviews)</span>
              <span>📦 Free shipping</span>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <Input 
          placeholder="Search products..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button variant="outline" size="sm" className="whitespace-nowrap">All</Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">Dresses</Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">Jackets</Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">Shoes</Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">Bags</Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-secondary flex items-center justify-center text-4xl">
                  {product.image}
                </div>
                <div className="p-3 space-y-2">
                  <h3 className="font-medium text-sm leading-tight">{product.name}</h3>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-primary">${product.sellingPrice.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>⭐ {product.rating}</span>
                    <span>({product.totalReviews})</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full gap-1"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <Settings className="h-3 w-3" />
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <Button variant="outline" className="w-full">
          Load More Products
        </Button>

        {/* Store Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">About This Store</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Process time</span>
              <span className="text-sm font-medium">Within 2 hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Ships to</span>
              <span className="text-sm font-medium">Globally</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Member score</span>
              <span className="text-sm font-medium">250</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorStorefront;
