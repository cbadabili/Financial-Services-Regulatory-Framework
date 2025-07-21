import { 
  Building2, 
  Shield, 
  Scale, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  AlertTriangle, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Briefcase, 
  Search,
  Download,
  ExternalLink,
  BookOpen,
  Check,
  Info,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface RegulatoryAuthority {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: any;
  color: string;
  type: "primary" | "compliance" | "other";
  website: string;
  email: string;
  phone: string;
  address: string;
  coreFunctions: string[];
  keyRequirements: {
    title: string;
    description: string;
  }[];
  keyActs: {
    name: string;
    year: string;
    description: string;
  }[];
  onlineServices: {
    name: string;
    description: string;
    url: string;
  }[];
}

export default function RegulatoryAuthorities() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [expandedAuthority, setExpandedAuthority] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedAuthority === id) {
      setExpandedAuthority(null);
    } else {
      setExpandedAuthority(id);
    }
  };

  const regulatoryAuthorities: RegulatoryAuthority[] = [
    {
      id: "bob",
      name: "Bank of Botswana",
      shortName: "BoB",
      description: "The central bank of Botswana responsible for monetary policy, financial stability, and regulation of banks and payment systems.",
      icon: Shield,
      color: "bob-blue",
      type: "primary",
      website: "https://www.bankofbotswana.bw",
      email: "info@bob.bw",
      phone: "+267 360 6000",
      address: "17938 Khama Crescent, Gaborone, Botswana",
      coreFunctions: [
        "Formulation and implementation of monetary policy",
        "Licensing and regulation of commercial banks",
        "Oversight of payment systems and bureaux de change",
        "Management of foreign exchange reserves",
        "Issuance of currency",
        "Acting as banker to the government and commercial banks"
      ],
      keyRequirements: [
        {
          title: "Banking License",
          description: "Applicants must meet minimum capital requirements of P 5 million for commercial banks, demonstrate financial soundness, and have qualified management."
        },
        {
          title: "Electronic Payment Services (EPS)",
          description: "EPS providers must comply with the Electronic Payment Services Regulations of 2019, maintain adequate risk management systems, and ensure data protection."
        },
        {
          title: "Bureau de Change",
          description: "Operators must maintain minimum capital of P 300,000, implement AML/CFT measures, and submit regular reports on foreign exchange transactions."
        }
      ],
      keyActs: [
        {
          name: "Banking Act",
          year: "Cap 46:04",
          description: "Provides the legal framework for banking business in Botswana, including licensing requirements and prudential standards."
        },
        {
          name: "Bank of Botswana Act",
          year: "Cap 55:01",
          description: "Establishes the Bank of Botswana as the central bank and outlines its functions, powers, and objectives."
        },
        {
          name: "Electronic Payment Services Regulations",
          year: "2019",
          description: "Governs the provision of electronic payment services, including mobile money, internet banking, and payment gateways."
        }
      ],
      onlineServices: [
        {
          name: "Banking Supervision",
          description: "Online submission of regulatory returns and applications",
          url: "https://www.bankofbotswana.bw/banking-supervision"
        },
        {
          name: "Statistics Portal",
          description: "Access to economic and financial data",
          url: "https://www.bankofbotswana.bw/statistics"
        }
      ]
    },
    {
      id: "nbfira",
      name: "Non-Bank Financial Institutions Regulatory Authority",
      shortName: "NBFIRA",
      description: "Regulator for all non-bank financial institutions including insurance companies, pension funds, asset managers, and micro-lenders.",
      icon: TrendingUp,
      color: "nbfira-green",
      type: "primary",
      website: "https://www.nbfira.org.bw",
      email: "enquiries@nbfira.org.bw",
      phone: "+267 310 2595",
      address: "Plot 54351, CBD, Gaborone, Botswana",
      coreFunctions: [
        "Regulation and supervision of non-bank financial institutions",
        "Licensing of insurance companies, brokers, and agents",
        "Registration and supervision of pension funds",
        "Oversight of capital markets and securities",
        "Regulation of micro-lending businesses",
        "Licensing and supervision of Virtual Asset Service Providers (VASPs)"
      ],
      keyRequirements: [
        {
          title: "Insurance License",
          description: "Insurers must maintain minimum capital of P 2 million for general insurance and P 5 million for life insurance, with adequate reinsurance arrangements."
        },
        {
          title: "Micro-lending License",
          description: "Micro-lenders must have minimum capital of P 20,000, submit audited financial statements, and comply with interest rate caps and disclosure requirements."
        },
        {
          title: "VASP License",
          description: "Virtual Asset Service Providers must have minimum capital of P 250,000, implement robust AML/CFT measures, and maintain secure technology systems."
        },
        {
          title: "Asset Management License",
          description: "Asset managers must maintain minimum capital of P 250,000, employ qualified investment professionals, and implement proper risk management systems."
        }
      ],
      keyActs: [
        {
          name: "NBFIRA Act",
          year: "2006",
          description: "Establishes NBFIRA as the regulator for non-bank financial institutions and outlines its powers and functions."
        },
        {
          name: "Insurance Industry Act",
          year: "Cap 46:01",
          description: "Provides the legal framework for insurance business, including licensing, capital requirements, and consumer protection."
        },
        {
          name: "Virtual Assets Act",
          year: "2022",
          description: "Regulates virtual asset businesses, including exchanges, wallet providers, and other crypto-related services."
        },
        {
          name: "Securities Act",
          year: "2014",
          description: "Governs capital markets, securities trading, and collective investment undertakings."
        }
      ],
      onlineServices: [
        {
          name: "Regulatory and Business Supervision System",
          description: "Online portal for license applications and regulatory submissions",
          url: "https://rbss.nbfira.org.bw"
        },
        {
          name: "Complaints Management System",
          description: "Portal for consumer complaints against regulated entities",
          url: "https://www.nbfira.org.bw/consumer-complaints"
        }
      ]
    },
    {
      id: "cipa",
      name: "Companies and Intellectual Property Authority",
      shortName: "CIPA",
      description: "The foundational authority for establishing a legal business presence in Botswana, responsible for company registration and intellectual property protection.",
      icon: Building2,
      color: "cipa-purple",
      type: "compliance",
      website: "https://www.cipa.co.bw",
      email: "feedback@cipa.co.bw",
      phone: "+267 367 3700",
      address: "Plot 54351, CBD, Gaborone, Botswana",
      coreFunctions: [
        "Incorporation of companies under the Companies Act",
        "Registration of business names",
        "Protection of intellectual property rights (trademarks, patents, copyrights)",
        "Providing templates for company constitutions",
        "Managing post-incorporation filings",
        "Maintaining the beneficial ownership registry"
      ],
      keyRequirements: [
        {
          title: "Company Registration",
          description: "Businesses must register through the Online Business Registration System (OBRS), providing details of directors, shareholders, registered office, and company constitution."
        },
        {
          title: "Beneficial Ownership Declaration",
          description: "All companies must identify and provide details of the ultimate natural person who owns or controls the entity, in compliance with the Financial Intelligence Agency Act."
        },
        {
          title: "Trademark Registration",
          description: "Businesses seeking trademark protection must submit an application with copies of the logo/mark and pay the prescribed fees."
        },
        {
          title: "Annual Returns",
          description: "All registered companies must file annual returns to maintain good standing, including updated financial information and any changes to company details."
        }
      ],
      keyActs: [
        {
          name: "Companies Act",
          year: "CAP 42:01",
          description: "Provides the legal framework for the incorporation and regulation of companies in Botswana."
        },
        {
          name: "Companies (Amendment) Act",
          year: "2018",
          description: "Mandates the declaration of beneficial ownership as a key compliance requirement for all registered companies."
        },
        {
          name: "Industrial Property Act",
          year: "CAP 68:03",
          description: "Governs the registration and protection of trademarks, patents, and industrial designs."
        },
        {
          name: "Copyright and Neighbouring Rights Act",
          year: "CAP 68:02",
          description: "Provides protection for literary, artistic, and musical works, as well as software and databases."
        }
      ],
      onlineServices: [
        {
          name: "Online Business Registration System (OBRS)",
          description: "Digital platform for company registration, name reservation, and annual filings",
          url: "https://www.cipa.co.bw/obrs"
        },
        {
          name: "IP Online",
          description: "System for trademark and patent applications and searches",
          url: "https://www.cipa.co.bw/ip-online"
        }
      ]
    },
    {
      id: "cca",
      name: "Competition and Consumer Authority",
      shortName: "CCA",
      description: "Regulates market competition and protects consumer rights, ensuring fair business practices between financial service providers and their customers.",
      icon: Scale,
      color: "cca-orange",
      type: "compliance",
      website: "https://www.competitionauthority.co.bw",
      email: "info@competitionauthority.co.bw",
      phone: "+267 393 1989",
      address: "Plot 28, Matsitama Road, Gaborone, Botswana",
      coreFunctions: [
        "Preventing and redressing anti-competitive practices",
        "Reviewing mergers and acquisitions to prevent monopolies",
        "Protecting consumers from unfair business practices",
        "Investigating consumer complaints",
        "Mediating disputes between consumers and businesses",
        "Conducting research and education on consumer rights"
      ],
      keyRequirements: [
        {
          title: "Fair Trading Practices",
          description: "Financial service providers must ensure transparent pricing, clear terms and conditions, and avoid deceptive marketing practices."
        },
        {
          title: "Merger Notification",
          description: "Companies planning mergers or acquisitions above certain thresholds must notify the CCA for review and approval before implementation."
        },
        {
          title: "Complaint Resolution Mechanism",
          description: "Businesses must establish accessible and effective mechanisms for handling consumer complaints and provide clear information on how to access these mechanisms."
        }
      ],
      keyActs: [
        {
          name: "Consumer Protection Act",
          year: "2018",
          description: "Protects consumers from unfair business practices and provides mechanisms for redress."
        },
        {
          name: "Competition Act",
          year: "2018",
          description: "Promotes and protects competition in the economy, preventing anti-competitive practices and regulating mergers."
        }
      ],
      onlineServices: [
        {
          name: "Consumer Complaints Portal",
          description: "Online system for lodging consumer complaints",
          url: "https://www.competitionauthority.co.bw/complaints"
        },
        {
          name: "Merger Notification System",
          description: "Platform for submitting merger notifications and supporting documents",
          url: "https://www.competitionauthority.co.bw/mergers"
        }
      ]
    },
    {
      id: "bocra",
      name: "Botswana Communications Regulatory Authority",
      shortName: "BOCRA",
      description: "Regulator for the entire communications sector, critical for any fintech or financial service that relies on digital platforms, telecommunications, or the internet.",
      icon: Globe,
      color: "bocra-blue",
      type: "compliance",
      website: "https://www.bocra.org.bw",
      email: "bocra@bocra.org.bw",
      phone: "+267 395 7755",
      address: "Plot 206/207, Independence Avenue, Gaborone, Botswana",
      coreFunctions: [
        "Regulation of telecommunications, Internet, and ICTs",
        "Oversight of radio and television broadcasting",
        "Regulation of postal services",
        "Issuing licenses to communications operators",
        "Implementation of the National Cybersecurity Strategy",
        "Management of the .bw country-code top-level domain"
      ],
      keyRequirements: [
        {
          title: "Electronic Communications License",
          description: "Digital service providers must obtain appropriate licenses based on the type of service offered (network, service, or application)."
        },
        {
          title: "Data Protection Compliance",
          description: "Organizations handling personal data must implement appropriate security measures and respect user privacy rights as per the Data Protection Act."
        },
        {
          title: "Electronic Signatures",
          description: "Providers of secure electronic signature services must be accredited by BOCRA to ensure their signatures are legally valid for digital contracts."
        }
      ],
      keyActs: [
        {
          name: "Communications Regulatory Authority Act",
          year: "2012",
          description: "Establishes BOCRA as the regulator for the communications sector and outlines its functions and powers."
        },
        {
          name: "Electronic Communications and Transactions Act",
          year: "2014",
          description: "Provides legal recognition for electronic signatures and records, facilitating digital transactions."
        },
        {
          name: "Data Protection Act",
          year: "2018",
          description: "Governs the collection, processing, and storage of personal data, protecting individual privacy."
        }
      ],
      onlineServices: [
        {
          name: "Licensing Portal",
          description: "Online application for communications licenses",
          url: "https://www.bocra.org.bw/licensing"
        },
        {
          name: "Domain Registration",
          description: "Registration and management of .bw domains",
          url: "https://www.nic.net.bw"
        }
      ]
    },
    {
      id: "burs",
      name: "Botswana Unified Revenue Service",
      shortName: "BURS",
      description: "The central government body responsible for the administration and enforcement of all national revenue laws, ensuring tax compliance for all businesses.",
      icon: DollarSign,
      color: "burs-green",
      type: "compliance",
      website: "https://www.burs.org.bw",
      email: "enquiries@burs.org.bw",
      phone: "+267 363 8000",
      address: "Plot 53976, Kudumatse Road, Gaborone, Botswana",
      coreFunctions: [
        "Administration of Corporate Income Tax (CIT)",
        "Collection of Value Added Tax (VAT)",
        "Enforcement of transfer pricing regulations",
        "Management of customs and excise duties",
        "Tax compliance audits and investigations",
        "Provision of taxpayer education and services"
      ],
      keyRequirements: [
        {
          title: "Corporate Income Tax",
          description: "Resident companies are taxed at 22% on their worldwide income, while non-resident companies are taxed at 30% on Botswana-source income."
        },
        {
          title: "Value Added Tax (VAT)",
          description: "Businesses with annual taxable supplies exceeding P 1,000,000 must register for VAT, which is charged at a standard rate of 14%."
        },
        {
          title: "Transfer Pricing",
          description: "Transactions between resident companies and their non-resident connected parties must adhere to the 'arm's length principle', with proper documentation."
        },
        {
          title: "Tax Returns and Payments",
          description: "Companies must file annual tax returns within 4 months after their financial year-end and make quarterly advance payments."
        }
      ],
      keyActs: [
        {
          name: "Income Tax Act",
          year: "Cap 52:01",
          description: "Provides the legal framework for the taxation of income in Botswana."
        },
        {
          name: "Value Added Tax Act",
          year: "2001",
          description: "Governs the application and administration of VAT on goods and services."
        },
        {
          name: "Transfer Pricing Regulations",
          year: "2019",
          description: "Regulates pricing of transactions between related entities to prevent tax avoidance."
        }
      ],
      onlineServices: [
        {
          name: "e-Services Portal",
          description: "Online platform for tax registration, filing returns, and making payments",
          url: "https://www.burs.org.bw/e-services"
        },
        {
          name: "Tax Clearance System",
          description: "Application and verification of tax clearance certificates",
          url: "https://www.burs.org.bw/tax-clearance"
        }
      ]
    },
    {
      id: "fia",
      name: "Financial Intelligence Agency",
      shortName: "FIA",
      description: "Botswana's financial intelligence unit responsible for combating money laundering, terrorist financing, and other financial crimes.",
      icon: AlertTriangle,
      color: "fia-red",
      type: "compliance",
      website: "https://www.fia.org.bw",
      email: "info@fia.org.bw",
      phone: "+267 390 2555",
      address: "Plot 50367, Fairgrounds Office Park, Gaborone, Botswana",
      coreFunctions: [
        "Collection and analysis of financial intelligence",
        "Investigation of suspicious transactions",
        "Enforcement of Anti-Money Laundering (AML) regulations",
        "Combating Financing of Terrorism (CFT)",
        "International cooperation on financial crime",
        "Supervision of AML/CFT compliance by reporting entities"
      ],
      keyRequirements: [
        {
          title: "Customer Due Diligence (CDD)",
          description: "Financial institutions must verify customer identity, assess risk profiles, and maintain proper records of all clients."
        },
        {
          title: "Suspicious Transaction Reporting",
          description: "All reporting entities must promptly report suspicious transactions to the FIA, regardless of the amount involved."
        },
        {
          title: "AML/CFT Program",
          description: "Financial service providers must implement comprehensive AML/CFT programs, including risk assessment, monitoring systems, and staff training."
        },
        {
          title: "Beneficial Ownership Transparency",
          description: "Companies must disclose their ultimate beneficial owners to prevent the use of corporate structures for illicit purposes."
        }
      ],
      keyActs: [
        {
          name: "Financial Intelligence Act",
          year: "2022",
          description: "Provides the legal framework for combating money laundering and terrorist financing."
        },
        {
          name: "Financial Intelligence Regulations",
          year: "2022",
          description: "Details the specific requirements for reporting entities in implementing AML/CFT measures."
        },
        {
          name: "Proceeds and Instruments of Crime Act",
          year: "2014",
          description: "Enables the freezing, seizure, and confiscation of proceeds of crime."
        }
      ],
      onlineServices: [
        {
          name: "goAML Portal",
          description: "Web-based system for filing Suspicious Transaction Reports (STRs)",
          url: "https://www.fia.org.bw/goaml"
        },
        {
          name: "Compliance Reporting System",
          description: "Platform for submitting AML/CFT compliance reports",
          url: "https://www.fia.org.bw/compliance"
        }
      ]
    },
    {
      id: "bse",
      name: "Botswana Stock Exchange",
      shortName: "BSE",
      description: "The national stock exchange of Botswana, providing a platform for companies to raise capital and for investors to trade securities.",
      icon: TrendingUp,
      color: "bse-orange",
      type: "other",
      website: "https://www.bse.co.bw",
      email: "info@bse.co.bw",
      phone: "+267 367 4400",
      address: "Plot 64511, Fairgrounds, Gaborone, Botswana",
      coreFunctions: [
        "Providing a platform for listing and trading securities",
        "Regulating listed companies and trading members",
        "Promoting market transparency and integrity",
        "Facilitating capital raising for businesses",
        "Providing market data and information",
        "Operating the Central Securities Depository"
      ],
      keyRequirements: [
        {
          title: "Main Board Listing",
          description: "Companies must have a minimum capitalization of P 5 million, a 3-year profit history, and at least 20% of shares in public hands."
        },
        {
          title: "Venture Capital Board",
          description: "Growth-stage companies need P 2.5 million in subscribed capital but no profit history is required."
        },
        {
          title: "Tshipidi SME Board",
          description: "Smaller enterprises require P 500,000 in subscribed capital and must appoint a Nominated Adviser (NOMAD)."
        },
        {
          title: "Continuing Obligations",
          description: "Listed companies must maintain timely disclosure of material information, publish financial results, and comply with corporate governance standards."
        }
      ],
      keyActs: [
        {
          name: "Botswana Stock Exchange Act",
          year: "1994",
          description: "Establishes the BSE as the national stock exchange and outlines its functions and powers."
        },
        {
          name: "BSE Equity Listings Requirements",
          year: "2019",
          description: "Sets out the conditions for listing and maintaining a listing on the various boards of the BSE."
        },
        {
          name: "Securities Act",
          year: "2014",
          description: "Provides the legal framework for the regulation of securities markets and investor protection."
        }
      ],
      onlineServices: [
        {
          name: "Automated Trading System (ATS)",
          description: "Electronic platform for trading securities",
          url: "https://www.bse.co.bw/trading"
        },
        {
          name: "Central Securities Depository (CSD)",
          description: "Electronic system for securities custody and settlement",
          url: "https://www.bse.co.bw/csd"
        },
        {
          name: "Tshipidi Mentorship Program",
          description: "Support program for SMEs preparing to list on the exchange",
          url: "https://www.bse.co.bw/tshipidi"
        }
      ]
    }
  ];

  const filteredAuthorities = activeTab === "all" 
    ? regulatoryAuthorities 
    : regulatoryAuthorities.filter(auth => auth.type === activeTab);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-header py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              Regulatory Authorities
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-4xl mx-auto">
              Comprehensive guide to Botswana's financial regulatory ecosystem. 
              Understand the role, requirements, and services of each authority in your compliance journey.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Filter Tabs */}
        <div className="mb-10">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center">
              <TabsList className="mb-8">
                <TabsTrigger value="all">All Authorities</TabsTrigger>
                <TabsTrigger value="primary">Primary Regulators</TabsTrigger>
                <TabsTrigger value="compliance">Compliance Authorities</TabsTrigger>
                <TabsTrigger value="other">Other Institutions</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="text-center mb-10">
              <p className="text-muted-foreground max-w-3xl mx-auto">
                {activeTab === "primary" && "Primary regulators are the main licensing authorities for financial services businesses in Botswana."}
                {activeTab === "compliance" && "Compliance authorities oversee specific aspects of business operations that all financial services must adhere to."}
                {activeTab === "other" && "Other institutions that play important roles in the financial ecosystem of Botswana."}
                {activeTab === "all" && "The complete ecosystem of regulatory bodies that govern financial services in Botswana."}
              </p>
            </div>
          </Tabs>
        </div>

        {/* Authority Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredAuthorities.map((authority) => (
            <Card 
              key={authority.id} 
              className={`hover:shadow-large transition-all border-${authority.color}/20`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full bg-${authority.color}/10`}>
                      <authority.icon className={`h-6 w-6 text-${authority.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{authority.name}</CardTitle>
                      <CardDescription>{authority.shortName}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={authority.type === "primary" ? "default" : "outline"}>
                    {authority.type === "primary" ? "Primary Regulator" : 
                     authority.type === "compliance" ? "Compliance Authority" : "Supporting Institution"}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-6">{authority.description}</p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Core Functions</h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {authority.coreFunctions.slice(0, 3).map((func, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {func}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => toggleExpand(authority.id)}
                  className="w-full mt-6"
                >
                  {expandedAuthority === authority.id ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-2" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-2" />
                      Show More
                    </>
                  )}
                </Button>
                
                {expandedAuthority === authority.id && (
                  <div className="mt-6 space-y-6 border-t pt-6">
                    {/* Detailed Core Functions */}
                    <div>
                      <h4 className="font-medium text-foreground mb-3">All Core Functions</h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {authority.coreFunctions.map((func, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {func}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    {/* Key Requirements Accordion */}
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Key Requirements</h4>
                      <Accordion type="single" collapsible className="w-full">
                        {authority.keyRequirements.map((req, idx) => (
                          <AccordionItem key={idx} value={`item-${idx}`}>
                            <AccordionTrigger className="text-sm font-medium">
                              {req.title}
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-muted-foreground">
                              {req.description}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                    
                    <Separator />
                    
                    {/* Key Acts */}
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Key Acts & Regulations</h4>
                      <div className="space-y-3">
                        {authority.keyActs.map((act, idx) => (
                          <div key={idx} className="bg-secondary/30 p-3 rounded-md">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm">{act.name}</span>
                              <Badge variant="outline" className="text-xs">{act.year}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{act.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Online Services */}
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Online Services</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {authority.onlineServices.map((service, idx) => (
                          <div key={idx} className="flex items-start">
                            <Globe className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <div>
                              <div className="font-medium text-sm">{service.name}</div>
                              <p className="text-xs text-muted-foreground mb-1">{service.description}</p>
                              <Button variant="link" className="h-auto p-0 text-xs" asChild>
                                <a href={service.url} target="_blank" rel="noopener noreferrer">
                                  Visit Service <ExternalLink className="h-3 w-3 ml-1" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="border-t pt-4 flex flex-col sm:flex-row gap-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                  <Button variant="outline" size="sm" className="flex items-center" asChild>
                    <a href={authority.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Website
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center" asChild>
                    <a href={`mailto:${authority.email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center" asChild>
                    <a href={`tel:${authority.phone.replace(/\s/g, '')}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </a>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Regulatory Framework Overview */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Regulatory Framework Overview</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Understanding how these authorities interact is key to navigating Botswana's financial regulatory landscape.
            </p>
          </div>
          
          <Card className="bg-gradient-card border-none">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-full bg-bob-blue/10">
                      <Shield className="h-6 w-6 text-bob-blue" />
                    </div>
                    <h3 className="text-lg font-semibold">Primary Regulators</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These authorities are responsible for issuing the primary licenses required to operate financial services businesses in Botswana.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Bank of Botswana (BoB)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">NBFIRA</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-full bg-cipa-purple/10">
                      <Building2 className="h-6 w-6 text-cipa-purple" />
                    </div>
                    <h3 className="text-lg font-semibold">Compliance Authorities</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These authorities regulate specific aspects of business operations that all financial services must comply with.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">CIPA - Business Registration</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">FIA - Anti-Money Laundering</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">BURS - Taxation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">CCA - Consumer Protection</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">BOCRA - Digital Communications</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-full bg-bse-orange/10">
                      <TrendingUp className="h-6 w-6 text-bse-orange" />
                    </div>
                    <h3 className="text-lg font-semibold">Supporting Institutions</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These institutions provide additional services and infrastructure to support the financial ecosystem.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">BSE - Capital Markets</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">BICA - Accounting Standards</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Resources Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Additional Resources</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Access comprehensive guides, templates, and tools to help navigate regulatory requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Compliance Guides</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/documents')}>
                  <Download className="h-4 w-4 mr-2" />
                  AML/CFT Compliance Manual Template
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/documents')}>
                  <Download className="h-4 w-4 mr-2" />
                  Data Protection Compliance Checklist
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/documents')}>
                  <Download className="h-4 w-4 mr-2" />
                  Consumer Protection Guidelines
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Knowledge Center</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/knowledge')}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  FinTech Regulatory Sandbox Guide
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/knowledge')}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Cross-Border Payment Regulations
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/knowledge')}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Virtual Assets Compliance Framework
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Search className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Quick Access</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/search')}>
                  <Search className="h-4 w-4 mr-2" />
                  Search Regulatory Database
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/compliance-wizard')}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Start Compliance Journey
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/fintech-roadmap')}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View FinTech Roadmap
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
