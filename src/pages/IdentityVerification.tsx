import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IdCard, User, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import BurgerMenu from "@/components/BurgerMenu";

const IdentityVerification = () => {
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
        <h1 className="text-xl font-bold text-primary">Identity Verification</h1>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <IdCard className="h-5 w-5 text-primary" />
              <CardTitle>Document Verification</CardTitle>
            </div>
            <CardDescription>
              Upload your government-issued ID for identity verification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Document Type</Label>
              <select className="w-full p-2 border rounded-md">
                <option>Driver's License</option>
                <option>Passport</option>
                <option>National ID</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Document Number</Label>
              <Input placeholder="Enter document number" />
            </div>
            <div className="space-y-2">
              <Label>Upload Document</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
              </div>
            </div>
            <Button className="w-full">
              Submit for Verification
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default IdentityVerification;