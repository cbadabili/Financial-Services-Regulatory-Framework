import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Search, Filter, Download, Eye, Calendar, Tag, Upload, FileText, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

const documents = [
  {
    id: 1,
    title: "Banking Act Amendment 2025",
    type: "Amendment",
    regulator: "Bank of Botswana (BoB)",
    date: "2025-01-10",
    status: "Active",
    category: "Banking Regulation",
    tags: ["Capital Requirements", "Risk Management"],
    size: "2.4 MB",
    views: 234,
    content: "The minimum capital adequacy ratio for commercial banks shall be fifteen percent (15%) of risk-weighted assets, of which at least ten percent (10%) shall be Tier 1 capital..."
  },
  {
    id: 2,
    title: "AML/CFT Guidelines for Banks",
    type: "Guideline",
    regulator: "Financial Intelligence Agency (FIA)",
    date: "2024-12-15",
    status: "Active",
    category: "Anti-Money Laundering",
    tags: ["AML", "CFT", "Due Diligence"],
    size: "1.8 MB",
    views: 456,
    content: "Financial institutions must implement enhanced due diligence measures for high-risk customers, including politically exposed persons (PEPs) and customers from high-risk jurisdictions..."
  },
  {
    id: 3,
    title: "Quarterly Risk Assessment Framework",
    type: "Framework",
    regulator: "Non-Bank Financial Institutions Regulatory Authority (NBFIRA)",
    date: "2024-11-30",
    status: "Active",
    category: "Risk Management",
    tags: ["Risk Assessment", "Quarterly Reporting"],
    size: "3.1 MB",
    views: 189,
    content: "Non-bank financial institutions must conduct quarterly risk assessments covering credit risk, operational risk, market risk, and liquidity risk with specific emphasis on emerging digital risks..."
  },
  {
    id: 4,
    title: "ESG Reporting Standards",
    type: "Standard",
    regulator: "Botswana Stock Exchange (BSE)",
    date: "2024-10-20",
    status: "Draft",
    category: "ESG Compliance",
    tags: ["ESG", "Environmental", "Social", "Governance"],
    size: "4.2 MB",
    views: 78,
    content: "Listed companies must disclose environmental impact metrics, social responsibility initiatives, and governance structures in accordance with the BSE ESG Reporting Guidelines..."
  },
  {
    id: 5,
    title: "Stress Testing Requirements",
    type: "Requirement",
    regulator: "Bank of Botswana (BoB)",
    date: "2024-09-12",
    status: "Active",
    category: "Stress Testing",
    tags: ["Stress Testing", "Capital Planning"],
    size: "2.9 MB",
    views: 312,
    content: "Banks must conduct annual stress tests under various economic scenarios including severe recession, currency depreciation, and liquidity crises to ensure capital adequacy under adverse conditions..."
  },
  {
    id: 6,
    title: "Company Registration Guidelines for FinTechs",
    type: "Guideline",
    regulator: "Companies and Intellectual Property Authority (CIPA)",
    date: "2024-08-15",
    status: "Active",
    category: "Business Registration",
    tags: ["FinTech", "Registration", "Intellectual Property"],
    size: "1.7 MB",
    views: 245,
    content: "FinTech companies must provide detailed beneficial ownership information, business model documentation, and intellectual property declarations during the registration process..."
  },
  {
    id: 7,
    title: "Tax Reporting Framework for Financial Services",
    type: "Framework",
    regulator: "Botswana Unified Revenue Service (BURS)",
    date: "2024-07-22",
    status: "Active",
    category: "Tax Compliance",
    tags: ["Tax", "Reporting", "VAT"],
    size: "2.3 MB",
    views: 178,
    content: "Financial institutions must file quarterly VAT returns and annual Corporate Income Tax (CIT) returns with special considerations for financial services with mixed taxable and exempt supplies..."
  },
  {
    id: 8,
    title: "Consumer Protection Standards for Digital Financial Services",
    type: "Standard",
    regulator: "Competition and Consumer Authority (CCA)",
    date: "2024-06-18",
    status: "Active",
    category: "Consumer Protection",
    tags: ["Consumer Rights", "Digital Services", "Fair Treatment"],
    size: "3.5 MB",
    views: 203,
    content: "Digital financial service providers must ensure clear terms and conditions, transparent fee structures, and accessible complaint resolution mechanisms for all services offered to consumers..."
  },
  {
    id: 9,
    title: "Cybersecurity Standards for Financial Institutions",
    type: "Standard",
    regulator: "Botswana Communications Regulatory Authority (BOCRA)",
    date: "2024-05-10",
    status: "Active",
    category: "Cybersecurity",
    tags: ["Cybersecurity", "Data Protection", "Digital Security"],
    size: "4.8 MB",
    views: 289,
    content: "All financial institutions offering digital services must implement the minimum cybersecurity standards outlined in the National Cybersecurity Framework, including regular penetration testing..."
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "secondary";
    case "Draft": return "outline";
    case "Archived": return "destructive";
    default: return "secondary";
  }
};

