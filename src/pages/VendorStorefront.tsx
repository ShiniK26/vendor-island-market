import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User, Settings, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: string;
  name: string;
  selling_price: number | null;
  cost_price: number;
  images: string[] | null;
  status: string;
}

const VendorStorefront = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('catalog_products')
        .select('id, name, selling_price, cost_price, images, status')
        .eq('user_id', user.id)
        .eq('status', 'published');

      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

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
            My Store
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
              MS
            </div>
            <CardTitle className="text-xl mb-2">My Store</CardTitle>
            <CardDescription>
              Manage your published products
            </CardDescription>
            <div className="flex justify-center gap-4 mt-4 text-sm text-muted-foreground">
              <span>📦 {products.length} products</span>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <Input 
          placeholder="Search products..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <Skeleton className="aspect-square" />
                  <div className="p-3 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "No products match your search" : "No published products yet"}
              </p>
              <Button asChild>
                <Link to="/catalog">Go to Catalog</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => {
              const productImage = product.images && product.images.length > 0 ? product.images[0] : null;
              const price = product.selling_price || product.cost_price;
              
              return (
                <Card key={product.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-secondary flex items-center justify-center text-4xl overflow-hidden">
                      {productImage ? (
                        <img src={productImage} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        "📦"
                      )}
                    </div>
                    <div className="p-3 space-y-2">
                      <h3 className="font-medium text-sm leading-tight line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-primary">${price.toFixed(2)}</span>
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
              );
            })}
          </div>
        )}

        {/* Store Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/catalog">View All Catalog</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/pricing-rules">Pricing Rules</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorStorefront;
