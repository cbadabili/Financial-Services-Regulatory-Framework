import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Check, 
  CheckCircle, 
  ChevronDown, 
  Clock, 
  Download, 
  FileText, 
  Filter, 
  Plus, 
  Save, 
  Search, 
  Settings, 
  Share2, 
  Trash2, 
  X,
  Calendar as CalendarIcon,
  AlertCircle,
  FileSpreadsheet,
  FileDown,
  FilePlus2,
  Building,
  Briefcase,
  ClipboardCheck,
  BarChart4,
  Tag,
  Info
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// TypeScript interfaces
// PDF / CSV export utility
import {
  generateChecklistPDF,
  exportChecklistCSV
} from "@/utils/pdfExport";
interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  regulatoryReference: string;
  regulator: string;
  riskLevel: "low" | "medium" | "high" | "critical";
  applicability: "mandatory" | "conditional" | "recommended";
  dueDate?: Date;
  completed: boolean;
  notes?: string;
  documentLinks?: Array<{
    title: string;
    url: string;
  }>;
  assignedTo?: string;
  tags?: string[];
  customItem?: boolean;
}

interface ChecklistTemplate {
  id: string;
  name: string;
  description: string;
  businessType: string;
  serviceTypes: string[];
  regulators: string[];
  categories: string[];
  itemCount: number;
  lastUpdated: Date;
  isOfficial: boolean;
  thumbnail?: string;
}

interface ChecklistConfig {
  title: string;
  description?: string;
  businessType: string;
  serviceTypes: string[];
  regulators: string[];
  riskLevels: Array<"low" | "medium" | "high" | "critical">;
  categories: string[];
  includeConditional: boolean;
  includeRecommended: boolean;
  dueDateDefault?: Date;
}

interface ChecklistStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  byCategory: Record<string, { total: number; completed: number }>;
  byRiskLevel: Record<string, { total: number; completed: number }>;
  byRegulator: Record<string, { total: number; completed: number }>;
}

interface ChecklistGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  initialConfig?: Partial<ChecklistConfig>;
  onChecklistGenerated?: (items: ChecklistItem[]) => void;
}

// Mock data for business types
const businessTypes = [
  { id: "commercial-bank", name: "Commercial Bank" },
  { id: "investment-bank", name: "Investment Bank" },
  { id: "insurance", name: "Insurance Company" },
  { id: "pension-fund", name: "Pension Fund" },
  { id: "asset-manager", name: "Asset Management Firm" },
  { id: "microfinance", name: "Microfinance Institution" },
  { id: "payment-provider", name: "Payment Service Provider" },
  { id: "forex-bureau", name: "Foreign Exchange Bureau" },
  { id: "fintech", name: "FinTech Company" },
  { id: "credit-provider", name: "Credit Provider" },
];

// Mock data for service types
const serviceTypes = [
  { id: "deposits", name: "Deposit Taking", businessTypes: ["commercial-bank", "investment-bank"] },
  { id: "lending", name: "Lending Services", businessTypes: ["commercial-bank", "microfinance", "credit-provider"] },
  { id: "investments", name: "Investment Services", businessTypes: ["investment-bank", "asset-manager"] },
  { id: "insurance-life", name: "Life Insurance", businessTypes: ["insurance"] },
  { id: "insurance-general", name: "General Insurance", businessTypes: ["insurance"] },
  { id: "pension-management", name: "Pension Management", businessTypes: ["pension-fund", "asset-manager"] },
  { id: "payment-processing", name: "Payment Processing", businessTypes: ["payment-provider", "fintech"] },
  { id: "forex", name: "Foreign Exchange", businessTypes: ["forex-bureau", "commercial-bank"] },
  { id: "digital-banking", name: "Digital Banking", businessTypes: ["commercial-bank", "fintech"] },
  { id: "mobile-money", name: "Mobile Money", businessTypes: ["payment-provider", "fintech"] },
  { id: "wealth-management", name: "Wealth Management", businessTypes: ["asset-manager", "investment-bank"] },
];

// Mock data for regulators
const regulators = [
  { id: "bob", name: "Bank of Botswana (BoB)" },
  { id: "nbfira", name: "Non-Bank Financial Institutions Regulatory Authority (NBFIRA)" },
  { id: "bse", name: "Botswana Stock Exchange (BSE)" },
  { id: "fia", name: "Financial Intelligence Agency (FIA)" },
  { id: "cipa", name: "Companies and Intellectual Property Authority (CIPA)" },
];

// Mock data for categories
const categories = [
  { id: "licensing", name: "Licensing & Registration" },
  { id: "capital", name: "Capital & Liquidity Requirements" },
  { id: "governance", name: "Corporate Governance" },
  { id: "risk", name: "Risk Management" },
  { id: "aml", name: "Anti-Money Laundering" },
  { id: "consumer", name: "Consumer Protection" },
  { id: "reporting", name: "Regulatory Reporting" },
  { id: "operational", name: "Operational Requirements" },
  { id: "technology", name: "Technology & Cybersecurity" },
  { id: "conduct", name: "Market Conduct" },
];

