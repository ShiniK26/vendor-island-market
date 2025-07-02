import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <header className="p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-sm mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">VendorIsland</h1>
          <Button variant="outline" size="sm" asChild>
            <Link to="/login">
              <User className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="px-4 pt-8 pb-6 max-w-sm mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-foreground animate-fade-in">
          Start Your Own Marketplace
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Create your personalized vendor store and connect with dropshipping suppliers. Build your business today.
        </p>
        
        <Button size="lg" className="w-full mb-4" asChild>
          <Link to="/vendor-signup">
            <UserPlus className="mr-2 h-5 w-5" />
            Become a Vendor
          </Link>
        </Button>
        
        <Button variant="outline" size="lg" className="w-full" asChild>
          <Link to="/marketplace">
            Browse Marketplace
          </Link>
        </Button>
      </div>

      {/* Features */}
      <div className="px-4 pb-8 max-w-sm mx-auto space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Easy Store Setup</CardTitle>
            <CardDescription>
              Create your branded storefront in minutes
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Dropshipping Integration</CardTitle>
            <CardDescription>
              Connect with suppliers and import products instantly
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Mobile-First Design</CardTitle>
            <CardDescription>
              Optimized for mobile shopping experience
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Index;
