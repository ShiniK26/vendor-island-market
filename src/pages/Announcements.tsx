import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, User } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import BurgerMenu from "@/components/BurgerMenu";

const Announcements = () => {
  const announcements = [
    {
      id: 1,
      title: "New Feature Release",
      message: "We've added new analytics tools to help you track your sales better.",
      date: "Jan 15, 2024",
      type: "feature"
    },
    {
      id: 2,
      title: "Maintenance Window",
      message: "Scheduled maintenance on Sunday, Jan 21st from 2-4 AM EST.",
      date: "Jan 14, 2024",
      type: "maintenance"
    },
    {
      id: 3,
      title: "Holiday Sale Event",
      message: "Join our special holiday promotion starting next week!",
      date: "Jan 13, 2024",
      type: "promotion"
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
        <h1 className="text-xl font-bold text-primary">Announcements</h1>
        
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm">{announcement.title}</CardTitle>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    announcement.type === 'feature' ? 'bg-blue-100 text-blue-700' :
                    announcement.type === 'maintenance' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {announcement.type}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{announcement.message}</p>
                <p className="text-xs text-muted-foreground">{announcement.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Announcements;