// Mock data for templates
const checklistTemplates: ChecklistTemplate[] = [
  {
    id: "template-1",
    name: "Commercial Bank - Full Compliance",
    description: "Comprehensive compliance checklist for commercial banks operating in Botswana",
    businessType: "commercial-bank",
    serviceTypes: ["deposits", "lending", "forex"],
    regulators: ["bob", "fia"],
    categories: ["licensing", "capital", "governance", "risk", "aml", "reporting"],
    itemCount: 87,
    lastUpdated: new Date("2025-06-15"),
    isOfficial: true,
    thumbnail: "/templates/commercial-bank.png"
  },
  {
    id: "template-2",
    name: "FinTech Startup - Payment Processing",
    description: "Essential compliance requirements for fintech payment service providers",
    businessType: "fintech",
    serviceTypes: ["payment-processing", "mobile-money"],
    regulators: ["bob", "nbfira", "fia"],
    categories: ["licensing", "operational", "technology", "aml"],
    itemCount: 42,
    lastUpdated: new Date("2025-05-28"),
    isOfficial: true,
    thumbnail: "/templates/fintech.png"
  },
  {
    id: "template-3",
    name: "Asset Management - Investment Services",
    description: "Regulatory checklist for asset management firms offering investment services",
    businessType: "asset-manager",
    serviceTypes: ["investments", "wealth-management"],
    regulators: ["nbfira", "bse", "fia"],
    categories: ["licensing", "governance", "risk", "reporting", "conduct"],
    itemCount: 63,
    lastUpdated: new Date("2025-07-01"),
    isOfficial: true,
    thumbnail: "/templates/asset-management.png"
  },
  {
    id: "template-4",
    name: "Insurance Provider - General",
    description: "Compliance requirements for general insurance providers",
    businessType: "insurance",
    serviceTypes: ["insurance-general"],
    regulators: ["nbfira", "fia"],
    categories: ["licensing", "capital", "governance", "consumer", "reporting"],
    itemCount: 55,
    lastUpdated: new Date("2025-06-10"),
    isOfficial: true,
    thumbnail: "/templates/insurance.png"
  },
  {
    id: "template-5",
    name: "My Custom Template",
    description: "Custom compliance checklist for my organization",
    businessType: "commercial-bank",
    serviceTypes: ["deposits", "lending"],
    regulators: ["bob", "fia"],
    categories: ["aml", "risk", "technology"],
    itemCount: 23,
    lastUpdated: new Date("2025-07-10"),
    isOfficial: false
  }
];

