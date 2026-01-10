import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, User, Plus, Store, Archive, Package, DollarSign, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";
import BurgerMenu from "@/components/BurgerMenu";
import ProfileMenu from "@/components/ProfileMenu";

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
const Market = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [stores, setStores] = useState<any[]>([]);
  const [accountLevel, setAccountLevel] = useState<string>("normal");
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStoreName, setNewStoreName] = useState("");
  const [newStoreDescription, setNewStoreDescription] = useState("");
  useEffect(() => {
    checkAuth();
    fetchStores();
  }, []);
  const checkAuth = async () => {
    const {
      data: {
        user
      }
    } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }
    const {
      data: profile
    } = await supabase.from("profiles").select("account_level").eq("id", user.id).single();
    if (profile) {
      setAccountLevel(profile.account_level);
    }
  };
  const fetchStores = async () => {
    setLoading(true);
    const {
      data,
      error
    } = await supabase.from("stores").select("*").order("created_at", {
      ascending: false
    });
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load stores",
        variant: "destructive"
      });
    } else {
      setStores(data || []);
    }
    setLoading(false);
  };
  const canCreateStore = () => {
    const maxStores = accountLevel === "vip" ? 5 : 1;
    return stores.length < maxStores;
  };
  const handleCreateStore = async () => {
    if (!newStoreName.trim()) {
      toast({
        title: "Error",
        description: "Store name is required",
        variant: "destructive"
      });
      return;
    }
    const {
      data: {
        user
      }
    } = await supabase.auth.getUser();
    if (!user) return;
    const {
      error
    } = await supabase.from("stores").insert({
      user_id: user.id,
      name: newStoreName.trim(),
      description: newStoreDescription.trim()
    });
    if (error) {
      toast({
        title: "Error",
        description: "Failed to create store",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Store created successfully"
      });
      setIsDialogOpen(false);
      setNewStoreName("");
      setNewStoreDescription("");
      fetchStores();
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 pb-20">
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
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">My Collections</h1>
          {canCreateStore() && <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Create Store
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Store</DialogTitle>
                  <DialogDescription>
                    {accountLevel === "vip" ? `You can create up to 5 stores. Current: ${stores.length}/5` : "Upgrade to VIP to create more stores (up to 5)"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input id="store-name" placeholder="Enter store name" value={newStoreName} onChange={e => setNewStoreName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-description">Description</Label>
                    <Textarea id="store-description" placeholder="Enter store description" value={newStoreDescription} onChange={e => setNewStoreDescription(e.target.value)} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateStore}>Create Store</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>}
        </div>

        {!canCreateStore() && accountLevel === "normal" && <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Upgrade to VIP to create up to 5 collections</p>
            </CardContent>
          </Card>}

        {/* Archived Collections Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Archive className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Archived Collections</h2>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/product-finder" className="text-primary">
                <Plus className="h-4 w-4 mr-1" />
                Find Products
              </Link>
            </Button>
          </div>
          
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-3">
                Products saved from Product Finder. Adjust prices and push to your collections when ready.
              </p>
              
              {mockArchivedProducts.length === 0 ? (
                <div className="text-center py-6">
                  <Package className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">No archived products yet</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Browse the Product Finder to save products here
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {mockArchivedProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="flex items-center gap-3 p-2 bg-background rounded-lg border"
                    >
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {product.supplierPrice.toFixed(2)}
                          </span>
                          <ArrowRight className="h-3 w-3" />
                          <span className="text-primary font-medium">
                            ${product.suggestedPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">
                        Manage
                      </Button>
                    </div>
                  ))}
                  
                  <Button variant="ghost" size="sm" className="w-full mt-2 text-muted-foreground">
                    View All Archived ({mockArchivedProducts.length})
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* My Stores */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">My Stores</h2>
          {loading ? <div className="text-center py-8">
              <p className="text-muted-foreground">Loading stores...</p>
            </div> : stores.length === 0 ? <Card>
              <CardContent className="p-8 text-center">
                <Store className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium mb-2">No stores yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your first store to get started
                </p>
              </CardContent>
            </Card> : <div className="space-y-3">
              {stores.map(store => <Card key={store.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                        <Store className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{store.name}</h3>
                        {store.description && <p className="text-sm text-muted-foreground truncate">
                            {store.description}
                          </p>}
                      </div>
                      <Button size="sm" asChild>
                        <Link to="/storefront">Manage</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>)}
            </div>}
        </div>
      </div>

      <BottomNavigation />
    </div>;
};
export default Market;