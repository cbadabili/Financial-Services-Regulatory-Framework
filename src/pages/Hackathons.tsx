import { 
  Trophy, 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  Star, 
  Award,
  Target,
  Lightbulb,
  Code,
  Rocket,
  Gift
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Hackathons() {
  const prizes = [
    { place: "1st Place", amount: "P50,000", color: "bob-gold" },
    { place: "2nd Place", amount: "P30,000", color: "silver" },
    { place: "3rd Place", amount: "P20,000", color: "bronze" },
    { place: "Best Innovation", amount: "P15,000", color: "bob-blue" }
  ];

  const criteria = [
    {
      title: "Functionality",
      weight: "35%",
      description: "Working features that solve real regulatory challenges",
      icon: Code
    },
    {
      title: "Technical Excellence",
      weight: "25%",
      description: "Code quality, security, and performance",
      icon: Target
    },
    {
      title: "User Experience",
      weight: "15%",
      description: "Intuitive design and user interface",
      icon: Users
    },
    {
      title: "Innovation",
      weight: "10%",
      description: "Creative solutions and novel approaches",
      icon: Lightbulb
    },
    {
      title: "Presentation",
      weight: "15%",
      description: "Clear communication of solution and impact",
      icon: Award
    }
  ];

  const tracks = [
    {
      title: "Regulatory Compliance Automation",
      description: "Build tools that automate compliance processes and regulatory reporting",
      color: "bob-blue"
    },
    {
      title: "RegTech Innovation",
      description: "Create innovative technologies for regulatory monitoring and risk management",
      color: "bob-gold"
    },
    {
      title: "Financial Inclusion Solutions",
      description: "Develop solutions that improve access to financial services in underserved communities",
      color: "nbfira-green"
    },
    {
      title: "Data Analytics & Insights",
      description: "Build platforms that provide actionable insights from regulatory data",
      color: "fia-purple"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Main Hackathon Banner */}
      <section className="mb-16">
        <Card className="bg-gradient-hero text-white border-none overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="text-center">
              <Trophy className="h-20 w-20 text-bob-gold mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                FINANCIAL SERVICES REGULATORY
              </h1>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                FRAMEWORKS PORTAL HACKATHON
              </h1>
              
              {/* Hackathon Details */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                  <div>
                    <Calendar className="h-8 w-8 text-bob-gold mx-auto mb-2" />
                    <p className="text-sm text-white/80">STARTS ON:</p>
                    <p className="font-bold text-lg">14 Mon, 07 2025</p>
                    <p className="text-sm">09:00AM</p>
                  </div>
                  
                  <div>
                    <MapPin className="h-8 w-8 text-bob-gold mx-auto mb-2" />
                    <p className="text-sm text-white/80">HACKATHON:</p>
                    <p className="font-bold text-lg">Online</p>
                    <p className="text-sm">Virtual Event</p>
                  </div>
                  
                  <div>
                    <Clock className="h-8 w-8 text-bob-gold mx-auto mb-2" />
                    <p className="text-sm text-white/80">ENDS ON:</p>
                    <p className="font-bold text-lg">23 Wed, 07 2025</p>
                    <p className="text-sm">05:00PM</p>
                  </div>
                  
                  <div>
                    <Users className="h-8 w-8 text-bob-gold mx-auto mb-2" />
                    <p className="text-sm text-white/80">TEAM SIZE:</p>
                    <p className="font-bold text-lg">1 - 5</p>
                    <p className="text-sm">Members</p>
                  </div>
                </div>
              </div>

              <Badge className="bg-bob-gold text-bob-dark text-lg px-6 py-2 mb-6">
                Businesses Only
              </Badge>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-bob-gold hover:bg-bob-gold/90 text-bob-dark font-semibold text-lg px-8 py-3"
                >
                  <Rocket className="mr-2 h-6 w-6" />
                  Register Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-bob-dark text-lg px-8 py-3"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Challenge Overview */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center">Challenge Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-muted-foreground mb-8">
                Build innovative solutions that transform how businesses access and navigate 
                Botswana's financial regulatory landscape. Create tools that make compliance 
                easier, faster, and more efficient for financial services organizations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-bob-blue/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-10 w-10 text-bob-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Problem</h3>
                  <p className="text-muted-foreground">
                    Fragmented regulatory information makes compliance complex and time-consuming
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-bob-gold/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="h-10 w-10 text-bob-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Solution</h3>
                  <p className="text-muted-foreground">
                    Unified digital platform that streamlines access to regulatory frameworks
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-nbfira-green/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Rocket className="h-10 w-10 text-nbfira-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Impact</h3>
                  <p className="text-muted-foreground">
                    Accelerate financial innovation while ensuring regulatory compliance
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Hackathon Tracks */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Hackathon Tracks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track, index) => (
            <Card key={index} className="hover:shadow-large transition-all">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full bg-${track.color}/10 flex-shrink-0`}>
                    <Star className={`h-6 w-6 text-${track.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {track.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {track.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Judging Criteria */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Judging Criteria
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {criteria.map((criterion, index) => (
            <Card key={index} className="text-center hover:shadow-medium transition-all">
              <CardContent className="p-6">
                <div className="bg-bob-blue/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <criterion.icon className="h-8 w-8 text-bob-blue" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{criterion.title}</h3>
                <Badge variant="secondary" className="mb-3">{criterion.weight}</Badge>
                <p className="text-sm text-muted-foreground">{criterion.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Prizes */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Prizes & Awards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {prizes.map((prize, index) => (
            <Card key={index} className="text-center hover:shadow-large transition-all">
              <CardContent className="p-6">
                <Gift className={`h-12 w-12 text-${prize.color} mx-auto mb-4`} />
                <h3 className="text-xl font-semibold mb-2">{prize.place}</h3>
                <p className="text-3xl font-bold text-bob-blue mb-2">{prize.amount}</p>
                <p className="text-muted-foreground">Cash Prize</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Registration CTA */}
      <section>
        <Card className="bg-gradient-dark text-white">
          <CardContent className="p-8 text-center">
            <Trophy className="h-16 w-16 text-bob-gold mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Ready to Build the Future?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Join the Financial Services Regulatory Frameworks Portal Hackathon and create 
              solutions that will shape the future of financial compliance in Botswana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-bob-gold hover:bg-bob-gold/90 text-bob-dark font-semibold text-lg px-8 py-3"
              >
                <Users className="mr-2 h-6 w-6" />
                Register Your Team
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-bob-dark text-lg px-8 py-3"
              >
                View Rules & Guidelines
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}