// Generate mock checklist items based on configuration
const generateMockChecklistItems = (config: ChecklistConfig): ChecklistItem[] => {
  // This would normally be an API call to generate checklist based on criteria
  const mockItems: ChecklistItem[] = [];
  
  // Generate licensing requirements
  if (config.categories.includes("licensing")) {
    mockItems.push({
      id: "item-1",
      title: "Banking License Application",
      description: "Submit a complete banking license application to the Bank of Botswana with all required documentation.",
      category: "Licensing & Registration",
      regulatoryReference: "Banking Act 2021, Section 3(1)",
      regulator: "Bank of Botswana (BoB)",
      riskLevel: "critical",
      applicability: "mandatory",
      completed: false,
      documentLinks: [
        { title: "Banking Act 2021", url: "/documents/banking-act-2021.pdf" },
        { title: "License Application Form", url: "/forms/bob-license-application.pdf" }
      ],
      tags: ["licensing", "critical", "startup"]
    });
    
    mockItems.push({
      id: "item-2",
      title: "Business Registration with CIPA",
      description: "Register your business entity with the Companies and Intellectual Property Authority.",
      category: "Licensing & Registration",
      regulatoryReference: "Companies Act 2018, Section 21",
      regulator: "Companies and Intellectual Property Authority (CIPA)",
      riskLevel: "high",
      applicability: "mandatory",
      completed: false,
      documentLinks: [
        { title: "Companies Act 2018", url: "/documents/companies-act-2018.pdf" },
        { title: "Business Registration Form", url: "/forms/cipa-registration.pdf" }
      ],
      tags: ["registration", "startup"]
    });
  }
  
  // Generate capital requirements
  if (config.categories.includes("capital")) {
    mockItems.push({
      id: "item-3",
      title: "Minimum Capital Requirement",
      description: "Maintain minimum capital of 400 million Pula for commercial banks as required by the Bank of Botswana.",
      category: "Capital & Liquidity Requirements",
      regulatoryReference: "Banking Act 2021, Section 12(2)",
      regulator: "Bank of Botswana (BoB)",
      riskLevel: "critical",
      applicability: "mandatory",
      completed: false,
      documentLinks: [
        { title: "Banking Act 2021", url: "/documents/banking-act-2021.pdf" },
        { title: "Capital Requirements Directive", url: "/documents/capital-requirements-directive.pdf" }
      ],
      tags: ["capital", "critical"]
    });
    
    mockItems.push({
      id: "item-4",
      title: "Capital Adequacy Ratio",
      description: "Maintain minimum capital adequacy ratio of 15% of risk-weighted assets, with at least 10% as Tier 1 capital.",
      category: "Capital & Liquidity Requirements",
      regulatoryReference: "Prudential Rules 2024, Section 8",
      regulator: "Bank of Botswana (BoB)",
      riskLevel: "high",
      applicability: "mandatory",
      completed: false,
      documentLinks: [
        { title: "Prudential Rules 2024", url: "/documents/prudential-rules-2024.pdf" },
        { title: "Capital Calculation Template", url: "/templates/capital-calculation.xlsx" }
      ],
      tags: ["capital", "reporting"]
    });
  }
  
  // Generate AML requirements
  if (config.categories.includes("aml")) {
    mockItems.push({
      id: "item-5",
      title: "Customer Due Diligence Procedures",
      description: "Implement comprehensive customer due diligence procedures for new and existing customers.",
      category: "Anti-Money Laundering",
      regulatoryReference: "AML/CFT Act 2022, Section 15",
      regulator: "Financial Intelligence Agency (FIA)",
      riskLevel: "high",
      applicability: "mandatory",
      completed: false,
      documentLinks: [
        { title: "AML/CFT Act 2022", url: "/documents/aml-cft-act-2022.pdf" },
        { title: "CDD Guidelines", url: "/guidelines/cdd-guidelines.pdf" }
      ],
      tags: ["aml", "kyc"]
    });
    
    mockItems.push({
      id: "item-6",
      title: "Suspicious Transaction Reporting",
      description: "Establish procedures for identifying and reporting suspicious transactions to the Financial Intelligence Agency.",
      category: "Anti-Money Laundering",
      regulatoryReference: "AML/CFT Act 2022, Section 28",
      regulator: "Financial Intelligence Agency (FIA)",
      riskLevel: "high",
      applicability: "mandatory",
      completed: false,
      documentLinks: [
        { title: "AML/CFT Act 2022", url: "/documents/aml-cft-act-2022.pdf" },
        { title: "STR Reporting Form", url: "/forms/str-reporting-form.pdf" }
      ],
      tags: ["aml", "reporting"]
    });
    
    mockItems.push({
      id: "item-7",
      title: "AML Compliance Officer Appointment",
      description: "Appoint a dedicated AML Compliance Officer at senior management level.",
      category: "Anti-Money Laundering",
      subcategory: "Governance",
      regulatoryReference: "AML/CFT Act 2022, Section 10",
      regulator: "Financial Intelligence Agency (FIA)",
      riskLevel: "medium",
      applicability: "mandatory",
      completed: false,
      documentLinks: [
        { title: "AML/CFT Act 2022", url: "/documents/aml-cft-act-2022.pdf" }
      ],
      tags: ["aml", "governance"]
    });
  }
  
  // Generate governance requirements
  if (config.categories.includes("governance")) {
    mockItems.push({
      id: "item-8",
      title: "Board Composition Requirements",
      description: "Ensure board composition meets regulatory requirements including minimum number of independent directors.",
      category: "Corporate Governance",
      regulatoryReference: "Banking Act 2021, Section 18",
      regulator: "Bank of Botswana (BoB)",
      riskLevel: "medium",
      applicability: "mandatory",
      completed: false,
      documentLinks: [
        { title: "Banking Act 2021", url: "/documents/banking-act-2021.pdf" },
        { title: "Corporate Governance Guidelines", url: "/guidelines/corporate-governance.pdf" }
      ],
      tags: ["governance", "board"]
    });
    
    mockItems.push({
      id: "item-9",
      title: "Fit and Proper Assessment for Directors",
      description: "Ensure all directors and senior executives undergo fit and proper person assessment.",
      category: "Corporate Governance",
      regulatoryReference: "Banking Act 2021, Section 20",
      regulator: "Bank of Botswana (BoB)",
      riskLevel: "high",
      applicability: "mandatory",
      completed: false,
      documentLinks: [
        { title: "Banking Act 2021", url: "/documents/banking-act-2021.pdf" },
        { title: "Fit and Proper Assessment Form", url: "/forms/fit-proper-assessment.pdf" }
      ],
      tags: ["governance", "compliance"]
    });
  }
  
  // Generate risk management requirements
  if (config.categories.includes("risk")) {
    mockItems.push({
      id: "item-10",
      title: "Enterprise Risk Management Framework",
      description: "Develop and implement a comprehensive enterprise risk management framework.",
      category: "Risk Management",
      regulatoryReference: "Prudential Rules 2024, Section 15",
      regulator: "Bank of Botswana (BoB)",
      riskLevel: "high",
      applicability: "mandatory",
      completed: false,
      documentLinks: [
        { title: "Prudential Rules 2024", url: "/documents/prudential-rules-2024.pdf" },
        { title: "Risk Management Guidelines", url: "/guidelines/risk-management.pdf" }
      ],
      tags: ["risk", "governance"]
    });
    
    mockItems.push({
      id: "item-11",
      title: "Stress Testing Program",
      description: "Implement regular stress testing program covering all material risks.",
      category: "Risk Management",
      regulatoryReference: "Prudential Rules 2024, Section 22",
      regulator: "Bank of Botswana (BoB)",
      riskLevel: "medium",
      applicability: "mandatory",
      completed: false,
      documentLinks: [
        { title: "Prudential Rules 2024", url: "/documents/prudential-rules-2024.pdf" },
        { title: "Stress Testing Guidelines", url: "/guidelines/stress-testing.pdf" }
      ],
      tags: ["risk", "testing"]
    });
  }
  
  // Generate technology requirements
  if (config.categories.includes("technology")) {
    mockItems.push({
      id: "item-12",
      title: "Cybersecurity Framework",
      description: "Implement a comprehensive cybersecurity framework aligned with international standards.",
      category: "Technology & Cybersecurity",
      regulatoryReference: "Cybersecurity Directive 2023",
      regulator: "Bank of Botswana (BoB)",
      riskLevel: "high",
      applicability: "mandatory",
      completed: false,
      documentLinks: [
        { title: "Cybersecurity Directive 2023", url: "/documents/cybersecurity-directive.pdf" }
      ],
      tags: ["technology", "security"]
    });
    
    mockItems.push({
      id: "item-13",
      title: "Data Protection Compliance",
      description: "Ensure compliance with data protection regulations for customer data.",
      category: "Technology & Cybersecurity",
      regulatoryReference: "Data Protection Act 2022",
      regulator: "Information and Data Protection Commission",
      riskLevel: "high",
      applicability: "mandatory",
      completed: false,
      documentLinks: [
        { title: "Data Protection Act 2022", url: "/documents/data-protection-act.pdf" },
        { title: "Data Protection Guidelines", url: "/guidelines/data-protection.pdf" }
      ],
      tags: ["technology", "data", "privacy"]
    });
  }
  
  // Generate reporting requirements
  if (config.categories.includes("reporting")) {
    mockItems.push({
      id: "item-14",
      title: "Quarterly Financial Reporting",
      description: "Submit quarterly financial reports to the Bank of Botswana within 15 days of quarter end.",
      category: "Regulatory Reporting",
      regulatoryReference: "Banking Act 2021, Section 45",
      regulator: "Bank of Botswana (BoB)",
      riskLevel: "medium",
      applicability: "mandatory",
      dueDate: new Date(2025, 9, 15), // October 15, 2025
      completed: false,
      documentLinks: [
        { title: "Banking Act 2021", url: "/documents/banking-act-2021.pdf" },
        { title: "Quarterly Reporting Template", url: "/templates/quarterly-reporting.xlsx" }
      ],
      tags: ["reporting", "financial"]
    });
    
    mockItems.push({
      id: "item-15",
      title: "Annual Compliance Report",
      description: "Submit annual compliance report to the Bank of Botswana by January 31.",
      category: "Regulatory Reporting",
      regulatoryReference: "Banking Act 2021, Section 47",
      regulator: "Bank of Botswana (BoB)",
      riskLevel: "medium",
      applicability: "mandatory",
      dueDate: new Date(2026, 0, 31), // January 31, 2026
      completed: false,
      documentLinks: [
        { title: "Banking Act 2021", url: "/documents/banking-act-2021.pdf" },
        { title: "Annual Compliance Report Template", url: "/templates/annual-compliance.docx" }
      ],
      tags: ["reporting", "compliance", "annual"]
    });
  }
  
  // Generate consumer protection requirements
  if (config.categories.includes("consumer")) {
    mockItems.push({
      id: "item-16",
      title: "Fair Treatment of Customers Policy",
      description: "Develop and implement a policy ensuring fair treatment of customers.",
      category: "Consumer Protection",
      regulatoryReference: "Consumer Protection Guidelines 2024",
      regulator: "Bank of Botswana (BoB)",
      riskLevel: "medium",
      applicability: "mandatory",
      completed: false,
      documentLinks: [
        { title: "Consumer Protection Guidelines 2024", url: "/guidelines/consumer-protection.pdf" }
      ],
      tags: ["consumer", "policy"]
    });
    
    mockItems.push({
      id: "item-17",
      title: "Complaint Handling Mechanism",
      description: "Establish a formal complaint handling mechanism for customer grievances.",
      category: "Consumer Protection",
      regulatoryReference: "Consumer Protection Guidelines 2024, Section 8",
      regulator: "Bank of Botswana (BoB)",
      riskLevel: "medium",
      applicability: "mandatory",
      completed: false,
      documentLinks: [
        { title: "Consumer Protection Guidelines 2024", url: "/guidelines/consumer-protection.pdf" }
      ],
      tags: ["consumer", "complaints"]
    });
  }
  
  // Filter based on configuration
  let filteredItems = mockItems.filter(item => {
    // Filter by regulator
    if (config.regulators.length > 0 && !config.regulators.some(r => item.regulator.includes(r))) {
      return false;
    }
    
    // Filter by risk level
    if (config.riskLevels.length > 0 && !config.riskLevels.includes(item.riskLevel)) {
      return false;
    }
    
    // Filter by applicability
    if (!config.includeConditional && item.applicability === "conditional") {
      return false;
    }
    
    if (!config.includeRecommended && item.applicability === "recommended") {
      return false;
    }
    
    return true;
  });
  
  // Set default due dates if specified
  if (config.dueDateDefault) {
    filteredItems = filteredItems.map(item => ({
      ...item,
      dueDate: item.dueDate || config.dueDateDefault
    }));
  }
  
  return filteredItems;
};

