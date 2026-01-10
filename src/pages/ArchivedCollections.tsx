import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, DollarSign, ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "@/components/BackButton";
import BurgerMenu from "@/components/BurgerMenu";
import ProfileMenu from "@/components/ProfileMenu";
import { User } from "lucide-react";

// Mock archived products data (will be replaced with CJDropshipping API)
const mockArchivedProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Earbuds",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop",
    supplierPrice: 8.50,
    suggestedPrice: 24.99,
    supplier: "CJDropshipping",
    savedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "LED Strip Lights 5M",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
    supplierPrice: 4.20,
    suggestedPrice: 15.99,
    supplier: "CJDropshipping",
    savedAt: "2024-01-14",
  },
  {
    id: "3",
    name: "Phone Holder Car Mount",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop",
    supplierPrice: 2.80,
    suggestedPrice: 12.99,
    supplier: "CJDropshipping",
    savedAt: "2024-01-13",
  },
];

const ArchivedCollections = () => {
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
        <div className="flex items-center gap-3">
          <BackButton />
          <h1 className="text-xl font-bold">Archived Collections</h1>
        </div>

        <p className="text-sm text-muted-foreground">
          Products saved from Product Finder. Adjust prices and push to your collections when ready.
        </p>

        <Button asChild className="w-full">
          <Link to="/product-finder">
            <Plus className="h-4 w-4 mr-2" />
            Find More Products
          </Link>
        </Button>

        {mockArchivedProducts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="font-medium mb-2">No archived products yet</h3>
              <p className="text-sm text-muted-foreground">
                Browse the Product Finder to save products here
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {mockArchivedProducts.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.supplier}</p>
                      <div className="flex items-center gap-2 mt-1 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <DollarSign className="h-3 w-3" />
                          {product.supplierPrice.toFixed(2)}
                        </span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        <span className="text-primary font-medium">
                          ${product.suggestedPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      Edit Pricing
                    </Button>
                    <Button size="sm" className="flex-1">
                      Push to Store
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchivedCollections;
