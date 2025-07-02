import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { User, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";

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

      {/* Hero Image */}
      <div className="px-4 pt-8 pb-6 max-w-sm mx-auto">
        <div className="w-full h-64 rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop" 
            alt="Mountain landscape with sun rays" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 pb-6 max-w-sm mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-foreground">
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
              Launch your decentralized storefront with cutting-edge blockchain technology. No coding required - our intuitive dashboard makes Web3 commerce accessible to everyone, from complete beginners to seasoned entrepreneurs.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Dropshipping Integration</CardTitle>
            <CardDescription>
              Seamlessly connect with verified suppliers through our smart contract ecosystem. Automated inventory sync, transparent supply chains, and instant product imports powered by distributed ledger technology for maximum efficiency.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">User-Friendly Design</CardTitle>
            <CardDescription>
              Experience next-generation mobile commerce with progressive web app technology. Our responsive interface adapts perfectly to any device while maintaining lightning-fast performance and intuitive navigation for modern users.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Index;
