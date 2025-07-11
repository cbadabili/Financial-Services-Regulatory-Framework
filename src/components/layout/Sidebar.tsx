import { 
  BarChart3, 
  BookOpen, 
  CheckSquare, 
  FileText, 
  Home, 
  Search, 
  Settings,
  Shield,
  TrendingUp,
  Users,
  AlertTriangle,
  Archive
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const mainNavItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    badge: null
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
    badge: null
  },
  {
    title: "Document Library",
    url: "/documents",
    icon: BookOpen,
    badge: "847"
  },
  {
    title: "Regulatory Search",
    url: "/search",
    icon: Search,
    badge: null
  },
  {
    title: "Compliance Center",
    url: "/compliance",
    icon: CheckSquare,
    badge: "12"
  },
  {
    title: "Analytics & Reports",
    url: "/analytics",
    icon: BarChart3,
    badge: null
  }
];

const regulatoryBodies = [
  {
    title: "Bank of Botswana",
    url: "/regulators/bob",
    icon: Shield,
    color: "bob-blue",
    count: "234"
  },
  {
    title: "NBFIRA",
    url: "/regulators/nbfira", 
    icon: TrendingUp,
    color: "nbfira-green",
    count: "156"
  },
  {
    title: "Botswana Stock Exchange",
    url: "/regulators/bse",
    icon: TrendingUp,
    color: "bse-orange", 
    count: "89"
  },
  {
    title: "Financial Intelligence Agency",
    url: "/regulators/fia",
    icon: AlertTriangle,
    color: "fia-purple",
    count: "67"
  }
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col shadow-soft">
      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Main Menu
          </h2>
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                end={item.url === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-smooth",
                    "hover:bg-secondary hover:text-secondary-foreground",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-primary"
                      : "text-foreground"
                  )
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="flex-1">{item.title}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Regulatory Bodies */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Regulatory Bodies
          </h2>
          <div className="space-y-1">
            {regulatoryBodies.map((body) => (
              <NavLink
                key={body.title}
                to={body.url}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-smooth",
                    "hover:bg-secondary hover:text-secondary-foreground",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-primary"
                      : "text-foreground"
                  )
                }
              >
                <body.icon className={`mr-3 h-4 w-4 text-${body.color}`} />
                <span className="flex-1 text-xs">{body.title}</span>
                <Badge variant="outline" className="ml-auto text-xs">
                  {body.count}
                </Badge>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Quick Actions
          </h2>
          <div className="space-y-1">
            <NavLink 
              to="/documents"
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-foreground hover:bg-secondary transition-smooth"
            >
              <FileText className="mr-3 h-4 w-4" />
              Upload Document
            </NavLink>
            <NavLink 
              to="/analytics"
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-foreground hover:bg-secondary transition-smooth"
            >
              <Archive className="mr-3 h-4 w-4" />
              Export Reports
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center text-xs text-muted-foreground">
          <Settings className="mr-2 h-4 w-4" />
          <span>Last updated: Jan 15, 2025</span>
        </div>
      </div>
    </aside>
  );
}