// Calculate statistics for a checklist
const calculateChecklistStats = (items: ChecklistItem[]): ChecklistStats => {
  const stats: ChecklistStats = {
    total: items.length,
    completed: items.filter(item => item.completed).length,
    pending: items.filter(item => !item.completed).length,
    overdue: items.filter(item => !item.completed && item.dueDate && new Date(item.dueDate) < new Date()).length,
    byCategory: {},
    byRiskLevel: {},
    byRegulator: {}
  };
  
  // Calculate by category
  items.forEach(item => {
    // By category
    if (!stats.byCategory[item.category]) {
      stats.byCategory[item.category] = { total: 0, completed: 0 };
    }
    stats.byCategory[item.category].total++;
    if (item.completed) {
      stats.byCategory[item.category].completed++;
    }
    
    // By risk level
    if (!stats.byRiskLevel[item.riskLevel]) {
      stats.byRiskLevel[item.riskLevel] = { total: 0, completed: 0 };
    }
    stats.byRiskLevel[item.riskLevel].total++;
    if (item.completed) {
      stats.byRiskLevel[item.riskLevel].completed++;
    }
    
    // By regulator
    if (!stats.byRegulator[item.regulator]) {
      stats.byRegulator[item.regulator] = { total: 0, completed: 0 };
    }
    stats.byRegulator[item.regulator].total++;
    if (item.completed) {
      stats.byRegulator[item.regulator].completed++;
    }
  });
  
  return stats;
};

