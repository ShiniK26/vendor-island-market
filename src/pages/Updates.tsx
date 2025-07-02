import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, User } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import BurgerMenu from "@/components/BurgerMenu";

const Updates = () => {
  const updates = [
    {
      id: 1,
      version: "v2.1.0",
      title: "Enhanced Dashboard",
      description: "New analytics widgets and improved performance.",
      date: "Jan 15, 2024"
    },
    {
      id: 2,
      version: "v2.0.5",
      title: "Bug Fixes",
      description: "Fixed issues with order processing and notifications.",
      date: "Jan 10, 2024"
    },
    {
      id: 3,
      version: "v2.0.0",
      title: "Major Update",
      description: "Complete UI redesign and new features for better user experience.",
      date: "Jan 5, 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 pb-20">
      {/* Header */}
      <header className="p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-sm mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BurgerMenu />
            <Link to="/" className="text-xl font-bold text-primary">
              VendorIsland
            </Link>
          </div>
          <Button variant="outline" size="sm">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="px-4 py-6 max-w-sm mx-auto space-y-6">
        <h1 className="text-xl font-bold text-primary">Updates</h1>
        
        <div className="space-y-4">
          {updates.map((update) => (
            <Card key={update.id}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm">{update.title}</CardTitle>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full ml-auto">
                    {update.version}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{update.description}</p>
                <p className="text-xs text-muted-foreground">{update.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Updates;