import { 
  Lightbulb, 
  Building2, 
  DollarSign, 
  Shield, 
  Settings, 
  Rocket, 
  TrendingUp,
  CheckCircle,
  Clock,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface RoadmapPhase {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  color: string;
  duration: string;
  cost: string;
  keyActivities: string[];
}

export default function FinTechRoadmap() {
  const navigate = useNavigate();

  const phases: RoadmapPhase[] = [
    {
      id: 1,
      title: "Concept, Strategy, and Pre-Formation",
      subtitle: "Foundation Building",
      description: "Build a robust business case before engaging with any formal registration processes.",
      icon: Lightbulb,
      color: "blue",
      duration: "8-12 weeks",
      cost: "BWP 50,000 - BWP 100,000",
      keyActivities: [
        "Market Research: Identify clear market gap and target customer base",
        "Service Definition: Precisely articulate financial service/product",
        "Business & Financial Planning: Comprehensive business plan with financial forecasts",
        "Regulatory Scoping: Determine primary regulator (BoB vs NBFIRA)"
      ]
    },
    {
      id: 2,
      title: "Corporate and Legal Foundation",
      subtitle: "Legal Entity Creation",
      description: "Create the legal entity and protect intellectual property.",
      icon: Building2,
      color: "green",
      duration: "4-6 weeks",
      cost: "BWP 15,000 - BWP 35,000",
      keyActivities: [
        "Company Registration: Formally register as legal entity",
        "Intellectual Property Protection: Secure brand and logo",
        "Beneficial Ownership Declaration: Mandatory FIA compliance"
      ]
    },
    {
      id: 3,
      title: "Tax and Financial Setup",
      subtitle: "Financial Infrastructure",
      description: "Establish financial and tax footing with proper registrations.",
      icon: DollarSign,
      color: "yellow",
      duration: "3-4 weeks",
      cost: "BWP 10,000 - BWP 25,000",
      keyActivities: [
        "Open corporate bank account",
        "Register for all applicable taxes",
        "Set up financial systems"
      ]
    },
    {
      id: 4,
      title: "Core Regulatory Licensing",
      subtitle: "Primary License Application",
      description: "Seek official approval to offer your financial service.",
      icon: Shield,
      color: "red",
      duration: "16-24 weeks",
      cost: "BWP 200,000 - BWP 500,000",
      keyActivities: [
        "Prepare comprehensive license application",
        "Submit to appropriate primary regulator",
        "Undergo fit and proper assessments"
      ]
    },
    {
      id: 5,
      title: "Operational and Compliance Framework",
      subtitle: "Systems and Policies",
      description: "Build systems and policies to operate safely and legally.",
      icon: Settings,
      color: "purple",
      duration: "12-16 weeks",
      cost: "BWP 150,000 - BWP 300,000",
      keyActivities: [
        "Develop robust AML/CFT compliance program",
        "Establish consumer protection policies",
        "Implement data protection and cybersecurity measures"
      ]
    },
    {
      id: 6,
      title: "Launch, Operations, and Ongoing Reporting",
      subtitle: "Go-to-Market",
      description: "Launch service and begin continuous compliance operations.",
      icon: Rocket,
      color: "orange",
      duration: "Ongoing",
      cost: "BWP 75,000 - BWP 150,000/year",
      keyActivities: [
        "Launch service to public",
        "Execute marketing and customer acquisition",
        "Fulfill periodic reporting obligations"
      ]
    },
    {
      id: 7,
      title: "Scaling and Growth - Public Markets",
      subtitle: "Capital Market Access",
      description: "Path to raise capital through Botswana Stock Exchange.",
      icon: TrendingUp,
      color: "indigo",
      duration: "12-18 months",
      cost: "BWP 300,000 - BWP 750,000",
      keyActivities: [
        "Evaluate IPO feasibility",
        "Prepare for public listing requirements",
        "Access growth capital"
      ]
    }
  ];

  const getPhaseIcon = (phase: RoadmapPhase) => {
    const IconComponent = phase.icon;
    return <IconComponent className={`h-6 w-6 text-${phase.color}`} />;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-header py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              Strategic Compliance Roadmap
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-4xl mx-auto">
              Your complete 7-phase guide to compliance success in Botswana's financial sector. 
              Navigate from initial concept to potential public listing with full regulatory clarity.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Roadmap Overview */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Complete Journey Overview</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              This roadmap is structured in seven distinct phases, guiding a startup through its entire lifecycle. 
              Each phase builds upon the previous, ensuring regulatory compliance and business success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">7</h3>
                <p className="text-muted-foreground">Strategic Phases</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">18-36</h3>
                <p className="text-muted-foreground">Months Timeline</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <DollarSign className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">BWP 800K-4M</h3>
                <p className="text-muted-foreground">Total Investment</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Building2 className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">8+</h3>
                <p className="text-muted-foreground">Regulatory Bodies</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Phase Details */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Compliance Journey Phases</h2>

          <div className="space-y-8">
            {phases.map((phase, index) => (
              <Card key={phase.id} className="hover:shadow-large transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full bg-${phase.color}/10`}>
                        {getPhaseIcon(phase)}
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          Phase {phase.id}: {phase.title}
                        </CardTitle>
                        <p className="text-muted-foreground">{phase.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2">{phase.duration}</Badge>
                      <p className="text-sm text-muted-foreground">{phase.cost}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{phase.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Activities</h4>
                    <ul className="space-y-2">
                      {phase.keyActivities.map((activity, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/regulatory-authorities')}
                    >
                      View Related Authorities
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
                  
        {/* Call to Action */}
        <section className="mt-16">
          <Card className="bg-gradient-dark text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Compliance Journey?</h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Get personalized guidance through our intelligent Compliance Journey wizard. 
                Map your specific path through all seven phases based on your business model.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-bob-gold hover:bg-bob-gold/90 text-bob-dark font-semibold"
                  onClick={() => navigate('/compliance-wizard')}
                >
                  <Rocket className="h-5 w-5 mr-2" />
                  Start Compliance Journey
                </Button>
                <Button
                  size="lg"
                  variant="hero"
                  onClick={() => navigate('/regulatory-authorities')}
                >
                  <Shield className="h-5 w-5 mr-2" />
                  View Regulatory Authorities
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
