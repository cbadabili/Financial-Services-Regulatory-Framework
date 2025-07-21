import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { title: "Home", url: "/" },
    { title: "Knowledge", url: "/knowledge" },
    { title: "Business", url: "/business" },
    { title: "Developer", url: "/developer" },
    { title: "Contacts", url: "/contacts" }
  ];

  const isActive = (url: string) => {
    if (url === "/" && location.pathname === "/") return true;
    if (url !== "/" && location.pathname.startsWith(url)) return true;
    return false;
  };

  return (
    <header className="bg-gradient-header border-b border-border shadow-medium">
      {/* Main Header */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <Shield className="h-10 w-10 text-primary-foreground" />
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">
                FINANCIAL SERVICES REGULATORY
              </h1>
              <h1 className="text-2xl font-bold text-primary-foreground">
                FRAMEWORKS PORTAL
              </h1>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="hero"
              onClick={() => navigate('/login')}
            >
              Portal Login
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-background/10 backdrop-blur-sm border-t border-primary-foreground/10">
        <div className="container mx-auto px-6">
          <nav className="flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.title}
                onClick={() => navigate(item.url)}
                className={cn(
                  "py-4 px-2 text-sm font-medium transition-all border-b-2 border-transparent",
                  isActive(item.url)
                    ? "text-bob-gold border-bob-gold"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:border-primary-foreground/30"
                )}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}