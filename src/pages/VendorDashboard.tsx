import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

const VendorDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 pb-20">
      {/* Header */}
      <header className="p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-sm mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-primary">
            VendorIsland
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-medium">Dashboard</h1>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 max-w-sm mx-auto space-y-6">
        {/* Welcome Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Welcome back, Alex!</CardTitle>
            <CardDescription>Trendy Fashion Store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-xs text-muted-foreground">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">$2,340</div>
                <div className="text-xs text-muted-foreground">Revenue</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">45</div>
                <div className="text-xs text-muted-foreground">Orders</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Quick Actions</h3>
          
          <Button className="w-full justify-start" variant="outline" asChild>
            <Link to="/products">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Product
            </Link>
          </Button>
          
          <Button className="w-full justify-start" variant="outline" asChild>
            <Link to="/products">
              <User className="mr-2 h-4 w-4" />
              Manage Products
            </Link>
          </Button>
          
          <Button className="w-full justify-start" variant="outline">
            <User className="mr-2 h-4 w-4" />
            View Orders
          </Button>
          
          <Button className="w-full justify-start" variant="outline" asChild>
            <Link to="/storefront">
              <User className="mr-2 h-4 w-4" />
              Preview Storefront
            </Link>
          </Button>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">New order #1234</p>
                <p className="text-xs text-muted-foreground">Summer Dress - Blue</p>
              </div>
              <span className="text-sm text-primary font-medium">$49.99</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Product added</p>
                <p className="text-xs text-muted-foreground">Winter Jacket - Black</p>
              </div>
              <span className="text-xs text-muted-foreground">2h ago</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Order shipped #1233</p>
                <p className="text-xs text-muted-foreground">Casual Sneakers</p>
              </div>
              <span className="text-xs text-muted-foreground">5h ago</span>
            </div>
          </CardContent>
        </Card>

        {/* Store Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Sales</span>
                <span className="text-sm font-medium">+23%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Visitors</span>
                <span className="text-sm font-medium">+12%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Conversion</span>
                <span className="text-sm font-medium">3.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default VendorDashboard;