export default function ChecklistGenerator({
  isOpen,
  onClose,
  initialConfig,
  onChecklistGenerated
}: ChecklistGeneratorProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State for wizard steps
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState("configure");
  
  // State for checklist configuration
  const [config, setConfig] = useState<ChecklistConfig>({
    title: "Regulatory Compliance Checklist",
    description: "",
    businessType: "",
    serviceTypes: [],
    regulators: [],
    riskLevels: ["critical", "high", "medium", "low"],
    categories: [],
    includeConditional: true,
    includeRecommended: true,
    dueDateDefault: undefined
  });
  
  // State for generated checklist
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ChecklistItem[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [riskFilter, setRiskFilter] = useState<string | null>(null);
  const [stats, setStats] = useState<ChecklistStats | null>(null);
  const [exportFormat, setExportFormat] = useState<"pdf" | "docx" | "xlsx">("pdf");
  const [showAddItemDialog, setShowAddItemDialog] = useState(false);
  const [newItem, setNewItem] = useState<Partial<ChecklistItem>>({
    title: "",
    description: "",
    category: "",
    regulatoryReference: "",
    regulator: "",
    riskLevel: "medium",
    applicability: "mandatory",
    completed: false
  });
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize with initial config if provided
  useEffect(() => {
    if (initialConfig) {
      setConfig(prev => ({
        ...prev,
        ...initialConfig
      }));
    }
  }, [initialConfig]);
  
  // Update available service types based on selected business type
  const availableServiceTypes = config.businessType
    ? serviceTypes.filter(service => service.businessTypes.includes(config.businessType))
    : [];
  
  // Handle template selection
  const handleSelectTemplate = (templateId: string) => {
    const template = checklistTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setConfig({
        title: `${template.name} Checklist`,
        description: template.description,
        businessType: template.businessType,
        serviceTypes: template.serviceTypes,
        regulators: template.regulators,
        riskLevels: ["critical", "high", "medium", "low"],
        categories: template.categories,
        includeConditional: true,
        includeRecommended: true,
        dueDateDefault: undefined
      });
      
      // Move to next step
      setCurrentStep(2);
      setActiveTab("configure");
    }
  };
  
  // Handle business type change
  const handleBusinessTypeChange = (value: string) => {
    setConfig(prev => ({
      ...prev,
      businessType: value,
      // Clear service types if they're not available for this business type
      serviceTypes: []
    }));
  };
  
  // Handle service type toggle
  const handleServiceTypeToggle = (value: string) => {
    setConfig(prev => {
      const serviceTypes = prev.serviceTypes.includes(value)
        ? prev.serviceTypes.filter(t => t !== value)
        : [...prev.serviceTypes, value];
      
      return {
        ...prev,
        serviceTypes
      };
    });
  };
  
  // Handle category toggle
  const handleCategoryToggle = (value: string) => {
    setConfig(prev => {
      const categories = prev.categories.includes(value)
        ? prev.categories.filter(c => c !== value)
        : [...prev.categories, value];
      
      return {
        ...prev,
        categories
      };
    });
  };
  
  // Handle regulator toggle
  const handleRegulatorToggle = (value: string) => {
    setConfig(prev => {
      const regulators = prev.regulators.includes(value)
        ? prev.regulators.filter(r => r !== value)
        : [...prev.regulators, value];
      
      return {
        ...prev,
        regulators
      };
    });
  };
  
  // Generate checklist based on configuration
  const generateChecklist = () => {
    // Validate configuration
    if (!config.businessType) {
      toast({
        title: "Missing Information",
        description: "Please select a business type",
        variant: "destructive"
      });
      return;
    }
    
    if (config.serviceTypes.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select at least one service type",
        variant: "destructive"
      });
      return;
    }
    
    if (config.categories.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select at least one regulatory category",
        variant: "destructive"
      });
      return;
    }
    
    // Generate checklist items
    const items = generateMockChecklistItems(config);
    setChecklistItems(items);
    setFilteredItems(items);
    
    // Calculate statistics
    const calculatedStats = calculateChecklistStats(items);
    setStats(calculatedStats);
    
    // Move to preview step
    setCurrentStep(3);
    setActiveTab("preview");
    
    // Notify parent component if callback provided
    if (onChecklistGenerated) {
      onChecklistGenerated(items);
    }
    
    toast({
      title: "Checklist Generated",
      description: `Generated ${items.length} compliance requirements based on your criteria.`
    });
  };
  
  // Handle item completion toggle
  const handleItemCompletion = (id: string, completed: boolean) => {
    const updatedItems = checklistItems.map(item => 
      item.id === id ? { ...item, completed } : item
    );
    
    setChecklistItems(updatedItems);
    setFilteredItems(
      filteredItems.map(item => 
        item.id === id ? { ...item, completed } : item
      )
    );
    
    // Update statistics
    setStats(calculateChecklistStats(updatedItems));
  };
  
  // Handle search and filtering
  useEffect(() => {
    if (checklistItems.length === 0) return;
    
    let filtered = [...checklistItems];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.regulatoryReference.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    
    // Apply risk filter
    if (riskFilter) {
      filtered = filtered.filter(item => item.riskLevel === riskFilter);
    }
    
    setFilteredItems(filtered);
  }, [searchQuery, categoryFilter, riskFilter, checklistItems]);
  
  // Handle export
  const handleExport = () => {
    // Build minimal config for the export helpers
    const exportConfig = {
      ...config,
      // fallback business name because current config schema lacks it
      businessName: config.title || "My Business",
      generatedDate: new Date()
    } as any; // compatible with utility interface

    switch (exportFormat) {
      case "pdf":
        generateChecklistPDF(checklistItems, exportConfig).catch(() => {
          /* error handled inside util */
        });
        break;
      case "xlsx":
        // Use CSV as a stand-in for spreadsheet export during hackathon
        exportChecklistCSV(checklistItems, exportConfig);
        break;
      default:
        toast({
          title: "Export Unavailable",
          description: "This export format is not yet supported in the demo.",
          variant: "destructive"
        });
    }
  };
  
  // Handle adding a new custom item
  const handleAddCustomItem = () => {
    if (!newItem.title || !newItem.category || !newItem.regulator) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const customItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      title: newItem.title || "",
      description: newItem.description || "",
      category: newItem.category || "",
      regulatoryReference: newItem.regulatoryReference || "Custom Requirement",
      regulator: newItem.regulator || "",
      riskLevel: newItem.riskLevel as "low" | "medium" | "high" | "critical" || "medium",
      applicability: newItem.applicability as "mandatory" | "conditional" | "recommended" || "mandatory",
      dueDate: newItem.dueDate,
      completed: false,
      customItem: true,
      tags: ["custom"]
    };
    
    const updatedItems = [...checklistItems, customItem];
    setChecklistItems(updatedItems);
    setFilteredItems([...filteredItems, customItem]);
    
    // Update statistics
    setStats(calculateChecklistStats(updatedItems));
    
    // Reset form and close dialog
    setNewItem({
      title: "",
      description: "",
      category: "",
      regulatoryReference: "",
      regulator: "",
      riskLevel: "medium",
      applicability: "mandatory",
      completed: false
    });
    setShowAddItemDialog(false);
    
    toast({
      title: "Item Added",
      description: "Custom requirement has been added to your checklist."
    });
  };
  
  // Handle saving checklist
  const handleSaveChecklist = () => {
    toast({
      title: "Checklist Saved",
      description: "Your checklist has been saved successfully."
    });
  };
  
  // If the component is not open, don't render anything
  if (!isOpen) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl flex items-center gap-2">
              <ClipboardCheck className="h-6 w-6 text-primary" />
              Regulatory Compliance Checklist Generator
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Generate customized regulatory compliance checklists based on your business type, services, and regulatory requirements.
          </DialogDescription>
          
          {/* Progress indicator */}
          <div className="mt-4">
            <div className="flex justify-between mb-2 text-sm">
              <div className={cn("font-medium", currentStep >= 1 ? "text-primary" : "text-muted-foreground")}>
                1. Select Template
              </div>
              <div className={cn("font-medium", currentStep >= 2 ? "text-primary" : "text-muted-foreground")}>
                2. Configure Checklist
              </div>
              <div className={cn("font-medium", currentStep >= 3 ? "text-primary" : "text-muted-foreground")}>
                3. Preview & Export
              </div>
            </div>
            <Progress value={(currentStep / 3) * 100} className="h-2" />
          </div>
        </DialogHeader>
        
        {/* Main content area */}
        <div className="flex-1 overflow-hidden">
          {currentStep === 1 && (
            <div className="space-y-6 py-4">
              <h3 className="text-lg font-medium">Select a Template or Start from Scratch</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {checklistTemplates.map(template => (
                  <Card 
                    key={template.id} 
                    className={cn(
                      "cursor-pointer hover:border-primary transition-all",
                      selectedTemplate === template.id ? "border-primary ring-1 ring-primary" : ""
                    )}
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          <CardDescription className="text-xs">{template.description}</CardDescription>
                        </div>
                        {template.isOfficial && (
                          <Badge variant="outline" className="ml-2">Official</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-xs text-muted-foreground space-y-2">
                        <div className="flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          <span>{businessTypes.find(b => b.id === template.businessType)?.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          <span>{template.itemCount} requirements</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          <span>Updated {format(template.lastUpdated, "MMM d, yyyy")}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Start from scratch option */}
                <Card 
                  className={cn(
                    "cursor-pointer hover:border-primary transition-all border-dashed",
                    selectedTemplate === null ? "border-primary ring-1 ring-primary" : ""
                  )}
                  onClick={() => {
                    setSelectedTemplate(null);
                    setCurrentStep(2);
                    setActiveTab("configure");
                  }}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Start from Scratch</CardTitle>
                    <CardDescription className="text-xs">
                      Create a custom checklist by selecting your own criteria
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-center h-16">
                      <Plus className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {currentStep >= 2 && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="configure">Configure Checklist</TabsTrigger>
                <TabsTrigger value="preview" disabled={checklistItems.length === 0}>
                  Preview & Export
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="configure" className="space-y-6">
                <ScrollArea className="h-[calc(100vh-350px)] pr-4">
                  {/* Basic Information */}
                  <div className="space-y-4 mb-6">
                    <h3 className="text-lg font-medium">Basic Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Checklist Title</Label>
                        <Input 
                          id="title"
                          value={config.title}
                          onChange={(e) => setConfig({...config, title: e.target.value})}
                          placeholder="Enter a title for your checklist"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea 
                          id="description"
                          value={config.description}
                          onChange={(e) => setConfig({...config, description: e.target.value})}
                          placeholder="Enter a description for your checklist"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  {/* Business Profile */}
                  <div className="space-y-4 mb-6">
                    <h3 className="text-lg font-medium">Business Profile</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessType">Business Type</Label>
                        <Select 
                          value={config.businessType} 
                          onValueChange={handleBusinessTypeChange}
                        >
                          <SelectTrigger id="businessType">
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            {businessTypes.map(type => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {config.businessType && (
                        <div className="space-y-2">
                          <Label>Service Types</Label>
                          <div className="grid grid-cols-2 gap-2 border rounded-md p-3">
                            {availableServiceTypes.length > 0 ? (
                              availableServiceTypes.map(service => (
                                <div key={service.id} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`service-${service.id}`}
                                    checked={config.serviceTypes.includes(service.id)}
                                    onCheckedChange={() => handleServiceTypeToggle(service.id)}
                                  />
                                  <Label 
                                    htmlFor={`service-${service.id}`}
                                    className="text-sm font-normal cursor-pointer"
                                  >
                                    {service.name}
                                  </Label>
                                </div>
                              ))
                            ) : (
                              <div className="col-span-2 text-sm text-muted-foreground">
                                No service types available for selected business type
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  {/* Regulatory Requirements */}
                  <div className="space-y-4 mb-6">
                    <h3 className="text-lg font-medium">Regulatory Requirements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Regulatory Categories</Label>
                        <div className="grid grid-cols-1 gap-2 border rounded-md p-3 h-[200px] overflow-y-auto">
                          {categories.map(category => (
                            <div key={category.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`category-${category.id}`}
                                checked={config.categories.includes(category.id)}
                                onCheckedChange={() => handleCategoryToggle(category.id)}
                              />
                              <Label 
                                htmlFor={`category-${category.id}`}
                                className="text-sm font-normal cursor-pointer"
                              >
                                {category.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Regulators</Label>
                        <div className="grid grid-cols-1 gap-2 border rounded-md p-3 h-[200px] overflow-y-auto">
                          {regulators.map(regulator => (
                            <div key={regulator.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`regulator-${regulator.id}`}
                                checked={config.regulators.includes(regulator.id)}
                                onCheckedChange={() => handleRegulatorToggle(regulator.id)}
                              />
                              <Label 
                                htmlFor={`regulator-${regulator.id}`}
                                className="text-sm font-normal cursor-pointer"
                              >
                                {regulator.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  {/* Additional Options */}
                  <div className="space-y-4 mb-6">
                    <h3 className="text-lg font-medium">Additional Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="includeConditional"
                            checked={config.includeConditional}
                            onCheckedChange={(checked) => 
                              setConfig({...config, includeConditional: checked === true})
                            }
                          />
                          <Label 
                            htmlFor="includeConditional"
                            className="text-sm font-normal cursor-pointer"
                          >
                            Include conditional requirements
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="includeRecommended"
                            checked={config.includeRecommended}
                            onCheckedChange={(checked) => 
                              setConfig({...config, includeRecommended: checked === true})
                            }
                          />
                          <Label 
                            htmlFor="includeRecommended"
                            className="text-sm font-normal cursor-pointer"
                          >
                            Include recommended practices
                          </Label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Default Due Date (Optional)</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !config.dueDateDefault && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {config.dueDateDefault ? format(config.dueDateDefault, "PPP") : "Set default due date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={config.dueDateDefault}
                              onSelect={(date) => setConfig({...config, dueDateDefault: date || undefined})}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                
                <div className="flex justify-between pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setCurrentStep(1);
                      setSelectedTemplate(null);
                    }}
                  >
                    Back to Templates
                  </Button>
                  <Button onClick={generateChecklist}>
                    Generate Checklist
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="preview" className="space-y-4">
                {checklistItems.length > 0 && (
                  <>
                    {/* Checklist Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{config.title}</h3>
                        {config.description && (
                          <p className="text-sm text-muted-foreground">{config.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setShowAddItemDialog(true)}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add Item
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Export
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Export Format</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => { setExportFormat("pdf"); handleExport(); }}>
                              <FileText className="h-4 w-4 mr-2" />
                              PDF Document
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setExportFormat("docx"); handleExport(); }}>
                              <FileDown className="h-4 w-4 mr-2" />
                              Word Document
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setExportFormat("xlsx"); handleExport(); }}>
                              <FileSpreadsheet className="h-4 w-4 mr-2" />
                              Excel Spreadsheet
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="sm" onClick={handleSaveChecklist}>
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                    
                    {/* Statistics */}
                    {stats && (
                      <Card className="mb-4">
                        <CardContent className="p-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Total Requirements</p>
                              <p className="text-2xl font-bold">{stats.total}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Completed</p>
                              <div className="flex items-center gap-2">
                                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                                <Badge variant="outline" className="text-xs">
                                  {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                                </Badge>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Pending</p>
                              <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Overdue</p>
                              <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
                            </div>
                          </div>
                          <Separator className="my-4" />
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Overall Progress</span>
                              <span className="font-medium">
                                {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                              </span>
                            </div>
                            <Progress 
                              value={stats.total > 0 ? (stats.completed / stats.total) * 100 : 0} 
                              className="h-2"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Search and Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search requirements..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={categoryFilter || ""} onValueChange={(v) => setCategoryFilter(v || null)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Categories</SelectItem>
                          {Object.keys(stats?.byCategory || {}).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={riskFilter || ""} onValueChange={(v) => setRiskFilter(v || null)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by risk" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Risk Levels</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Checklist Items */}
                    <ScrollArea className="h-[calc(100vh-500px)]">
                      <div className="space-y-4">
                        {filteredItems.length > 0 ? (
                          filteredItems.map((item) => (
                            <Card key={item.id} className={cn(
                              "border-l-4",
                              item.completed ? "border-l-green-500" :
                              item.riskLevel === "critical" ? "border-l-red-500" :
                              item.riskLevel === "high" ? "border-l-orange-500" :
                              item.riskLevel === "medium" ? "border-l-yellow-500" :
                              "border-l-blue-500"
                            )}>
                              <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                  <Checkbox 
                                    checked={item.completed}
                                    onCheckedChange={(checked) => 
                                      handleItemCompletion(item.id, checked === true)
                                    }
                                    className="mt-1"
                                  />
                                  <div className="flex-1 space-y-2">
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <h4 className={cn(
                                          "text-base font-medium",
                                          item.completed && "line-through text-muted-foreground"
                                        )}>
                                          {item.title}
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                          {item.description}
                                        </p>
                                      </div>
                                      <Badge variant={
                                        item.riskLevel === "critical" ? "destructive" :
                                        item.riskLevel === "high" ? "destructive" :
                                        item.riskLevel === "medium" ? "default" :
                                        "secondary"
                                      }>
                                        {item.riskLevel.charAt(0).toUpperCase() + item.riskLevel.slice(1)} Risk
                                      </Badge>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                      <div className="flex items-center">
                                        <Tag className="h-3 w-3 mr-1" />
                                        {item.category}
                                      </div>
                                      <div className="flex items-center">
                                        <Info className="h-3 w-3 mr-1" />
                                        {item.regulatoryReference}
                                      </div>
                                      <div className="flex items-center">
                                        <Building className="h-3 w-3 mr-1" />
                                        {item.regulator}
                                      </div>
                                      {item.dueDate && (
                                        <div className="flex items-center">
                                          <Clock className="h-3 w-3 mr-1" />
                                          Due: {format(new Date(item.dueDate), "MMM d, yyyy")}
                                        </div>
                                      )}
                                    </div>
                                    
                                    {item.documentLinks && item.documentLinks.length > 0 && (
                                      <div className="flex flex-wrap gap-2 mt-2">
                                        {item.documentLinks.map((link, index) => (
                                          <Badge key={index} variant="outline" className="text-xs cursor-pointer hover:bg-secondary">
                                            <FileText className="h-3 w-3 mr-1" />
                                            {link.title}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                    
                                    {item.tags && item.tags.length > 0 && (
                                      <div className="flex flex-wrap gap-1 mt-2">
                                        {item.tags.map((tag, index) => (
                                          <Badge key={index} variant="secondary" className="text-xs">
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">No matching requirements found</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                    
                    <div className="flex justify-between pt-4 border-t">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab("configure")}
                      >
                        Edit Configuration
                      </Button>
                      <Button onClick={handleExport}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Checklist
                      </Button>
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DialogContent>
      
      {/* Add Custom Item Dialog */}
      <Dialog open={showAddItemDialog} onOpenChange={setShowAddItemDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Custom Requirement</DialogTitle>
            <DialogDescription>
              Add a custom compliance requirement to your checklist.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="item-title">Title</Label>
              <Input 
                id="item-title"
                value={newItem.title}
                onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                placeholder="Enter requirement title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="item-description">Description</Label>
              <Textarea 
                id="item-description"
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                placeholder="Enter requirement description"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-category">Category</Label>
                <Select 
                  value={newItem.category} 
                  onValueChange={(v) => setNewItem({...newItem, category: v})}
                >
                  <SelectTrigger id="item-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="item-regulator">Regulator</Label>
                <Select 
                  value={newItem.regulator} 
                  onValueChange={(v) => setNewItem({...newItem, regulator: v})}
                >
                  <SelectTrigger id="item-regulator">
                    <SelectValue placeholder="Select regulator" />
                  </SelectTrigger>
                  <SelectContent>
                    {regulators.map(regulator => (
                      <SelectItem key={regulator.id} value={regulator.name}>
                        {regulator.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-risk">Risk Level</Label>
                <Select 
                  value={newItem.riskLevel} 
                  onValueChange={(v) => setNewItem({...newItem, riskLevel: v as any})}
                >
                  <SelectTrigger id="item-risk">
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="item-applicability">Applicability</Label>
                <Select 
                  value={newItem.applicability} 
                  onValueChange={(v) => setNewItem({...newItem, applicability: v as any})}
                >
                  <SelectTrigger id="item-applicability">
                    <SelectValue placeholder="Select applicability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mandatory">Mandatory</SelectItem>
                    <SelectItem value="conditional">Conditional</SelectItem>
                    <SelectItem value="recommended">Recommended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="item-reference">Regulatory Reference</Label>
              <Input 
                id="item-reference"
                value={newItem.regulatoryReference}
                onChange={(e) => setNewItem({...newItem, regulatoryReference: e.target.value})}
                placeholder="E.g., Banking Act 2021, Section 15"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Due Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newItem.dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newItem.dueDate ? format(newItem.dueDate, "PPP") : "Set due date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newItem.dueDate}
                    onSelect={(date) => setNewItem({...newItem, dueDate: date || undefined})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddItemDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCustomItem}>
              Add Requirement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
