import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Plus, Trash2, GripVertical } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import BurgerMenu from "@/components/BurgerMenu";
import ProfileMenu from "@/components/ProfileMenu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface PricingRule {
  id: string;
  name: string;
  priority: number;
  category: string | null;
  min_price: number | null;
  max_price: number | null;
  shipping_zone: string | null;
  markup_type: string;
  markup_value: number;
  handling_fee: number | null;
  minimum_profit: number | null;
  rounding_rule: string;
  is_active: boolean;
}

const PricingRules = () => {
  const [rules, setRules] = useState<PricingRule[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRules = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("pricing_rules")
        .select("*")
        .eq("user_id", user.id)
        .order("priority", { ascending: false });

      if (error) throw error;
      setRules((data || []) as PricingRule[]);
    } catch (error: any) {
      console.error("Error fetching rules:", error);
      toast({
        title: "Error",
        description: "Failed to load pricing rules",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createRule = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("pricing_rules")
        .insert({
          user_id: user.id,
          name: "New Rule",
          priority: rules.length,
          markup_type: "percentage",
          markup_value: 25,
          minimum_profit: 3,
          rounding_rule: "end_99",
        })
        .select()
        .single();

      if (error) throw error;
      setRules((prev) => [data as PricingRule, ...prev]);
      toast({
        title: "Success",
        description: "Pricing rule created",
      });
    } catch (error: any) {
      console.error("Error creating rule:", error);
      toast({
        title: "Error",
        description: "Failed to create rule",
        variant: "destructive",
      });
    }
  };

  const updateRule = async (id: string, updates: Partial<PricingRule>) => {
    try {
      const { error } = await supabase
        .from("pricing_rules")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      setRules((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
      );
    } catch (error: any) {
      console.error("Error updating rule:", error);
      toast({
        title: "Error",
        description: "Failed to update rule",
        variant: "destructive",
      });
    }
  };

  const deleteRule = async (id: string) => {
    try {
      const { error } = await supabase
        .from("pricing_rules")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setRules((prev) => prev.filter((r) => r.id !== id));
      toast({
        title: "Success",
        description: "Rule deleted",
      });
    } catch (error: any) {
      console.error("Error deleting rule:", error);
      toast({
        title: "Error",
        description: "Failed to delete rule",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 pb-20">
      {/* Header */}
      <header className="p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-sm mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BurgerMenu />
            <Link to="/finances" className="text-xl font-bold text-primary">
              Pricing Rules
            </Link>
          </div>
          <ProfileMenu>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </ProfileMenu>
        </div>
      </header>

      <div className="px-4 py-6 max-w-sm mx-auto space-y-6">
        {/* Info Card */}
        <Card>
          <CardContent className="pt-6 pb-4">
            <CardTitle className="text-lg mb-2">💰 Automatic Pricing</CardTitle>
            <CardDescription>
              Set rules to automatically calculate selling prices from your catalog costs.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Add Rule Button */}
        <Button onClick={createRule} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Pricing Rule
        </Button>

        {/* Rules List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="space-y-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : rules.length > 0 ? (
          <div className="space-y-4">
            {rules.map((rule) => (
              <Card key={rule.id}>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <Input
                        value={rule.name}
                        onChange={(e) => updateRule(rule.id, { name: e.target.value })}
                        className="font-medium border-none px-0 h-auto focus-visible:ring-0"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={rule.is_active}
                        onCheckedChange={(checked) =>
                          updateRule(rule.id, { is_active: checked })
                        }
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => deleteRule(rule.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-xs">Markup Type</Label>
                      <Select
                        value={rule.markup_type}
                        onValueChange={(v) => updateRule(rule.id, { markup_type: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                          <SelectItem value="tiered">Tiered</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">
                        Markup {rule.markup_type === "percentage" ? "(%)" : "($)"}
                      </Label>
                      <Input
                        type="number"
                        value={rule.markup_value}
                        onChange={(e) =>
                          updateRule(rule.id, { markup_value: Number(e.target.value) })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-xs">Handling Fee ($)</Label>
                      <Input
                        type="number"
                        value={rule.handling_fee || ""}
                        onChange={(e) =>
                          updateRule(rule.id, {
                            handling_fee: e.target.value ? Number(e.target.value) : null,
                          })
                        }
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Min Profit ($)</Label>
                      <Input
                        type="number"
                        value={rule.minimum_profit || ""}
                        onChange={(e) =>
                          updateRule(rule.id, {
                            minimum_profit: e.target.value ? Number(e.target.value) : null,
                          })
                        }
                        placeholder="3.00"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Rounding</Label>
                    <Select
                      value={rule.rounding_rule}
                      onValueChange={(v) => updateRule(rule.id, { rounding_rule: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Rounding</SelectItem>
                        <SelectItem value="up">Round Up</SelectItem>
                        <SelectItem value="down">Round Down</SelectItem>
                        <SelectItem value="nearest">Nearest</SelectItem>
                        <SelectItem value="end_99">End in .99</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-xs">Category Filter</Label>
                      <Input
                        value={rule.category || ""}
                        onChange={(e) =>
                          updateRule(rule.id, { category: e.target.value || null })
                        }
                        placeholder="Any"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Price Range ($)</Label>
                      <div className="flex gap-1">
                        <Input
                          type="number"
                          value={rule.min_price || ""}
                          onChange={(e) =>
                            updateRule(rule.id, {
                              min_price: e.target.value ? Number(e.target.value) : null,
                            })
                          }
                          placeholder="Min"
                          className="w-1/2"
                        />
                        <Input
                          type="number"
                          value={rule.max_price || ""}
                          onChange={(e) =>
                            updateRule(rule.id, {
                              max_price: e.target.value ? Number(e.target.value) : null,
                            })
                          }
                          placeholder="Max"
                          className="w-1/2"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-3">💰</div>
              <CardTitle className="text-lg mb-2">No Pricing Rules</CardTitle>
              <CardDescription>
                Create rules to automatically set your selling prices based on costs.
              </CardDescription>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default PricingRules;
