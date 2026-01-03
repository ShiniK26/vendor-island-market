import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2 } from "lucide-react";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  description: z.string().max(2000).optional(),
  supplier_name: z.string().max(100).optional(),
  supplier_link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  cost_price: z.number().min(0.01, "Cost must be at least $0.01"),
  shipping_cost: z.number().min(0).optional(),
  shipping_time_min: z.number().int().min(1).optional(),
  shipping_time_max: z.number().int().min(1).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface Props {
  onImport: (data: ProductFormData) => Promise<void>;
}

export function ImportProductDialog({ onImport }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});
  const [formData, setFormData] = useState<Partial<ProductFormData>>({
    name: "",
    description: "",
    supplier_name: "",
    supplier_link: "",
    cost_price: 0,
    shipping_cost: 0,
    shipping_time_min: undefined,
    shipping_time_max: undefined,
  });

  const handleChange = (field: keyof ProductFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setErrors({});

      const parsed = productSchema.safeParse({
        ...formData,
        cost_price: Number(formData.cost_price),
        shipping_cost: Number(formData.shipping_cost) || 0,
        shipping_time_min: formData.shipping_time_min ? Number(formData.shipping_time_min) : undefined,
        shipping_time_max: formData.shipping_time_max ? Number(formData.shipping_time_max) : undefined,
        supplier_link: formData.supplier_link || undefined,
      });

      if (!parsed.success) {
        const fieldErrors: Partial<Record<keyof ProductFormData, string>> = {};
        parsed.error.errors.forEach((err) => {
          const field = err.path[0] as keyof ProductFormData;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      await onImport(parsed.data);
      setOpen(false);
      setFormData({
        name: "",
        description: "",
        supplier_name: "",
        supplier_link: "",
        cost_price: 0,
        shipping_cost: 0,
      });
    } catch (error) {
      console.error("Import error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Import Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Product to Catalog</DialogTitle>
          <DialogDescription>
            Add a product from any supplier to your private catalog.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g., Wireless Bluetooth Earbuds"
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Product description..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplier_name">Supplier Name</Label>
              <Input
                id="supplier_name"
                value={formData.supplier_name}
                onChange={(e) => handleChange("supplier_name", e.target.value)}
                placeholder="e.g., AliExpress"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier_link">Supplier Link</Label>
              <Input
                id="supplier_link"
                value={formData.supplier_link}
                onChange={(e) => handleChange("supplier_link", e.target.value)}
                placeholder="https://..."
              />
              {errors.supplier_link && (
                <p className="text-sm text-destructive">{errors.supplier_link}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cost_price">Cost Price ($) *</Label>
              <Input
                id="cost_price"
                type="number"
                step="0.01"
                min="0"
                value={formData.cost_price}
                onChange={(e) => handleChange("cost_price", e.target.value)}
                placeholder="0.00"
              />
              {errors.cost_price && (
                <p className="text-sm text-destructive">{errors.cost_price}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="shipping_cost">Shipping Cost ($)</Label>
              <Input
                id="shipping_cost"
                type="number"
                step="0.01"
                min="0"
                value={formData.shipping_cost}
                onChange={(e) => handleChange("shipping_cost", e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shipping_time_min">Min Shipping (days)</Label>
              <Input
                id="shipping_time_min"
                type="number"
                min="1"
                value={formData.shipping_time_min || ""}
                onChange={(e) => handleChange("shipping_time_min", e.target.value)}
                placeholder="7"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shipping_time_max">Max Shipping (days)</Label>
              <Input
                id="shipping_time_max"
                type="number"
                min="1"
                value={formData.shipping_time_max || ""}
                onChange={(e) => handleChange("shipping_time_max", e.target.value)}
                placeholder="21"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add to Catalog
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
