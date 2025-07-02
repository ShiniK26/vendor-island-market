import { useState } from "react";
import { Menu, Bell, RefreshCw, Shield, IdCard, Mail, Lock, Info, FileText, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);

  const menuSections = [
    {
      title: "App",
      items: [
        { name: "Announcements", icon: Bell, path: "/announcements" },
        { name: "Updates", icon: RefreshCw, path: "/updates" },
      ]
    },
    {
      title: "Account",
      items: [
        { name: "Basic Verification", icon: Shield, path: "/basic-verification" },
        { name: "Identity Verification", icon: IdCard, path: "/identity-verification" },
        { name: "Email Authentication", icon: Mail, path: "/email-authentication" },
        { name: "Fund Password", icon: Lock, path: "/fund-password" },
      ]
    },
    {
      title: "Misc",
      items: [
        { name: "About Us", icon: Info, path: "/about-us" },
        { name: "Terms of Service", icon: FileText, path: "/terms-of-service" },
        { name: "Privacy Policy", icon: Eye, path: "/privacy-policy" },
      ]
    }
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {menuSections.map((section, sectionIndex) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                ))}
              </div>
              {sectionIndex < menuSections.length - 1 && (
                <Separator className="mt-4" />
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BurgerMenu;