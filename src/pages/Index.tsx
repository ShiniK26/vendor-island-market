import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { User, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
const Index = () => {
  return <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <header className="p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-sm mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">VendorIsland</h1>
          <Button variant="outline" size="sm" asChild>
            <Link to="/auth">
              <User className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
        </div>
      </header>

      {/* Image Marquee */}
      <div className="max-w-sm mx-auto">
        <Carousel plugins={[Autoplay({
        delay: 2000
      })]} className="w-full" opts={{
        align: "start",
        loop: true
      }}>
          <CarouselContent>
            <CarouselItem>
              <Card>
                <CardContent className="p-0">
                  <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=240&fit=crop" alt="Modern tech workspace" className="w-full h-48 object-cover rounded-lg" />
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card>
                <CardContent className="p-0">
                  <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=240&fit=crop" alt="Advanced circuit technology" className="w-full h-48 object-cover rounded-lg" />
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card>
                <CardContent className="p-0">
                  <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=240&fit=crop" alt="Code development interface" className="w-full h-48 object-cover rounded-lg" />
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card>
                <CardContent className="p-0">
                  <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=240&fit=crop" alt="Web development platform" className="w-full h-48 object-cover rounded-lg" />
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Hero Section */}
      <div className="px-4 pb-6 max-w-sm mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 mt-8 text-foreground">Build your own supply. We handle the engine.</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed text-center">
          Your vendor space, your brand, your pricing. Powered by a built-in wallet and automated fulfillment that keeps funds, inventory, and orders perfectly in sync.
        </p>
        
        <Button size="lg" className="w-full mb-4" asChild>
          <Link to="/vendor-signup">
            <UserPlus className="mr-2 h-5 w-5" />
            Launch My Vendor Space
          </Link>
        </Button>
        
        <Button variant="outline" size="lg" className="w-full" asChild>
          
        </Button>
      </div>

      {/* Features */}
      <div className="px-4 pb-8 max-w-sm mx-auto space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Easy Store Setup</CardTitle>
            <CardDescription>
              
Create your niche vendor space in minutes. Import products into your catalog, publish only what fits your brand, and launch without coding. Stay in control of what you sell and how you supply it.












            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Dropshipping Integration</CardTitle>
            <CardDescription>
              
Connect to suppliers like CJ Dropshipping and import products instantly. When orders come in, your wallet reserves the cost, fulfillment runs automatically, and tracking updates sync 
 end-to-end with no manual forwarding.











            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">User-Friendly Design</CardTitle>
            <CardDescription>
              







Everything is built for clarity: product catalog, pricing rules, wallet balance, and order status in one dashboard. Know exactly what’s reserved, what’s shipping, and what’s settled. Nothing gets out of sync.









            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>;
};
export default Index;