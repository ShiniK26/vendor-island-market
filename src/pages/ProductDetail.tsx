import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Star, Package, TrendingUp, Percent, DollarSign, ShoppingCart, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Mock data for testing
const mockProducts: Record<string, {
  id: string;
  name: string;
  image: string;
  description: string;
  costPrice: number;
  sellingPrice: number;
  originalPrice: number;
  supplier: string;
  shippingTime: string;
  rating: number;
  totalReviews: number;
  totalOrders: number;
  totalRevenue: number;
  status: string;
}> = {
  "mock-1": {
    id: "mock-1",
    name: "Summer Dress",
    image: "🌸",
    description: "A beautiful summer dress perfect for warm weather occasions. Made with breathable cotton fabric.",
    costPrice: 25.00,
    sellingPrice: 49.99,
    originalPrice: 69.99,
    supplier: "Fashion Wholesale Co.",
    shippingTime: "7-14 days",
    rating: 4.8,
    totalReviews: 124,
    totalOrders: 89,
    totalRevenue: 4449.11,
    status: "published"
  },
  "mock-2": {
    id: "mock-2",
    name: "Winter Jacket",
    image: "🧥",
    description: "Warm and stylish winter jacket with premium insulation. Perfect for cold weather.",
    costPrice: 45.00,
    sellingPrice: 89.99,
    originalPrice: 119.99,
    supplier: "OuterWear Suppliers",
    shippingTime: "10-18 days",
    rating: 4.6,
    totalReviews: 89,
    totalOrders: 67,
    totalRevenue: 6029.33,
    status: "published"
  },
  "mock-3": {
    id: "mock-3",
    name: "Casual Sneakers",
    image: "👟",
    description: "Comfortable everyday sneakers with cushioned soles. Available in multiple sizes.",
    costPrice: 35.00,
    sellingPrice: 79.99,
    originalPrice: 99.99,
    supplier: "Footwear Direct",
    shippingTime: "5-12 days",
    rating: 4.9,
    totalReviews: 203,
    totalOrders: 156,
    totalRevenue: 12478.44,
    status: "published"
  },
  "mock-4": {
    id: "mock-4",
    name: "Designer Handbag",
    image: "👜",
    description: "Elegant designer handbag with premium leather finish. Spacious interior with multiple compartments.",
    costPrice: 55.00,
    sellingPrice: 129.99,
    originalPrice: 179.99,
    supplier: "Luxury Bags Inc.",
    shippingTime: "8-15 days",
    rating: 4.7,
    totalReviews: 156,
    totalOrders: 98,
    totalRevenue: 12739.02,
    status: "published"
  }
};

