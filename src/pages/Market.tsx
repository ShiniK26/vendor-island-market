import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, User, Plus, Store } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";
import BurgerMenu from "@/components/BurgerMenu";
import ProfileMenu from "@/components/ProfileMenu";

const Market = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }
    
    const { data: profile } = await supabase
      .from("profiles")
      .select("account_level")
      .eq("id", user.id)
      .single();
    
    if (profile) {
      setAccountLevel(profile.account_level);
    }
  };

  const fetchStores = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("stores")
      .select("*")
      .order("created_at", { ascending: false });
    
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

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("stores")
      .insert({
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
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">My Stores</h1>
          {canCreateStore() && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                    {accountLevel === "vip" 
                      ? `You can create up to 5 stores. Current: ${stores.length}/5`
                      : "Upgrade to VIP to create more stores (up to 5)"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input
                      id="store-name"
                      placeholder="Enter store name"
                      value={newStoreName}
                      onChange={(e) => setNewStoreName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-description">Description</Label>
                    <Textarea
                      id="store-description"
                      placeholder="Enter store description"
                      value={newStoreDescription}
                      onChange={(e) => setNewStoreDescription(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateStore}>Create Store</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {!canCreateStore() && accountLevel === "normal" && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Upgrade to VIP to create up to 5 stores
              </p>
            </CardContent>
          </Card>
        )}

        {/* Stores */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading stores...</p>
          </div>
        ) : stores.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Store className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">No stores yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first store to get started
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {stores.map((store) => (
              <Card key={store.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                      <Store className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{store.name}</h3>
                      {store.description && (
                        <p className="text-sm text-muted-foreground truncate">
                          {store.description}
                        </p>
                      )}
                    </div>
                    <Button size="sm" asChild>
                      <Link to="/storefront">Manage</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Market;