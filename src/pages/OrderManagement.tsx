import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import BurgerMenu from "@/components/BurgerMenu";
import ProfileMenu from "@/components/ProfileMenu";
const OrderManagement = () => {
  const orders = [{
    id: "#1234",
    customer: "John Doe",
    product: "Summer Dress",
    amount: "$49.99",
    status: "Processing",
    date: "2024-01-15"
  }, {
    id: "#1235",
    customer: "Jane Smith",
    product: "Winter Jacket",
    amount: "$89.99",
    status: "Shipped",
    date: "2024-01-14"
  }, {
    id: "#1236",
    customer: "Mike Johnson",
    product: "Casual Sneakers",
    amount: "$79.99",
    status: "Delivered",
    date: "2024-01-13"
  }];
  return <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 pb-20">
      {/* Header */}
      <header className="p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-sm mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BurgerMenu />
            <Link to="/" className="text-xl font-bold text-primary">
              VendorIsland
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
        <h1 className="text-xl font-bold text-primary">Order Management</h1>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-primary">12</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-primary">8</div>
              <div className="text-xs text-muted-foreground">Shipped</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-primary">45</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">All</Button>
          <Button variant="outline" size="sm" className="flex-1">Delivered</Button>
          <Button variant="outline" size="sm" className="flex-1">Shipped</Button>
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {orders.map(order => <Card key={order.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{order.id}</h3>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' : order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{order.product}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <span className="font-bold text-primary">{order.amount}</span>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>

      <BottomNavigation />
    </div>;
};
export default OrderManagement;