const ProductDetail = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { toast } = useToast();
  
  const initialProduct = productId ? mockProducts[productId] : null;
  
  // Use state to store product data so it persists after updates
  const [product, setProduct] = useState(initialProduct);
  const [profitAmount, setProfitAmount] = useState(initialProduct ? initialProduct.sellingPrice - initialProduct.costPrice : 10);
  const [handlingFee, setHandlingFee] = useState(2);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [saving, setSaving] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex flex-col items-center justify-center p-4">
        <p className="text-muted-foreground mb-4">Product not found</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const costPrice = product.costPrice;
  const calculatedPrice = costPrice + profitAmount + handlingFee;
  const finalPrice = discountPercent > 0 ? calculatedPrice * (1 - discountPercent / 100) : calculatedPrice;
  const profit = finalPrice - costPrice;

  const handleSavePricing = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update local state to persist the change
    setProduct(prev => prev ? { ...prev, sellingPrice: finalPrice } : prev);
    
    // Also update mock data for cross-page persistence
    if (productId && mockProducts[productId]) {
      mockProducts[productId].sellingPrice = finalPrice;
    }
    
    toast({
      title: "Success",
      description: `Pricing updated to $${finalPrice.toFixed(2)}`
    });
    setSaving(false);
  };

  const handleUnpublish = async () => {
    setSaving(true);
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 500));
    toast({
      title: "Success",
      description: "Product moved to drafts"
    });
    setSaving(false);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <header className="p-4 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-sm mx-auto flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate('/storefront')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-bold">Product Details</h1>
        </div>
      </header>

      <div className="px-4 py-6 max-w-sm mx-auto space-y-6">
        {/* Product Header */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-secondary rounded-lg flex items-center justify-center text-4xl shrink-0">
                {product.image}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold text-lg leading-tight">{product.name}</h2>
                  <Badge variant={product.status === "published" ? "default" : "secondary"}>
                    {product.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Supplier: {product.supplier}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-bold">{product.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground">{product.totalReviews} reviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-primary mb-1">
                <ShoppingCart className="h-4 w-4" />
                <span className="font-bold">{product.totalOrders}</span>
              </div>
              <p className="text-xs text-muted-foreground">Total orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                <DollarSign className="h-4 w-4" />
                <span className="font-bold">${product.totalRevenue.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Total revenue</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                <Package className="h-4 w-4" />
                <span className="font-bold">{product.shippingTime}</span>
              </div>
              <p className="text-xs text-muted-foreground">Shipping time</p>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Management Tabs */}
        <Tabs defaultValue="pricing" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="discounts">Discounts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="pricing" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Profit Settings
                </CardTitle>
                <CardDescription>Set your profit margin and fees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Cost Price</span>
                  <span className="font-medium">${costPrice.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="profit-amount">Profit Amount ($)</Label>
                  <Input
                    id="profit-amount"
                    type="number"
                    value={profitAmount}
                    onChange={(e) => setProfitAmount(Number(e.target.value))}
                    min={0}
                    step={0.5}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="handling-fee">Handling Fee ($)</Label>
                  <Input
                    id="handling-fee"
                    type="number"
                    value={handlingFee}
                    onChange={(e) => setHandlingFee(Number(e.target.value))}
                    min={0}
                    step={0.5}
                  />
                </div>

                <Separator />

                <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Calculated Price</span>
                    <span className="font-medium">${calculatedPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Your Profit</span>
                    <span className="font-medium text-green-600">${profit.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full" onClick={handleSavePricing} disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Save Pricing
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discounts" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Percent className="h-4 w-4" />
                  Discount Settings
                </CardTitle>
                <CardDescription>Apply discounts to attract customers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount Percentage (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    min={0}
                    max={90}
                  />
                </div>

                <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Original Price</span>
                    <span className="line-through">${calculatedPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discounted Price</span>
                    <span className="font-bold text-primary">${finalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Profit After Discount</span>
                    <span className={`font-medium ${(finalPrice - costPrice) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${(finalPrice - costPrice).toFixed(2)}
                    </span>
                  </div>
                </div>

                {discountPercent > 0 && (finalPrice - costPrice) < 3 && (
                  <p className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-950 p-2 rounded">
                    ⚠️ Warning: Your profit margin is very low with this discount.
                  </p>
                )}

                <Button className="w-full" onClick={handleSavePricing} disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Apply Discount
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Performance</CardTitle>
                <CardDescription>How this product is doing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Views (30 days)</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Conversion Rate</span>
                    <span className="font-medium">7.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Rating</span>
                    <span className="font-medium flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      {product.rating}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Return Rate</span>
                    <span className="font-medium text-green-600">2.1%</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-2">Recent Reviews</h4>
                  <div className="space-y-2">
                    <div className="bg-secondary/30 rounded-lg p-3">
                      <div className="flex items-center gap-1 mb-1">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} className={`h-3 w-3 ${i <= 5 ? 'text-yellow-500 fill-current' : 'text-muted'}`} />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">"Great quality, fast shipping!"</p>
                    </div>
                    <div className="bg-secondary/30 rounded-lg p-3">
                      <div className="flex items-center gap-1 mb-1">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} className={`h-3 w-3 ${i <= 4 ? 'text-yellow-500 fill-current' : 'text-muted'}`} />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">"Love this product, will buy again"</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        {product.status === "published" && (
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleUnpublish}
            disabled={saving}
          >
            {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Unpublish
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
