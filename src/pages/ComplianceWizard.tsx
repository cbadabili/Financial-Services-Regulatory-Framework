import { useState } from "react";
import { 
  Building2, 
  Users, 
  MapPin, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  FileText,
  ArrowRight,
  ArrowLeft,
  Download,
  Brain,
  Zap,
  Banknote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface CompanyProfile {
  name: string;
  businessType: string;
  services: string[];
  capitalAmount: string;
  employeeCount: string;
  operationalScope: string;
  targetMarket: string;
  geographicCoverage: string[];
}

interface ComplianceStep {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  estimatedTime: string;
  estimatedCost: string;
  requiredDocuments: string[];
  regulatoryAuthority: string;
  completed?: boolean;
}

interface ComplianceRoute {
  routeName: string;
  description: string;
  complexity: "Low" | "Medium" | "High";
  totalSteps: number;
  estimatedDuration: string;
  totalEstimatedCost: string;
  steps: ComplianceStep[];
}

export default function ComplianceWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    name: "",
    businessType: "",
    services: [],
    capitalAmount: "",
    employeeCount: "",
    operationalScope: "",
    targetMarket: "",
    geographicCoverage: []
  });

  const businessTypes = [
    "Commercial Bank",
    "Investment Bank",
    "Insurance Company",
    "Microfinance Institution",
    "Payment Service Provider",
    "Fintech Company",
    "Asset Management Company",
    "Pension Fund",
    "Bureau de Change",
    "Money Remittance Service"
  ];

  const services = [
    "Deposit Taking",
    "Lending Services",
    "Payment Processing",
    "Insurance Services",
    "Investment Management",
    "Foreign Exchange",
    "Money Transfer",
    "Credit Services",
    "Advisory Services",
    "Digital Banking"
  ];

  const geographicOptions = [
    "Gaborone",
    "Francistown",
    "Maun",
    "Kasane",
    "Serowe",
    "Palapye",
    "Molepolole",
    "Kanye",
    "Selebi Phikwe",
    "Lobatse",
    "Ghanzi",
    "Tsabong",
    "Mochudi",
    "Masunga",
    "Nationwide",
    "International"
  ];

  // AI Analysis Function
  const analyzeComplianceRoute = (): ComplianceRoute => {
    const { businessType, services: selectedServices, capitalAmount } = companyProfile;
    
    // Banking License Route
    if (businessType === "Commercial Bank" || businessType === "Investment Bank") {
      return {
        routeName: "Banking License Route",
        description: "Comprehensive banking license application process for commercial and investment banking operations",
        complexity: "High",
        totalSteps: 6,
        estimatedDuration: "12-18 months",
        totalEstimatedCost: "BWP 500,000 - BWP 2,000,000",
        steps: [
          {
            id: "bank-1",
            title: "Pre-Application Consultation",
            description: "Schedule consultation with Bank of Botswana licensing department",
            priority: "High",
            estimatedTime: "2-4 weeks",
            estimatedCost: "BWP 10,000",
            requiredDocuments: ["Business Plan", "Market Analysis", "Feasibility Study"],
            regulatoryAuthority: "Bank of Botswana"
          },
          {
            id: "bank-2",
            title: "Capital Adequacy Verification",
            description: "Demonstrate minimum capital requirements and source of funds",
            priority: "High",
            estimatedTime: "4-6 weeks",
            estimatedCost: "BWP 50,000",
            requiredDocuments: ["Audited Financial Statements", "Capital Verification Letter", "Source of Funds Declaration"],
            regulatoryAuthority: "Bank of Botswana"
          },
          {
            id: "bank-3",
            title: "Management Fit and Proper Assessment",
            description: "Submit key personnel for regulatory approval",
            priority: "High",
            estimatedTime: "6-8 weeks",
            estimatedCost: "BWP 75,000",
            requiredDocuments: ["CV and Qualifications", "Character References", "Criminal Background Checks"],
            regulatoryAuthority: "Bank of Botswana"
          },
          {
            id: "bank-4",
            title: "Operational Infrastructure Setup",
            description: "Establish operational systems, policies, and procedures",
            priority: "Medium",
            estimatedTime: "8-12 weeks",
            estimatedCost: "BWP 200,000",
            requiredDocuments: ["IT Systems Documentation", "Policy Manuals", "Risk Management Framework"],
            regulatoryAuthority: "Bank of Botswana"
          },
          {
            id: "bank-5",
            title: "Compliance Framework Implementation",
            description: "Implement AML/CFT and regulatory compliance systems",
            priority: "High",
            estimatedTime: "6-10 weeks",
            estimatedCost: "BWP 150,000",
            requiredDocuments: ["AML/CFT Manual", "Compliance Monitoring Systems", "Staff Training Records"],
            regulatoryAuthority: "Bank of Botswana & FIA"
          },
          {
            id: "bank-6",
            title: "Final License Approval",
            description: "Submit final application and undergo regulatory inspection",
            priority: "High",
            estimatedTime: "8-12 weeks",
            estimatedCost: "BWP 100,000",
            requiredDocuments: ["Complete License Application", "Inspection Readiness Report"],
            regulatoryAuthority: "Bank of Botswana"
          }
        ]
      };
    }

    // Insurance License Route
    if (businessType === "Insurance Company") {
      return {
        routeName: "Insurance License Route",
        description: "Insurance license application process for life and non-life insurance operations",
        complexity: "High",
        totalSteps: 4,
        estimatedDuration: "8-12 months",
        totalEstimatedCost: "BWP 200,000 - BWP 800,000",
        steps: [
          {
            id: "ins-1",
            title: "NBFIRA Pre-Application Meeting",
            description: "Initial consultation with NBFIRA licensing team",
            priority: "High",
            estimatedTime: "2-3 weeks",
            estimatedCost: "BWP 5,000",
            requiredDocuments: ["Preliminary Business Plan", "Company Registration Certificate"],
            regulatoryAuthority: "NBFIRA"
          },
          {
            id: "ins-2",
            title: "Capital and Solvency Requirements",
            description: "Meet minimum capital and solvency margin requirements",
            priority: "High",
            estimatedTime: "6-8 weeks",
            estimatedCost: "BWP 100,000",
            requiredDocuments: ["Capital Adequacy Report", "Actuarial Valuation", "Audited Financials"],
            regulatoryAuthority: "NBFIRA"
          },
          {
            id: "ins-3",
            title: "Product and Underwriting Framework",
            description: "Develop insurance products and underwriting guidelines",
            priority: "Medium",
            estimatedTime: "8-10 weeks",
            estimatedCost: "BWP 80,000",
            requiredDocuments: ["Product Documentation", "Underwriting Manual", "Reinsurance Agreements"],
            regulatoryAuthority: "NBFIRA"
          },
          {
            id: "ins-4",
            title: "License Application Submission",
            description: "Submit complete license application with all supporting documents",
            priority: "High",
            estimatedTime: "10-16 weeks",
            estimatedCost: "BWP 50,000",
            requiredDocuments: ["Complete Application Form", "All Supporting Documents"],
            regulatoryAuthority: "NBFIRA"
          }
        ]
      };
    }

    // Microfinance Route
    if (businessType === "Microfinance Institution") {
      return {
        routeName: "Microfinance License Route",
        description: "Microfinance institution registration and licensing process",
        complexity: "Medium",
        totalSteps: 3,
        estimatedDuration: "4-6 months",
        totalEstimatedCost: "BWP 50,000 - BWP 200,000",
        steps: [
          {
            id: "mfi-1",
            title: "NBFIRA Registration",
            description: "Register as a microfinance institution with NBFIRA",
            priority: "High",
            estimatedTime: "4-6 weeks",
            estimatedCost: "BWP 25,000",
            requiredDocuments: ["Registration Application", "Business Plan", "Financial Projections"],
            regulatoryAuthority: "NBFIRA"
          },
          {
            id: "mfi-2",
            title: "Operational Compliance Setup",
            description: "Establish operational procedures and compliance framework",
            priority: "Medium",
            estimatedTime: "6-8 weeks",
            estimatedCost: "BWP 75,000",
            requiredDocuments: ["Operations Manual", "Credit Policy", "Risk Management Framework"],
            regulatoryAuthority: "NBFIRA"
          },
          {
            id: "mfi-3",
            title: "License Verification and Approval",
            description: "Final review and license issuance",
            priority: "High",
            estimatedTime: "4-8 weeks",
            estimatedCost: "BWP 15,000",
            requiredDocuments: ["Compliance Certificate", "Operational Readiness Report"],
            regulatoryAuthority: "NBFIRA"
          }
        ]
      };
    }

    // Payment Services Route (Default for fintech/payment companies)
    return {
      routeName: "Payment Services License Route",
      description: "Payment service provider licensing for fintech and payment processing companies",
      complexity: "Medium",
      totalSteps: 3,
      estimatedDuration: "6-9 months",
      totalEstimatedCost: "BWP 100,000 - BWP 400,000",
      steps: [
        {
          id: "psp-1",
          title: "Bank of Botswana Consultation",
          description: "Initial consultation for payment service licensing requirements",
          priority: "High",
          estimatedTime: "3-4 weeks",
          estimatedCost: "BWP 15,000",
          requiredDocuments: ["Service Description", "Technical Architecture", "Business Model"],
          regulatoryAuthority: "Bank of Botswana"
        },
        {
          id: "psp-2",
          title: "Technical and Security Compliance",
          description: "Implement required technical standards and security measures",
          priority: "High",
          estimatedTime: "8-12 weeks",
          estimatedCost: "BWP 200,000",
          requiredDocuments: ["Security Assessment Report", "Technical Specifications", "PCI DSS Compliance"],
          regulatoryAuthority: "Bank of Botswana"
        },
        {
          id: "psp-3",
          title: "License Application and Testing",
          description: "Submit application and complete regulatory testing procedures",
          priority: "Medium",
          estimatedTime: "8-10 weeks",
          estimatedCost: "BWP 50,000",
          requiredDocuments: ["Complete Application", "Testing Results", "Operational Manual"],
          regulatoryAuthority: "Bank of Botswana"
        }
      ]
    };
  };

  const handleAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const handleServiceToggle = (service: string) => {
    setCompanyProfile(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleGeographicToggle = (location: string) => {
    setCompanyProfile(prev => ({
      ...prev,
      geographicCoverage: prev.geographicCoverage.includes(location)
        ? prev.geographicCoverage.filter(l => l !== location)
        : [...prev.geographicCoverage, location]
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "default";
      case "Low": return "secondary";
      default: return "default";
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "High": return "text-red-600";
      case "Medium": return "text-yellow-600";
      case "Low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  if (showResults) {
    const route = analyzeComplianceRoute();
    
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-500 mr-3" />
              <h1 className="text-3xl font-bold text-foreground">
                AI Analysis Complete
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Based on your business profile, we've generated a personalized compliance roadmap
            </p>
          </div>

          {/* Route Overview */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl flex items-center">
                  <Brain className="h-8 w-8 text-bob-blue mr-3" />
                  {route.routeName}
                </CardTitle>
                <Badge variant="outline" className={getComplexityColor(route.complexity)}>
                  {route.complexity} Complexity
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{route.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-bob-blue">{route.totalSteps}</div>
                  <div className="text-sm text-muted-foreground">Total Steps</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-bob-gold">{route.estimatedDuration}</div>
                  <div className="text-sm text-muted-foreground">Estimated Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-nbfira-green">{route.totalEstimatedCost}</div>
                  <div className="text-sm text-muted-foreground">Estimated Cost</div>
                </div>
                <div className="text-center">
                  <Button className="bg-bob-blue hover:bg-bob-blue/90">
                    <Download className="h-4 w-4 mr-2" />
                    Download Checklist
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Steps */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Compliance Roadmap</h2>
            
            {route.steps.map((step, index) => (
              <Card key={step.id} className="hover:shadow-medium transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-bob-blue text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                    <Badge variant={getPriorityColor(step.priority)}>
                      {step.priority} Priority
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{step.estimatedTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Banknote className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{step.estimatedCost}</span>
                    </div>
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{step.regulatoryAuthority}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Required Documents:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {step.requiredDocuments.map((doc, docIndex) => (
                        <div key={docIndex} className="flex items-center text-sm">
                          <FileText className="h-4 w-4 text-bob-blue mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button 
              variant="outline" 
              onClick={() => {
                setCurrentStep(1);
                setShowResults(false);
                setCompanyProfile({
                  name: "",
                  businessType: "",
                  services: [],
                  capitalAmount: "",
                  employeeCount: "",
                  operationalScope: "",
                  targetMarket: "",
                  geographicCoverage: []
                });
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Start Over
            </Button>
            <Button className="bg-bob-gold hover:bg-bob-gold/90 text-bob-dark">
              <Download className="h-4 w-4 mr-2" />
              Export Full Report
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-12 w-12 text-bob-gold mr-3" />
            <h1 className="text-3xl font-bold text-foreground">
              Compliance Journey
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Get personalized compliance guidance based on your business profile
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {currentStep} of 3</span>
            <span className="text-sm text-muted-foreground">
              {currentStep === 1 ? "0" : currentStep === 2 ? "33" : "67"}% Complete
            </span>
          </div>
          <Progress value={currentStep === 1 ? 0 : currentStep === 2 ? 33 : 67} className="h-2" />
        </div>

        {/* Loading Analysis */}
        {isAnalyzing && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex items-center justify-center mb-4">
                <Brain className="h-16 w-16 text-bob-blue animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Analyzing Your Business Profile</h2>
              <p className="text-muted-foreground mb-6">
                Our AI is processing your information to generate the optimal compliance route...
              </p>
              <div className="max-w-md mx-auto">
                <Progress value={66} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 1: Company Information */}
        {currentStep === 1 && !isAnalyzing && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-6 w-6 text-bob-blue mr-2" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={companyProfile.name}
                    onChange={(e) => setCompanyProfile(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your company name"
                  />
                </div>
                <div>
                  <Label htmlFor="business-type">Business Type</Label>
                  <Select 
                    value={companyProfile.businessType} 
                    onValueChange={(value) => setCompanyProfile(prev => ({ ...prev, businessType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="capital">Proposed Capital Amount</Label>
                  <Select 
                    value={companyProfile.capitalAmount} 
                    onValueChange={(value) => setCompanyProfile(prev => ({ ...prev, capitalAmount: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select capital range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-1m">Under BWP 1 Million</SelectItem>
                      <SelectItem value="1m-5m">BWP 1 - BWP 5 Million</SelectItem>
                      <SelectItem value="5m-25m">BWP 5 - BWP 25 Million</SelectItem>
                      <SelectItem value="25m-100m">BWP 25 - BWP 100 Million</SelectItem>
                      <SelectItem value="over-100m">Over BWP 100 Million</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="employees">Expected Employee Count</Label>
                  <Select 
                    value={companyProfile.employeeCount} 
                    onValueChange={(value) => setCompanyProfile(prev => ({ ...prev, employeeCount: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="200+">200+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setCurrentStep(2)}
                  disabled={!companyProfile.name || !companyProfile.businessType}
                >
                  Next Step
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Services and Operations */}
        {currentStep === 2 && !isAnalyzing && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-6 w-6 text-bob-blue mr-2" />
                Services and Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-3 block">Services You Plan to Offer</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {services.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={companyProfile.services.includes(service)}
                        onCheckedChange={() => handleServiceToggle(service)}
                      />
                      <Label htmlFor={service} className="text-sm">{service}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="scope">Operational Scope</Label>
                  <Select 
                    value={companyProfile.operationalScope} 
                    onValueChange={(value) => setCompanyProfile(prev => ({ ...prev, operationalScope: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select operational scope" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local (Single City)</SelectItem>
                      <SelectItem value="regional">Regional (Multiple Cities)</SelectItem>
                      <SelectItem value="national">National (Botswana-wide)</SelectItem>
                      <SelectItem value="international">International (Cross-border)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="target">Target Market</Label>
                  <Select 
                    value={companyProfile.targetMarket} 
                    onValueChange={(value) => setCompanyProfile(prev => ({ ...prev, targetMarket: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select target market" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individuals">Individual Customers</SelectItem>
                      <SelectItem value="smes">Small & Medium Enterprises</SelectItem>
                      <SelectItem value="corporates">Large Corporates</SelectItem>
                      <SelectItem value="government">Government Entities</SelectItem>
                      <SelectItem value="mixed">Mixed (All Segments)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">Geographic Coverage</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {geographicOptions.map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={location}
                        checked={companyProfile.geographicCoverage.includes(location)}
                        onCheckedChange={() => handleGeographicToggle(location)}
                      />
                      <Label htmlFor={location} className="text-sm">{location}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button 
                  onClick={() => setCurrentStep(3)}
                  disabled={companyProfile.services.length === 0}
                >
                  Next Step
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Review and Analysis */}
        {currentStep === 3 && !isAnalyzing && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-6 w-6 text-bob-blue mr-2" />
                Review Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Company Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm"><strong>Company:</strong> {companyProfile.name}</p>
                    <p className="text-sm"><strong>Type:</strong> {companyProfile.businessType}</p>
                    <p className="text-sm"><strong>Capital:</strong> {companyProfile.capitalAmount}</p>
                    <p className="text-sm"><strong>Employees:</strong> {companyProfile.employeeCount}</p>
                  </div>
                  <div>
                    <p className="text-sm"><strong>Scope:</strong> {companyProfile.operationalScope}</p>
                    <p className="text-sm"><strong>Target Market:</strong> {companyProfile.targetMarket}</p>
                    <p className="text-sm"><strong>Services:</strong> {companyProfile.services.join(", ")}</p>
                    <p className="text-sm"><strong>Coverage:</strong> {companyProfile.geographicCoverage.join(", ")}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Brain className="h-5 w-5 text-bob-blue mr-2" />
                  <h4 className="font-medium text-foreground">AI Analysis Preview</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on your profile, our AI will generate a customized compliance roadmap with:
                </p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• Step-by-step regulatory requirements</li>
                  <li>• Priority levels for each compliance step</li>
                  <li>• Estimated timelines and costs</li>
                  <li>• Required documentation checklists</li>
                  <li>• Relevant regulatory authority contacts</li>
                </ul>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button 
                  onClick={handleAnalysis}
                  className="bg-bob-gold hover:bg-bob-gold/90 text-bob-dark"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Generate Compliance Route
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}