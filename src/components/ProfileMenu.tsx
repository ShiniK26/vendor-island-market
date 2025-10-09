import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { User, LogOut, MessageCircle, ShieldCheck, CreditCard, Bell } from "lucide-react";

interface ProfileData {
  user_display_id: string;
  account_level: "normal" | "vip" | "restricted";
}

const ProfileMenu = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("user_display_id, account_level")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/auth");
      toast({
        title: "Logged out",
        description: "See you soon!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getAccountLevelBadge = () => {
    if (!profile) return null;
    
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      normal: "secondary",
      vip: "default",
      restricted: "destructive",
    };

    const descriptions: Record<string, string> = {
      normal: "Standard account",
      vip: "Premium perks & priority support",
      restricted: "Limited selling & withdrawal",
    };

    return (
      <div className="space-y-2">
        <Badge variant={variants[profile.account_level]} className="text-sm">
          {profile.account_level.toUpperCase()}
        </Badge>
        <p className="text-xs text-muted-foreground">{descriptions[profile.account_level]}</p>
      </div>
    );
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Account Profile
            </DrawerTitle>
            <DrawerDescription>
              Manage your account settings
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 space-y-4">
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : profile ? (
              <>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">User ID</p>
                  <p className="text-lg font-mono font-bold">{profile.user_display_id}</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Account Level</p>
                  {getAccountLevelBadge()}
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Coming Soon",
                        description: "Notifications feature will be available soon!",
                      });
                    }}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="sm"
                    onClick={() => navigate("/finances")}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Billing
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="sm"
                    onClick={() => navigate("/basic-verification")}
                  >
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    Security
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="sm"
                    onClick={() => window.open("https://support.vendorisland.com", "_blank")}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Support
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                Failed to load profile
              </div>
            )}
          </div>

          <DrawerFooter>
            <Button variant="destructive" onClick={handleLogout} className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileMenu;
