import { 
  Search, 
  BookOpen, 
  FileText, 
  Download, 
  ExternalLink,
  Shield,
  Building2,
  Briefcase,
  Users,
  Scale,
  Phone,
  Star,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function Knowledge() {
  const [searchQuery, setSearchQuery] = useState("");

  const regulatoryBodies = [
    {
      name: "Bank of Botswana (BoB)",
      description: "Central bank regulating banking institutions, payment systems, and foreign exchange",
      icon: Building2,
      color: "bob-blue",
      keyFunctions: ["Banking supervision", "Monetary policy", "Payment systems oversight"],
      website: "www.bankofbotswana.bw"
    },
    {
      name: "Non-Bank Financial Institutions Regulatory Authority (NBFIRA)",
      description: "Regulates insurance, pension funds, micro-finance, and capital markets",
      icon: Shield,
      color: "nbfira-green",
      keyFunctions: ["Insurance regulation", "Pension fund supervision", "Capital markets oversight"],
      website: "www.nbfira.org.bw"
    },
    {
      name: "Companies and Intellectual Property Authority (CIPA)",
      description: "Manages business registration, company incorporation, and intellectual property",
      icon: Briefcase,
      color: "cipa-orange",
      keyFunctions: ["Company registration", "Beneficial ownership", "IP protection"],
      website: "www.cipa.co.bw"
    },
    {
      name: "Financial Intelligence Agency (FIA)",
      description: "Anti-money laundering and combating financing of terrorism",
      icon: Search,
      color: "fia-purple",
      keyFunctions: ["AML/CFT compliance", "Financial intelligence", "Suspicious transaction reporting"],
      website: "www.fia.gov.bw"
    },
    {
      name: "Botswana Communications Regulatory Authority (BOCRA)",
      description: "Regulates electronic communications and digital platforms",
      icon: Phone,
      color: "bocra-teal",
      keyFunctions: ["Digital platform regulation", "Electronic transactions", "Data protection"],
      website: "www.bocra.org.bw"
    },
    {
      name: "Botswana Unified Revenue Service (BURS)",
      description: "Tax administration and revenue collection",
      icon: Scale,
      color: "burs-red",
      keyFunctions: ["Corporate tax", "VAT administration", "Tax compliance"],
      website: "www.burs.org.bw"
    },
    {
      name: "Competition and Consumer Authority (CCA)",
      description: "Promotes fair competition and protects consumer rights",
      icon: Users,
      color: "cca-indigo",
      keyFunctions: ["Competition enforcement", "Consumer protection", "Market investigation"],
      website: "www.competitionauthority.co.bw"
    },
    {
      name: "Public Procurement and Asset Disposal Board (PPADB)",
      description: "Regulates public procurement processes and asset disposal",
      icon: FileText,
      color: "ppadb-amber",
      keyFunctions: ["Procurement oversight", "Vendor registration", "Asset disposal"],
      website: "www.ppadb.co.bw"
    }
  ];

  const knowledgeCategories = [
    {
      title: "Licensing Requirements",
      description: "Comprehensive guides for obtaining various financial service licenses",
      icon: FileText,
      documentCount: 24,
      color: "blue"
    },
    {
      title: "Compliance Guidelines",
      description: "Step-by-step compliance procedures and best practices",
      icon: Shield,
      documentCount: 18,
      color: "green"
    },
    {
      title: "Regulatory Updates",
      description: "Latest regulatory changes and amendments",
      icon: Star,
      documentCount: 12,
      color: "purple"
    },
    {
      title: "Forms & Templates",
      description: "Downloadable forms and document templates",
      icon: Download,
      documentCount: 36,
      color: "orange"
    }
  ];

  const featuredResources = [
    {
      title: "7-Phase FinTech Roadmap for Botswana",
      description: "Complete strategic guide from concept to public listing",
      type: "Strategic Guide",
      pages: 85,
      regulator: "Multi-agency"
    },
    {
      title: "Starting a Financial Services Business in Botswana",
      description: "Complete guide to establishing financial services operations",
      type: "Guide",
      pages: 45,
      regulator: "Multi-agency"
    },
    {
      title: "AML/CFT Compliance Handbook",
      description: "Anti-money laundering and counter-financing terrorism requirements",
      type: "Handbook",
      pages: 78,
      regulator: "FIA"
    },
    {
      title: "Digital Payment Services Framework",
      description: "Regulatory framework for digital payment providers",
      type: "Framework",
      pages: 32,
      regulator: "BoB"
    },
    {
      title: "Beneficial Ownership Declaration Guide",
      description: "Complete guide to FIA beneficial ownership requirements",
      type: "Compliance Guide",
      pages: 24,
      regulator: "FIA & CIPA"
    },
    {
      title: "BSE Listing Requirements for FinTech",
      description: "Pathway to public markets and capital raising",
      type: "Listing Guide",
      pages: 38,
      regulator: "BSE/NBFIRA"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-header py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              Knowledge Center
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Your comprehensive resource for financial services regulation in Botswana. 
              Access guides, forms, and regulatory information from all authorities.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search knowledge base, regulations, forms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg bg-background/95 backdrop-blur-sm"
              />
              <Button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => {
                  if (searchQuery.trim()) {
                    window.open(`/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
                  } else {
                    alert("Please enter a search query first");
                  }
                }}
              >
                <Search className="h-4 w-4 mr-2" />
                AI Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Knowledge Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {knowledgeCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-medium transition-all cursor-pointer">
                <CardHeader className="text-center">
                  <div className={`p-3 rounded-full bg-${category.color}/10 w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    <category.icon className={`h-8 w-8 text-${category.color}`} />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                  <Badge variant="outline">{category.documentCount} Resources</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Regulatory Bodies */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Regulatory Authorities</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {regulatoryBodies.map((body, index) => (
              <Card key={index} className="hover:shadow-medium transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full bg-${body.color}/10 flex-shrink-0`}>
                      <body.icon className={`h-6 w-6 text-${body.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{body.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{body.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-foreground mb-2">Key Functions:</h4>
                        <div className="flex flex-wrap gap-1">
                          {body.keyFunctions.map((func, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {func}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <a 
                          href={`https://${body.website}`} 
                          className="text-bob-blue hover:underline text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {body.website}
                        </a>
                        <Button variant="outline" size="sm" onClick={() => window.open(`https://${body.website}`, '_blank')}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit Site
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action for Roadmap */}
        <section className="mb-16">
          <Card className="bg-gradient-dark text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Need Strategic Guidance?</h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Explore our comprehensive 7-phase FinTech roadmap designed specifically for Botswana's regulatory environment. 
                From concept to public listing, get the strategic direction you need.
              </p>
              <Button 
                size="lg"
                className="bg-bob-gold hover:bg-bob-gold/90 text-bob-dark font-semibold"
                onClick={() => window.location.href = '/fintech-roadmap'}
              >
                <Star className="h-5 w-5 mr-2" />
                View Complete Roadmap
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Featured Resources */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Resources</h2>
            <Button variant="outline" onClick={() => window.location.href = '/documents'}>
              View All Resources
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-medium transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{resource.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{resource.description}</p>
                      
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-4">
                        <Badge variant="outline">{resource.type}</Badge>
                        <Badge variant="secondary">{resource.pages} pages</Badge>
                        <Badge variant="outline">{resource.regulator}</Badge>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => {
                      if (resource.title.includes("7-Phase")) {
                        window.location.href = '/fintech-roadmap';
                      } else {
                        window.open('#', '_blank');
                      }
                    }}>
                      <FileText className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="flex-1" onClick={() => {
                      const link = document.createElement('a');
                      link.href = '#';
                      link.download = `${resource.title}.pdf`;
                      link.click();
                    }}>
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}