const getRegulatorColor = (regulator: string) => {
  if (regulator.includes("BoB")) return "blue";
  if (regulator.includes("NBFIRA")) return "green";
  if (regulator.includes("BSE")) return "orange";
  if (regulator.includes("FIA")) return "purple";
  if (regulator.includes("CIPA")) return "cyan";
  if (regulator.includes("BURS")) return "red";
  if (regulator.includes("CCA")) return "yellow";
  if (regulator.includes("BOCRA")) return "indigo";
  return "primary";
};

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegulator, setSelectedRegulator] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewDocument, setViewDocument] = useState<typeof documents[0] | null>(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const { hasPermission, isAuthenticated } = useAuth();

  // Filter documents based on search and filters
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchTerm === "" || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRegulator = selectedRegulator === "all" || 
      doc.regulator.toLowerCase().includes(selectedRegulator.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
      doc.category.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesRegulator && matchesCategory;
  });

  const handleDownload = (document: typeof documents[0]) => {
    // Create a blob with document content (simulating PDF data)
    const blob = new Blob([document.content], { type: 'application/pdf' });
    
    // Create download link
    const link = window.URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = link;
    a.download = `${document.title}.pdf`;
    
    // Trigger download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Clean up
    window.URL.revokeObjectURL(link);
    
    toast({
      title: "Download started",
      description: `${document.title} is being downloaded.`,
    });
  };

  const handleUpload = () => {
    const input = window.document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.xlsx,.ppt,.pptx';
    input.multiple = true;
    
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        // Process files (in a real app, this would upload to a server)
        const fileNames = Array.from(files).map(file => file.name).join(', ');
        
        toast({
          title: "Files uploaded successfully",
          description: `Uploaded ${files.length} file(s): ${fileNames}`,
        });
      }
    };
    
    input.click();
  };

  const handleView = (document: typeof documents[0]) => {
    setViewDocument(document);
    setShowDocumentModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Document Library
        </h1>
        <p className="text-muted-foreground">
          Access and manage all regulatory documents, policies, and compliance frameworks from all Botswana financial authorities.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents, policies, regulations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedRegulator} onValueChange={setSelectedRegulator}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Regulators" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regulators</SelectItem>
                <SelectItem value="bob">Bank of Botswana (BoB)</SelectItem>
                <SelectItem value="nbfira">NBFIRA</SelectItem>
                <SelectItem value="bse">Botswana Stock Exchange (BSE)</SelectItem>
                <SelectItem value="fia">Financial Intelligence Agency (FIA)</SelectItem>
                <SelectItem value="cipa">Companies and IP Authority (CIPA)</SelectItem>
                <SelectItem value="burs">Unified Revenue Service (BURS)</SelectItem>
                <SelectItem value="cca">Competition & Consumer Authority (CCA)</SelectItem>
                <SelectItem value="bocra">Communications Regulatory Authority (BOCRA)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="banking">Banking Regulation</SelectItem>
                <SelectItem value="aml">Anti-Money Laundering</SelectItem>
                <SelectItem value="risk">Risk Management</SelectItem>
                <SelectItem value="esg">ESG Compliance</SelectItem>
                <SelectItem value="business">Business Registration</SelectItem>
                <SelectItem value="tax">Tax Compliance</SelectItem>
                <SelectItem value="consumer">Consumer Protection</SelectItem>
                <SelectItem value="cyber">Cybersecurity</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            
            {isAuthenticated && (
              <Button onClick={handleUpload}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-medium transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {document.title}
                      </h3>
                      <Badge variant={getStatusColor(document.status)}>
                        {document.status}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
                      <span className="font-medium text-primary">
                        {document.regulator}
                      </span>
                      <span>•</span>
                      <span>{document.type}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(document.date).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>{document.size}</span>
                      <span>•</span>
                      <span>{document.views} views</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {document.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleView(document)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(document)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="shadow-soft">
            <CardContent className="p-6 flex flex-col items-center justify-center py-10">
              <AlertTriangle className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No documents found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                No documents match your current search criteria. Try adjusting your filters or search term.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Document View Modal */}
      <Dialog open={showDocumentModal} onOpenChange={setShowDocumentModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {viewDocument?.title}
            </DialogTitle>
            <DialogDescription>
              {viewDocument?.regulator} • {viewDocument?.category} • {viewDocument?.type}
            </DialogDescription>
          </DialogHeader>
          
          <div className="border rounded-md p-4 max-h-96 overflow-y-auto">
            <div className="prose max-w-none">
              <p>{viewDocument?.content}</p>
              <p>This document outlines key regulatory requirements that financial institutions must adhere to. The full document contains comprehensive guidelines, implementation timelines, and compliance requirements.</p>
              <p>For the complete document, please download using the button below.</p>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDocumentModal(false)}>
              Close
            </Button>
            <Button onClick={() => viewDocument && handleDownload(viewDocument)}>
              <Download className="h-4 w-4 mr-2" />
              Download Full Document
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
