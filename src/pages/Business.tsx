import { 
  Building2, 
  CheckCircle, 
  FileText, 
  Shield, 
  TrendingUp, 
  Users, 
  Clock,
  AlertTriangle,
  BookOpen,
  PieChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export default function Business() {
  const navigate = useNavigate();

  const services = [
    {
      icon: CheckCircle,
      title: "Licensing Guidance",
      description: "Step-by-step guidance for obtaining financial services licenses",
      link: "/compliance",
      color: "bob-blue"
    },
    {
      icon: FileText,
      title: "Compliance Checklists",
      description: "Customized compliance requirements based on your business type",
      link: "/compliance",
      color: "bob-gold"
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Regulatory risk assessment tools and frameworks",
      link: "/analytics",
      color: "nbfira-green"
    },
    {
      icon: PieChart,
      title: "Reporting Tools",
      description: "Automated regulatory reporting and submission tools",
      link: "/analytics",
      color: "fia-purple"
    }
  ];

  const businessTypes = [
    {
      title: "Banking Institution",
      description: "Commercial banks, savings institutions, and development banks",
      requirements: ["Banking License", "Capital Adequacy", "AML Compliance", "Risk Management"],
      authority: "Bank of Botswana",
      color: "bob-blue"
    },
    {
      title: "Insurance Company",
      description: "Life, non-life, and reinsurance companies",
      requirements: ["Insurance License", "Solvency Requirements", "Corporate Governance", "Consumer Protection"],
      authority: "NBFIRA",
      color: "nbfira-green"
    },
    {
      title: "Investment Firm",
      description: "Securities dealers, investment advisors, and fund managers",
      requirements: ["Securities License", "Client Protection", "Market Conduct", "Financial Reporting"],
      authority: "BSE",
      color: "bse-orange"
    },
    {
      title: "Pension Fund",
      description: "Retirement and pension fund administrators",
      requirements: ["Pension License", "Fiduciary Duties", "Investment Limits", "Member Protection"],
      authority: "NBFIRA",
      color: "nbfira-green"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <Building2 className="h-16 w-16 text-bob-blue" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Business Solutions
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Streamline your regulatory compliance with tailored solutions for financial services businesses. 
          Get the guidance and tools you need to operate successfully in Botswana's regulated environment.
        </p>
      </div>

      {/* Quick Stats */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-bob-blue/20">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-bob-blue mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-foreground mb-2">450+</h3>
              <p className="text-muted-foreground">Licensed Entities</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-bob-gold/20">
            <CardContent className="p-6 text-center">
              <Clock className="h-12 w-12 text-bob-gold mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-foreground mb-2">30%</h3>
              <p className="text-muted-foreground">Faster Licensing</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-nbfira-green/20">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-nbfira-green mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-foreground mb-2">98%</h3>
              <p className="text-muted-foreground">Compliance Rate</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-fia-purple/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-fia-purple mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-foreground mb-2">24/7</h3>
              <p className="text-muted-foreground">Support Available</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Our Business Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="hover:shadow-large transition-all cursor-pointer group"
              onClick={() => navigate(service.link)}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full bg-${service.color}/10`}>
                    <service.icon className={`h-8 w-8 text-${service.color}`} />
                  </div>
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Business Types */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Regulatory Requirements by Business Type
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {businessTypes.map((business, index) => (
            <Card key={index} className="hover:shadow-medium transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground">{business.title}</h3>
                  <Badge variant="outline" className={`text-${business.color} border-${business.color}/30`}>
                    {business.authority}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">{business.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-foreground mb-2">Key Requirements:</h4>
                  <div className="space-y-2">
                    {business.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button variant="outline" size="sm" onClick={() => navigate('/compliance')}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Requirements
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section>
        <Card className="bg-gradient-dark text-white">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-16 w-16 text-bob-gold mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Need Compliance Help?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Our compliance experts are ready to help you navigate Botswana's regulatory landscape. 
              Get personalized guidance for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-bob-gold hover:bg-bob-gold/90 text-bob-dark font-semibold"
                onClick={() => navigate('/compliance')}
              >
                Start Compliance Check
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-bob-dark"
              >
                Contact Experts
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}