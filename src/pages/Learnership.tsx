import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Users, 
  Clock, 
  CheckCircle,
  Star,
  Target,
  TrendingUp,
  Shield,
  Briefcase,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Learnership() {
  const programs = [
    {
      title: "Regulatory Compliance Fundamentals",
      duration: "8 weeks",
      level: "Beginner",
      description: "Introduction to Botswana's financial regulatory landscape",
      modules: ["Banking Regulations", "Insurance Laws", "Securities Framework", "AML/CFT"],
      color: "bob-blue",
      spots: "25 available"
    },
    {
      title: "Advanced Risk Management",
      duration: "12 weeks",
      level: "Intermediate",
      description: "Deep dive into regulatory risk assessment and management",
      modules: ["Risk Frameworks", "Stress Testing", "Capital Adequacy", "Governance"],
      color: "bob-gold",
      spots: "15 available"
    },
    {
      title: "RegTech & Innovation",
      duration: "6 weeks",
      level: "Advanced",
      description: "Technology solutions for regulatory compliance",
      modules: ["API Integration", "Automation Tools", "Data Analytics", "AI Applications"],
      color: "nbfira-green",
      spots: "20 available"
    },
    {
      title: "Financial Crime Prevention",
      duration: "10 weeks",
      level: "Intermediate",
      description: "AML, CFT, and financial crime investigation techniques",
      modules: ["Transaction Monitoring", "Sanctions Screening", "Investigation", "Reporting"],
      color: "fia-purple",
      spots: "30 available"
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Certificates recognized by all major financial regulators in Botswana"
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from seasoned professionals and regulatory experts"
    },
    {
      icon: Briefcase,
      title: "Career Advancement",
      description: "Enhance your career prospects in the financial services sector"
    },
    {
      icon: TrendingUp,
      title: "Practical Skills",
      description: "Gain hands-on experience with real-world scenarios and case studies"
    }
  ];

  const upcomingCohorts = [
    {
      program: "Regulatory Compliance Fundamentals",
      startDate: "March 15, 2025",
      format: "Hybrid (Online + In-person)",
      instructor: "Dr. Sarah Modise, Former BoB Senior Examiner"
    },
    {
      program: "Advanced Risk Management",
      startDate: "April 2, 2025",
      format: "Online",
      instructor: "Prof. John Letlape, Risk Management Consultant"
    },
    {
      program: "RegTech & Innovation",
      startDate: "March 28, 2025",
      format: "In-person (Gaborone)",
      instructor: "Michael Tau, FinTech Solutions Architect"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <GraduationCap className="h-16 w-16 text-bob-blue" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Learnership Programs
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Advance your career in financial services with our comprehensive regulatory 
          education programs. Gain expertise in compliance, risk management, and regulatory technology.
        </p>
      </div>

      {/* Program Statistics */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-bob-blue/20">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-bob-blue mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-foreground mb-2">2,500+</h3>
              <p className="text-muted-foreground">Graduates</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-bob-gold/20">
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 text-bob-gold mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-foreground mb-2">95%</h3>
              <p className="text-muted-foreground">Completion Rate</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-nbfira-green/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-nbfira-green mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-foreground mb-2">85%</h3>
              <p className="text-muted-foreground">Career Advancement</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-fia-purple/20">
            <CardContent className="p-6 text-center">
              <Star className="h-12 w-12 text-fia-purple mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-foreground mb-2">4.9/5</h3>
              <p className="text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Available Programs */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Available Programs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program, index) => (
            <Card key={index} className="hover:shadow-large transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{program.title}</CardTitle>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="secondary">{program.duration}</Badge>
                      <Badge variant={program.level === 'Beginner' ? 'default' : program.level === 'Intermediate' ? 'secondary' : 'outline'}>
                        {program.level}
                      </Badge>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-${program.color}/10`}>
                    <BookOpen className={`h-6 w-6 text-${program.color}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{program.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-foreground mb-2">Course Modules:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {program.modules.map((module, moduleIndex) => (
                      <div key={moduleIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{module}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{program.spots}</span>
                  <Button size="sm" className={`bg-${program.color} hover:bg-${program.color}/90`}>
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Program Benefits */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Why Choose Our Programs?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-medium transition-all">
              <CardContent className="p-6">
                <div className="bg-bob-blue/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-bob-blue" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Upcoming Cohorts */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Upcoming Cohorts
        </h2>
        <div className="space-y-4">
          {upcomingCohorts.map((cohort, index) => (
            <Card key={index} className="hover:shadow-medium transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-bob-blue/10 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-bob-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{cohort.program}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Starts: {cohort.startDate}</span>
                        <span>•</span>
                        <span>{cohort.format}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Instructor: {cohort.instructor}</p>
                    </div>
                  </div>
                  <Button variant="outline">
                    Register
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section>
        <Card className="bg-gradient-dark text-white">
          <CardContent className="p-8 text-center">
            <Shield className="h-16 w-16 text-bob-gold mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Ready to Advance Your Career?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Join thousands of professionals who have enhanced their regulatory knowledge 
              and advanced their careers through our comprehensive learnership programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-bob-gold hover:bg-bob-gold/90 text-bob-dark font-semibold"
              >
                <GraduationCap className="mr-2 h-6 w-6" />
                View All Programs
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-bob-dark"
              >
                Schedule Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}