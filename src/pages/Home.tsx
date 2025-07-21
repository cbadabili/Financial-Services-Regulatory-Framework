import { 
  Shield, 
  FileText, 
  Search, 
  Bell, 
  TrendingUp, 
  Users, 
  CheckCircle,
  ArrowRight,
  BarChart3,
  Eye,
  Download,
  AlertTriangle,
  Zap,
  Filter,
  Clock,
  TrendingDown,
  Tag
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Popular search categories
  const searchCategories = [
    { name: "Banking", icon: Shield },
    { name: "AML/CFT", icon: AlertTriangle },
    { name: "Licensing", icon: FileText },
    { name: "Capital Requirements", icon: BarChart3 },
    { name: "Reporting", icon: TrendingUp }
  ];

  // Popular/recent searches
  const popularSearches = [
    "Banking Act Amendment 2025",
    "AML/CFT Guidelines",
    "Capital Adequacy Requirements",
    "Quarterly Risk Assessment",
    "ESG Reporting Standards"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}${selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : ''}`);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handlePopularSearchClick = (term: string) => {
    setSearchQuery(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  const features = [
    {
      icon: FileText,
      title: "Document Library",
      description: "Access 847 regulatory documents from all financial authorities",
      count: "847",
      color: "bob-blue",
      link: "/documents"
    },
    {
      icon: Search,
      title: "Regulatory Search",
      description: "Advanced search across all regulatory frameworks",
      count: "Real-time",
      color: "bob-blue",
      link: "/search"
    },
    {
      icon: CheckCircle,
      title: "Compliance Center",
      description: "Track compliance requirements and deadlines",
      count: "12 Active",
      color: "bob-gold",
      link: "/compliance"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Generate compliance reports and analytics",
      count: "Live Data",
      color: "nbfira-green",
      link: "/analytics"
    }
  ];

  const regulators = [
    {
      name: "Bank of Botswana",
      description: "Central banking and monetary policy oversight",
      documents: 234,
      icon: Shield,
      color: "bob-blue",
      recentUpdate: "New AML guidelines published"
    },
    {
      name: "NBFIRA",
      description: "Non-bank financial services regulation",
      documents: 156,
      icon: TrendingUp,
      color: "nbfira-green",
      recentUpdate: "Capital adequacy requirements updated"
    },
    {
      name: "Botswana Stock Exchange",
      description: "Securities market regulation and oversight",
      documents: 89,
      icon: BarChart3,
      color: "bse-orange",
      recentUpdate: "Market conduct guidelines released"
    },
    {
      name: "Financial Intelligence Agency",
      description: "Anti-money laundering and counter-terrorism financing",
      documents: 67,
      icon: AlertTriangle,
      color: "fia-purple",
      recentUpdate: "Enhanced due diligence requirements"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Shield className="h-16 w-16 text-bob-gold" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Financial Services Regulatory Frameworks Portal
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Unified platform for accessing regulatory frameworks, policies, and licensing requirements 
              across Botswana's financial authorities. Build innovative solutions for regulatory compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-bob-gold hover:bg-bob-gold/90 text-bob-dark font-semibold shadow-gold"
                onClick={() => navigate('/login')}
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Compliance Journey
              </Button>
              <Button 
                size="lg" 
                variant="hero"
                onClick={() => navigate('/documents')}
              >
                <Search className="mr-2 h-5 w-5" />
                Start Exploring
              </Button>
              <Button 
                size="lg" 
                variant="hero"
                onClick={() => navigate('/documents')}
              >
                <FileText className="mr-2 h-5 w-5" />
                Browse Documents
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Universal Search Section */}
      <section className="py-10 bg-background border-b">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Search Across All Regulatory Documents</h2>
              <p className="text-muted-foreground">
                Find regulations, policies, and guidance from all financial authorities
              </p>
            </div>
            
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="text"
                  placeholder="Search for regulations, policies, guidelines..."
                  className="pl-12 py-6 text-lg rounded-lg shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  Search
                </Button>
              </div>
            </form>
            
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2 flex items-center">
                <Filter className="h-4 w-4 mr-1" /> Filter by category:
              </p>
              <div className="flex flex-wrap gap-2">
                {searchCategories.map((category, index) => (
                  <Button
                    key={index}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryClick(category.name)}
                    className="flex items-center"
                  >
                    <category.icon className="h-4 w-4 mr-2" />
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2 flex items-center">
                <Clock className="h-4 w-4 mr-1" /> Popular searches:
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80 transition-colors"
                    onClick={() => handlePopularSearchClick(term)}
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-card border-bob-blue/20 hover:shadow-primary transition-all">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <FileText className="h-12 w-12 text-bob-blue" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">847</h3>
                <p className="text-muted-foreground">Active Regulations</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-bob-gold/20 hover:shadow-gold transition-all">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-bob-gold" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">1,200+</h3>
                <p className="text-muted-foreground">Active Users</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-nbfira-green/20 hover:shadow-medium transition-all">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Shield className="h-12 w-12 text-nbfira-green" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">4</h3>
                <p className="text-muted-foreground">Regulatory Bodies</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-fia-purple/20 hover:shadow-medium transition-all">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <TrendingUp className="h-12 w-12 text-fia-purple" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">99.9%</h3>
                <p className="text-muted-foreground">Uptime</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Comprehensive Regulatory Management
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access all the tools you need to stay compliant with Botswana's financial regulatory requirements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="hover:shadow-large transition-all cursor-pointer group"
                onClick={() => navigate(feature.link)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full bg-${feature.color}/10`}>
                      <feature.icon className={`h-8 w-8 text-${feature.color}`} />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Badge variant="secondary" className="mb-4">
                    {feature.count}
                  </Badge>
                  <div className="flex justify-center">
                    <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Bodies */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Regulatory Authorities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unified access to all major financial regulatory bodies in Botswana
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regulators.map((regulator, index) => (
              <Card key={index} className="hover:shadow-medium transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full bg-${regulator.color}/10 flex-shrink-0`}>
                      <regulator.icon className={`h-6 w-6 text-${regulator.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {regulator.name}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {regulator.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline">
                            {regulator.documents} documents
                          </Badge>
                          <Button variant="ghost" size="sm" onClick={() => navigate('/documents')}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-muted/30 rounded text-sm">
                        <span className="text-muted-foreground">Latest: </span>
                        <span className="text-foreground">{regulator.recentUpdate}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="py-16 bg-gradient-dark text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recent Regulatory Updates</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Stay up-to-date with the latest regulatory changes and announcements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Bell className="h-5 w-5 text-bob-gold" />
                  <Badge className="bg-bob-gold text-bob-dark">New</Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Enhanced AML Requirements
                </h3>
                <p className="text-white/80 mb-4">
                  Bank of Botswana introduces new anti-money laundering guidelines effective immediately.
                </p>
                <Button variant="ghost" className="text-bob-gold hover:bg-bob-gold hover:text-bob-dark">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="h-5 w-5 text-bob-gold" />
                  <Badge variant="outline" className="border-white/30 text-white">Updated</Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Capital Adequacy Ratios
                </h3>
                <p className="text-white/80 mb-4">
                  NBFIRA updates minimum capital requirements for insurance companies and pension funds.
                </p>
                <Button variant="ghost" className="text-bob-gold hover:bg-bob-gold hover:text-bob-dark">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <BarChart3 className="h-5 w-5 text-bob-gold" />
                  <Badge variant="outline" className="border-white/30 text-white">Consultation</Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Market Conduct Framework
                </h3>
                <p className="text-white/80 mb-4">
                  BSE invites public comments on proposed market conduct guidelines for listed entities.
                </p>
                <Button variant="ghost" className="text-bob-gold hover:bg-bob-gold hover:text-bob-dark">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Participate
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-bob-blue text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join over 1,200 financial institutions already using the Botswana Financial Regulatory Portal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-bob-gold hover:bg-bob-gold/90 text-bob-dark font-semibold"
              onClick={() => navigate('/documents')}
            >
              Browse Regulations
            </Button>
            <Button 
              size="lg" 
              variant="hero"
              onClick={() => navigate('/login')}
            >
              Set Up Alerts
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
