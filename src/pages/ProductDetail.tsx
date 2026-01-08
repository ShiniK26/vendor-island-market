import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Star, Package, TrendingUp, Percent, DollarSign, ShoppingCart, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<{
    id: string;
    name: string;
    images: string[] | null;
    description: string | null;
    cost_price: number;
    selling_price: number | null;
    shipping_cost: number;
    supplier_name: string | null;
    supplier_link: string | null;
    shipping_time_min: number | null;
    shipping_time_max: number | null;
    status: string;
  } | null>(null);

  const [profitAmount, setProfitAmount] = useState(10);
  const [handlingFee, setHandlingFee] = useState(2);
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      
      setLoading(true);
      const { data, error } = await supabase
        .from('catalog_products')
        .select('*')
        .eq('id', productId)
        .maybeSingle();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load product",
          variant: "destructive"
        });
        navigate(-1);
        return;
      }

      if (!data) {
        toast({
          title: "Not Found",
          description: "Product not found",
          variant: "destructive"
        });
        navigate(-1);
        return;
      }

      setProduct(data);
      // Calculate initial profit from existing selling price
      if (data.selling_price) {
        const existingProfit = data.selling_price - data.cost_price - data.shipping_cost;
        setProfitAmount(Math.max(0, existingProfit));
        setHandlingFee(data.shipping_cost);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId, navigate, toast]);

  const costPrice = product?.cost_price || 0;
  const calculatedPrice = costPrice + profitAmount + handlingFee;
  const finalPrice = discountPercent > 0 ? calculatedPrice * (1 - discountPercent / 100) : calculatedPrice;
  const profit = finalPrice - costPrice;

  const handleSavePricing = async () => {
    if (!product) return;
    
    setSaving(true);
    const { error } = await supabase
      .from('catalog_products')
      .update({
        selling_price: finalPrice,
        shipping_cost: handlingFee
      })
      .eq('id', product.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save pricing",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Pricing saved successfully"
      });
      setProduct({ ...product, selling_price: finalPrice, shipping_cost: handlingFee });
    }
    setSaving(false);
  };

  const handleUnpublish = async () => {
    if (!product) return;
    
    setSaving(true);
    const { error } = await supabase
      .from('catalog_products')
      .update({ status: 'draft' })
      .eq('id', product.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to unpublish product",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Product moved to drafts"
      });
      navigate(-1);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const shippingTime = product.shipping_time_min && product.shipping_time_max 
    ? `${product.shipping_time_min}-${product.shipping_time_max} days`
    : "N/A";

  const productImage = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <header className="p-4 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-sm mx-auto flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
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
              <div className="w-20 h-20 bg-secondary rounded-lg flex items-center justify-center text-4xl shrink-0 overflow-hidden">
                {productImage ? (
                  <img src={productImage} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  "📦"
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold text-lg leading-tight">{product.name}</h2>
                  <Badge variant={product.status === "published" ? "default" : "secondary"}>
                    {product.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {product.description || "No description"}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Supplier: {product.supplier_name || "Unknown"}
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
                <span className="font-bold">--</span>
              </div>
              <p className="text-xs text-muted-foreground">No reviews yet</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-primary mb-1">
                <ShoppingCart className="h-4 w-4" />
                <span className="font-bold">0</span>
              </div>
              <p className="text-xs text-muted-foreground">Total orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                <DollarSign className="h-4 w-4" />
                <span className="font-bold">$0.00</span>
              </div>
              <p className="text-xs text-muted-foreground">Total revenue</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                <Package className="h-4 w-4" />
                <span className="font-bold">{shippingTime}</span>
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
                    <span className={`font-medium ${profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
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
                    <span className="font-medium">--</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Conversion Rate</span>
                    <span className="font-medium">--</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Rating</span>
                    <span className="font-medium flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      --
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Return Rate</span>
                    <span className="font-medium">--</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-2">Recent Reviews</h4>
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No reviews yet
                  </p>
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
