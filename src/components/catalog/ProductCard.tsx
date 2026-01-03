import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, ExternalLink, Edit, Trash2, Eye, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface CatalogProduct {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  supplier_name: string | null;
  supplier_link: string | null;
  cost_price: number;
  shipping_cost: number;
  selling_price: number | null;
  shipping_time_min: number | null;
  shipping_time_max: number | null;
  status: "draft" | "published" | "archived";
  last_price_check: string | null;
  price_changed: boolean;
  created_at: string;
}

interface Props {
  product: CatalogProduct;
  onEdit: (product: CatalogProduct) => void;
  onDelete: (id: string) => void;
  onPublish: (product: CatalogProduct) => void;
}

export function ProductCard({ product, onEdit, onDelete, onPublish }: Props) {
  const totalCost = product.cost_price + product.shipping_cost;
  const profit = product.selling_price ? product.selling_price - totalCost : null;
  const profitMargin = profit && product.selling_price ? (profit / product.selling_price) * 100 : null;

  const statusColors = {
    draft: "bg-muted text-muted-foreground",
    published: "bg-green-100 text-green-700",
    archived: "bg-red-100 text-red-700",
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Product Image */}
          <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center text-2xl shrink-0">
            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              "📦"
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-medium text-sm truncate">{product.name}</h3>
                {product.supplier_name && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    {product.supplier_name}
                    {product.supplier_link && (
                      <a
                        href={product.supplier_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </p>
                )}
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(product)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  {product.status === "draft" && (
                    <DropdownMenuItem onClick={() => onPublish(product)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Publish
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => onDelete(product.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Pricing */}
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground">
                Cost: ${totalCost.toFixed(2)}
              </span>
              {product.selling_price && (
                <>
                  <span className="text-xs">→</span>
                  <span className="text-sm font-medium text-primary">
                    ${product.selling_price.toFixed(2)}
                  </span>
                  {profit !== null && (
                    <span className={`text-xs ${profit > 0 ? "text-green-600" : "text-destructive"}`}>
                      (+${profit.toFixed(2)} / {profitMargin?.toFixed(0)}%)
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Shipping Time */}
            {(product.shipping_time_min || product.shipping_time_max) && (
              <p className="text-xs text-muted-foreground mt-1">
                📦 {product.shipping_time_min || "?"}-{product.shipping_time_max || "?"} days
              </p>
            )}

            {/* Status & Warnings */}
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="secondary" className={statusColors[product.status]}>
                {product.status}
              </Badge>
              {product.price_changed && (
                <Badge variant="outline" className="text-amber-600 border-amber-300">
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  Price changed
                </Badge>
              )}
              {product.last_price_check && (
                <span className="text-xs text-muted-foreground">
                  Checked {formatDistanceToNow(new Date(product.last_price_check))} ago
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
