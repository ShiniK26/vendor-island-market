import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import BurgerMenu from "@/components/BurgerMenu";

const FundPassword = () => {
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
        <h1 className="text-xl font-bold text-primary">Fund Password</h1>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <CardTitle>Set Fund Password</CardTitle>
            </div>
            <CardDescription>
              Create a secure password for fund transactions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Login Password</Label>
              <Input id="currentPassword" type="password" placeholder="Enter current password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fundPassword">New Fund Password</Label>
              <Input id="fundPassword" type="password" placeholder="Enter fund password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Fund Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm fund password" />
            </div>
            <Button className="w-full">
              Set Fund Password
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <h3 className="font-medium text-sm">Security Requirements</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• At least 8 characters long</li>
                <li>• Include uppercase and lowercase letters</li>
                <li>• Include at least one number</li>
                <li>• Include at least one special character</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default FundPassword;