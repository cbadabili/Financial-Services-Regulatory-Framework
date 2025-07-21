import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Shield, 
  Building2,
  Users,
  MessageSquare,
  ExternalLink,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Contacts() {
  const regulatoryBodies = [
    {
      name: "Bank of Botswana",
      description: "Central Bank and Banking Supervision",
      address: "Private Bag 154, Gaborone, Botswana",
      phone: "+267 360 6000",
      email: "info@bankofbotswana.bw",
      website: "https://www.bankofbotswana.bw",
      hours: "Monday - Friday: 7:30 AM - 4:30 PM",
      color: "bob-blue",
      icon: Shield
    },
    {
      name: "NBFIRA",
      description: "Non-Bank Financial Institutions Regulatory Authority",
      address: "Plot 61571, Showgrounds Office Park, Gaborone",
      phone: "+267 318 8100", 
      email: "info@nbfira.org.bw",
      website: "https://www.nbfira.org.bw",
      hours: "Monday - Friday: 8:00 AM - 5:00 PM",
      color: "nbfira-green",
      icon: Building2
    },
    {
      name: "Botswana Stock Exchange",
      description: "Securities Market Regulation",
      address: "Plot 70667, 4th Floor, Fairscape Precinct, Gaborone",
      phone: "+267 357 4400",
      email: "enquiries@bse.co.bw", 
      website: "https://www.bse.co.bw",
      hours: "Monday - Friday: 8:00 AM - 5:00 PM",
      color: "bse-orange",
      icon: Building2
    },
    {
      name: "Financial Intelligence Agency",
      description: "Anti-Money Laundering and Counter-Terrorism Financing",
      address: "Plot 50371, Fairgrounds Office Park, Gaborone",
      phone: "+267 363 4000",
      email: "info@fia.org.bw",
      website: "https://www.fia.org.bw",
      hours: "Monday - Friday: 7:30 AM - 4:30 PM",
      color: "fia-purple",
      icon: Shield
    }
  ];

  const supportChannels = [
    {
      title: "Technical Support",
      description: "API integration, system issues, and technical assistance",
      contact: "tech.support@regportal.bw",
      icon: MessageSquare,
      color: "bob-blue"
    },
    {
      title: "Compliance Queries",
      description: "Regulatory requirements and compliance guidance",
      contact: "compliance@regportal.bw",
      icon: Shield,
      color: "bob-gold"
    },
    {
      title: "Business Development",
      description: "Partnership opportunities and business solutions",
      contact: "business@regportal.bw",
      icon: Building2,
      color: "nbfira-green"
    },
    {
      title: "Training & Education",
      description: "Learnership programs and educational resources",
      contact: "education@regportal.bw",
      icon: Users,
      color: "fia-purple"
    }
  ];

  /* ------------------------------------------------------------------
   * Contact-form state & handlers
   * ----------------------------------------------------------------*/
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.subject.trim()) newErrors.subject = "Required";
    if (!formData.message.trim()) newErrors.message = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // In real app we would POST; demo just toast success
    toast({
      title: "Message sent successfully",
      description: "We will get back to you within 24 hours.",
    });

    // Clear form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      organization: "",
      subject: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <Phone className="h-16 w-16 text-bob-blue" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Contact Information
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Get in touch with regulatory authorities, access support services, or reach out 
          to our team for assistance with the Financial Services Regulatory Frameworks Portal.
        </p>
      </div>

      {/* Contact Form */}
      <section className="mb-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? "border-destructive" : ""}
                  />
                  {errors.firstName && <p className="text-destructive text-xs">{errors.firstName}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? "border-destructive" : ""}
                  />
                  {errors.lastName && <p className="text-destructive text-xs">{errors.lastName}</p>}
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
              </div>
              
              <div>
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  name="organization"
                  placeholder="Enter your organization name"
                  value={formData.organization}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? "border-destructive" : ""}
                />
                {errors.subject && <p className="text-destructive text-xs">{errors.subject}</p>}
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  name="message"
                  placeholder="Please describe your inquiry in detail..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && <p className="text-destructive text-xs">{errors.message}</p>}
              </div>
              
              <Button type="submit" className="w-full bg-bob-blue hover:bg-bob-blue/90">
                <MessageSquare className="mr-2 h-5 w-5" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Support Channels */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Support Channels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportChannels.map((channel, index) => (
            <Card key={index} className="text-center hover:shadow-medium transition-all">
              <CardContent className="p-6">
                <div className={`bg-${channel.color}/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                  <channel.icon className={`h-8 w-8 text-${channel.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-3">{channel.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{channel.description}</p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => {
                  window.location.href = `mailto:${channel.contact}`;
                }}>
                  <Mail className="mr-2 h-4 w-4" />
                  {channel.contact}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Regulatory Bodies Contact Information */}
      <section>
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Regulatory Authorities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regulatoryBodies.map((body, index) => (
            <Card key={index} className="hover:shadow-medium transition-all">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`p-3 rounded-full bg-${body.color}/10 flex-shrink-0`}>
                    <body.icon className={`h-6 w-6 text-${body.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {body.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {body.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{body.address}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground mr-3 flex-shrink-0" />
                    <a href={`tel:${body.phone}`} className="text-bob-blue hover:underline">
                      {body.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground mr-3 flex-shrink-0" />
                    <a href={`mailto:${body.email}`} className="text-bob-blue hover:underline">
                      {body.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground mr-3 flex-shrink-0" />
                    <a 
                      href={body.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-bob-blue hover:underline flex items-center"
                    >
                      Visit Website
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{body.hours}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="mt-16">
        <Card className="bg-gradient-dark text-white">
          <CardContent className="p-8 text-center">
            <Phone className="h-16 w-16 text-bob-gold mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">24/7 Emergency Support</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              For urgent regulatory matters or system outages that require immediate attention, 
              contact our emergency support line available 24 hours a day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-bob-gold hover:bg-bob-gold/90 text-bob-dark font-semibold"
              >
                <Phone className="mr-2 h-6 w-6" />
                +267 7123 4567
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-bob-dark"
              >
                <Mail className="mr-2 h-6 w-6" />
                emergency@regportal.bw
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}