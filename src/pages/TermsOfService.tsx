import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, User } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import BurgerMenu from "@/components/BurgerMenu";

const TermsOfService = () => {
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
        <h1 className="text-xl font-bold text-primary">Terms of Service</h1>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle>Terms & Conditions</CardTitle>
            </div>
            <CardDescription>
              Last updated: January 15, 2024
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-sm mb-2">1. Acceptance of Terms</h3>
              <p className="text-xs text-muted-foreground">
                By accessing and using VendorIsland, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-2">2. Use License</h3>
              <p className="text-xs text-muted-foreground">
                Permission is granted to temporarily use VendorIsland for personal, non-commercial transitory viewing only.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-2">3. Disclaimer</h3>
              <p className="text-xs text-muted-foreground">
                The materials on VendorIsland are provided on an 'as is' basis. VendorIsland makes no warranties, expressed or implied.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-2">4. Account Responsibilities</h3>
              <p className="text-xs text-muted-foreground">
                Users are responsible for maintaining the confidentiality of their account information and for all activities under their account.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground text-center">
              For questions about these Terms of Service, please contact us at legal@vendorisland.com
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default TermsOfService;