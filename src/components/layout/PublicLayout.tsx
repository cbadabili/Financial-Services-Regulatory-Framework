import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Home, 
  FileText, 
  Info, 
  Users, 
  Code, 
  Shield,
  Menu, 
  X, 
  LogIn,
  BookOpen,
  BarChart3,
  Route
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Floating chatbot (also used in authenticated layout)
import FAQChatbot from "../chatbot/FAQChatbot";

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const navigationItems = [
    { name: "Knowledge Center", url: "/documents", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Compliance Roadmap", url: "/compliance-roadmap", icon: <Route className="h-5 w-5" /> },
    { name: "Business", url: "/business", icon: <BarChart3 className="h-5 w-5" /> },
    { name: "Developer", url: "/developer", icon: <Code className="h-5 w-5" /> },
    { name: "Contacts", url: "/contacts", icon: <Users className="h-5 w-5" /> },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              {/* BoB navy-blue background with gold shield */}
              <div className="rounded-md bg-[#0b2144] p-1">
                <Shield className="h-6 w-6 text-[#d4af37]" />
              </div>
              <span className="hidden font-bold sm:inline-block">
                Financial Services Regulatory Framework
              </span>
              <span className="font-bold sm:hidden">FSRF</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.url}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.url
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {!isAuthenticated ? (
              <Button
                onClick={() => navigate("/login")}
                className="hidden sm:flex"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.avatarUrl ?? ""} />
                      {/*  BoB navy-blue background & gold initials  */}
                      <AvatarFallback className="font-semibold bg-[#0b2144] text-[#d4af37]">
                        {user?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="container py-2 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.url}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    location.pathname === item.url
                      ? "bg-secondary text-secondary-foreground"
                      : "hover:bg-secondary/50"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              <Button 
                onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }} 
                className="w-full mt-2"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Financial Services Regulatory Framework. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="underline underline-offset-4 hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="underline underline-offset-4 hover:text-foreground">
              Terms
            </Link>
            <Link to="/contacts" className="underline underline-offset-4 hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>

      {/* Floating Regulatory Assistant / FAQ Chatbot */}
      <FAQChatbot />
    </div>
  );
}
