import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import BurgerMenu from "@/components/BurgerMenu";

const EmailAuthentication = () => {
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
          <Button variant="outline" size="sm">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="px-4 py-6 max-w-sm mx-auto space-y-6">
        <h1 className="text-xl font-bold text-primary">Email Authentication</h1>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <CardTitle>Verify Email Address</CardTitle>
            </div>
            <CardDescription>
              Secure your account with email verification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Current Email</Label>
              <Input id="email" value="user@example.com" disabled />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Email Status</p>
                <p className="text-xs text-muted-foreground">Verification pending</p>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                Unverified
              </span>
            </div>
            <Button className="w-full">
              Send Verification Email
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Two-Factor Authentication</CardTitle>
            <CardDescription className="text-xs">
              Add an extra layer of security to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Enable 2FA
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default EmailAuthentication;