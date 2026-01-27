import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, User, Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import BurgerMenu from "@/components/BurgerMenu";
import ProfileMenu from "@/components/ProfileMenu";

const ProductFinder = () => {
  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Earbuds TWS",
      image: "🎧",
      price: 12.99,
      originalPrice: 29.99,
      sold: 2847,
      rating: 4.8,
      freeShipping: true,
    },
    {
      id: 2,
      name: "Phone Case Silicone Cover",
      image: "📱",
      price: 3.49,
      originalPrice: 8.99,
      sold: 5621,
      rating: 4.6,
      freeShipping: true,
    },
    {
      id: 3,
      name: "Smart Watch Fitness Tracker",
      image: "⌚",
      price: 24.99,
      originalPrice: 59.99,
      sold: 1893,
      rating: 4.7,
      freeShipping: true,
    },
    {
      id: 4,
      name: "LED Ring Light 10 inch",
      image: "💡",
      price: 15.99,
      originalPrice: 35.99,
      sold: 3421,
      rating: 4.5,
      freeShipping: false,
    },
    {
      id: 5,
      name: "Portable Power Bank 10000mAh",
      image: "🔋",
      price: 18.49,
      originalPrice: 39.99,
      sold: 4102,
      rating: 4.9,
      freeShipping: true,
    },
    {
      id: 6,
      name: "Mini Bluetooth Speaker",
      image: "🔊",
      price: 9.99,
      originalPrice: 24.99,
      sold: 2156,
      rating: 4.4,
      freeShipping: true,
    },
    {
      id: 7,
      name: "USB C Hub Adapter 7-in-1",
      image: "🔌",
      price: 22.99,
      originalPrice: 49.99,
      sold: 1567,
      rating: 4.7,
      freeShipping: false,
    },
    {
      id: 8,
      name: "Laptop Stand Adjustable",
      image: "💻",
      price: 19.99,
      originalPrice: 45.99,
      sold: 987,
      rating: 4.8,
      freeShipping: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="p-4 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
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

      <div className="px-3 py-4 max-w-sm mx-auto space-y-4">
        <h1 className="text-xl font-bold text-foreground">Product Finder</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>

        {/* Product Grid - Lazada Style */}
        <div className="grid grid-cols-2 gap-2">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative aspect-square bg-muted flex items-center justify-center">
                  <span className="text-5xl">{product.image}</span>
                  <button className="absolute top-2 right-2 p-1.5 bg-background/80 rounded-full">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </button>
                  {product.freeShipping && (
                    <span className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded">
                      Free Shipping
                    </span>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="p-2 space-y-1">
                  <h3 className="text-xs font-medium line-clamp-2 leading-tight min-h-[2rem]">
                    {product.name}
                  </h3>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-primary font-bold text-sm">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-muted-foreground text-[10px] line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  
                  {/* Rating & Sold */}
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating}</span>
                    </div>
                    <span>{product.sold.toLocaleString()} sold</span>
                  </div>
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

export default ProductFinder;