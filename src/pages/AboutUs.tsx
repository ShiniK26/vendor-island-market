import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, User } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import BurgerMenu from "@/components/BurgerMenu";
import BackButton from "@/components/BackButton";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 pb-20">
      {/* Header */}
      <header className="p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-sm mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BackButton />
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
        <h1 className="text-xl font-bold text-primary">About Us</h1>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              <CardTitle>VendorIsland</CardTitle>
            </div>
            <CardDescription>
              Connecting vendors and customers worldwide
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              VendorIsland is a comprehensive marketplace platform that empowers vendors to showcase their products and connect with customers globally. Our mission is to create a seamless trading experience for everyone.
            </p>
            <p className="text-sm text-muted-foreground">
              Founded in 2024, we've been dedicated to providing innovative solutions for modern commerce, helping businesses grow and thrive in the digital marketplace.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              To become the world's most trusted and user-friendly marketplace platform, enabling vendors of all sizes to reach their full potential.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Email: support@vendorisland.com</p>
            <p className="text-sm text-muted-foreground">Phone: +1 (555) 123-4567</p>
            <p className="text-sm text-muted-foreground">Address: 123 Commerce St, Business City, BC 12345</p>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AboutUs;