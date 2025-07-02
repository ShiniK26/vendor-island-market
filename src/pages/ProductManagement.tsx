import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

const ProductManagement = () => {
  const products = [
    {
      id: 1,
      name: "Summer Dress",
      price: "$49.99",
      stock: 25,
      status: "Active",
      image: "🌸"
    },
    {
      id: 2,
      name: "Winter Jacket",
      price: "$89.99",
      stock: 12,
      status: "Active",
      image: "🧥"
    },
    {
      id: 3,
      name: "Casual Sneakers",
      price: "$79.99",
      stock: 0,
      status: "Out of Stock",
      image: "👟"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 pb-20">
      {/* Header */}
      <header className="p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-sm mx-auto flex justify-between items-center">
          <Link to="/dashboard" className="text-xl font-bold text-primary">
            Products
          </Link>
          <Button variant="outline" size="sm">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="px-4 py-6 max-w-sm mx-auto space-y-6">
        {/* Search and Add */}
        <div className="space-y-3">
          <Input placeholder="Search products..." />
          <Button className="w-full" asChild>
            <Link to="/add-product">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Product
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">All</Button>
          <Button variant="outline" size="sm" className="flex-1">Active</Button>
          <Button variant="outline" size="sm" className="flex-1">Draft</Button>
        </div>

        {/* Products List */}
        <div className="space-y-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-xl">
                    {product.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {product.status}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Stock: {product.stock}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Import from Suppliers */}
        <Card className="border-dashed">
          <CardContent className="p-6 text-center">
            <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <CardTitle className="text-lg mb-2">Import Products</CardTitle>
            <CardDescription className="mb-4">
              Connect with dropshipping suppliers to import products instantly
            </CardDescription>
            <Button variant="outline" className="w-full">
              Browse Suppliers
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ProductManagement;