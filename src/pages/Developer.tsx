import { Code, Github, FileText, Zap, Shield, Database, Server, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Developer() {
  const resources = [
    {
      icon: Code,
      title: "API Documentation",
      description: "Comprehensive API docs for integrating regulatory data",
      badge: "v2.1",
      color: "bob-blue"
    },
    {
      icon: Database,
      title: "Data Schemas",
      description: "Database schemas and data models for regulatory information",
      badge: "Updated",
      color: "bob-gold"
    },
    {
      icon: Shield,
      title: "Security Guidelines",
      description: "Best practices for secure integration with regulatory systems",
      badge: "Essential",
      color: "nbfira-green"
    },
    {
      icon: Server,
      title: "Sandbox Environment",
      description: "Test environment for developing compliance applications",
      badge: "Free",
      color: "fia-purple"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <Code className="h-16 w-16 text-bob-blue" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Developer Resources
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Build applications that integrate with Botswana's financial regulatory frameworks. 
          Access APIs, documentation, and tools to create innovative fintech solutions.
        </p>
      </div>

      {/* API Overview */}
      <section className="mb-16">
        <Card className="bg-gradient-card border-bob-blue/20">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Globe className="mr-3 h-8 w-8 text-bob-blue" />
              Financial Regulatory API
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-bob-blue mb-2">847</h3>
                <p className="text-muted-foreground">API Endpoints</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-bob-gold mb-2">99.9%</h3>
                <p className="text-muted-foreground">Uptime SLA</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-nbfira-green mb-2">24/7</h3>
                <p className="text-muted-foreground">Support</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Resources Grid */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Development Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <Card key={index} className="hover:shadow-large transition-all cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full bg-${resource.color}/10`}>
                    <resource.icon className={`h-8 w-8 text-${resource.color}`} />
                  </div>
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">{resource.description}</p>
                <Badge variant="secondary" className="mb-4">
                  {resource.badge}
                </Badge>
                <div className="flex justify-center">
                  <Button variant="outline" size="sm" onClick={() => alert(`Accessing ${resource.title}...`)}>
                    Access
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Getting Started */}
      <section className="mb-16">
        <Card className="bg-gradient-dark text-white">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Follow these simple steps to start building with our regulatory API
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-bob-gold text-bob-dark rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Register</h3>
                <p className="text-white/80">Create your developer account and get API credentials</p>
              </div>
              
              <div className="text-center">
                <div className="bg-bob-gold text-bob-dark rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Integrate</h3>
                <p className="text-white/80">Use our SDKs and documentation to integrate the API</p>
              </div>
              
              <div className="text-center">
                <div className="bg-bob-gold text-bob-dark rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Deploy</h3>
                <p className="text-white/80">Launch your compliant financial application</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <Button 
                className="bg-bob-gold hover:bg-bob-gold/90 text-bob-dark font-semibold"
                onClick={() => alert('Redirecting to GitHub repository...')}
              >
                <Github className="mr-2 h-5 w-5" />
                Start Building
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Code Examples */}
      <section>
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Quick Start Examples
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>REST API Example</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <div className="text-muted-foreground">// Get all banking regulations</div>
                <div className="text-foreground">
                  GET /api/v2/regulations?authority=bob
                </div>
                <br />
                <div className="text-muted-foreground">// Response</div>
                <div className="text-foreground">
                  {`{
  "data": [...],
  "total": 234,
  "page": 1
}`}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>JavaScript SDK</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <div className="text-muted-foreground">// Initialize the SDK</div>
                <div className="text-foreground">
                  import FinRegAPI from 'finreg-api';
                </div>
                <br />
                <div className="text-foreground">
                  const api = new FinRegAPI(API_KEY);
                </div>
                <div className="text-foreground">
                  const regs = await api.regulations.getAll();
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}