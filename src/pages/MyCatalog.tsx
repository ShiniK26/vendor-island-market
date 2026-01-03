import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User, Search, Package } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import BurgerMenu from "@/components/BurgerMenu";
import ProfileMenu from "@/components/ProfileMenu";
import { ImportProductDialog } from "@/components/catalog/ImportProductDialog";
import { ProductCard } from "@/components/catalog/ProductCard";
import { useCatalogProducts } from "@/hooks/useCatalogProducts";
import { Skeleton } from "@/components/ui/skeleton";

const MyCatalog = () => {
  const { products, loading, createProduct, updateProduct, deleteProduct } = useCatalogProducts();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published" | "archived">("all");

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleImport = async (data: any) => {
    await createProduct({
      name: data.name,
      description: data.description,
      supplier_name: data.supplier_name,
      supplier_link: data.supplier_link,
      cost_price: data.cost_price,
      shipping_cost: data.shipping_cost || 0,
      shipping_time_min: data.shipping_time_min,
      shipping_time_max: data.shipping_time_max,
      status: "draft",
    });
  };

  const handlePublish = async (product: any) => {
    await updateProduct(product.id, { status: "published" });
  };

  const stats = {
    total: products.length,
    draft: products.filter((p) => p.status === "draft").length,
    published: products.filter((p) => p.status === "published").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 pb-20">
      {/* Header */}
      <header className="p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-sm mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BurgerMenu />
            <Link to="/dashboard" className="text-xl font-bold text-primary">
              My Catalog
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
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-primary">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-amber-600">{stats.draft}</div>
              <div className="text-xs text-muted-foreground">Drafts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-green-600">{stats.published}</div>
              <div className="text-xs text-muted-foreground">Published</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Import */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <ImportProductDialog onImport={handleImport} />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {(["all", "draft", "published", "archived"] as const).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              className="flex-1 capitalize"
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </Button>
          ))}
        </div>

        {/* Products List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Skeleton className="w-16 h-16 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => {}}
                onDelete={deleteProduct}
                onPublish={handlePublish}
              />
            ))}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="p-6 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="text-lg mb-2">No Products Yet</CardTitle>
              <CardDescription className="mb-4">
                Import products from suppliers to build your catalog
              </CardDescription>
            </CardContent>
          </Card>
        )}

        {/* Link to Product Finder */}
        <Card className="border-dashed">
          <CardContent className="p-6 text-center">
            <div className="text-3xl mb-3">🔍</div>
            <CardTitle className="text-lg mb-2">Find Products</CardTitle>
            <CardDescription className="mb-4">
              Browse trending products from dropshipping suppliers
            </CardDescription>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/product-finder">Browse Suppliers</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default MyCatalog;
