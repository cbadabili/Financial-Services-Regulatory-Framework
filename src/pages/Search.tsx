import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Search as SearchIcon, Filter, BookOpen, Calendar, Tag, Sparkles, ArrowLeft, X, ClipboardList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import AdvancedSearchFilters, { FilterState } from "@/components/search/AdvancedSearchFilters";
import ChecklistGenerator from "@/components/search/ChecklistGenerator";

const searchResults = [
  {
    id: 1,
    title: "What are the capital adequacy requirements for commercial banks?",
    type: "AI Answer",
    content: "Commercial banks in Botswana must maintain a minimum capital adequacy ratio of 15% as per the Banking Act. This includes Tier 1 capital of at least 10% and total capital of 15%...",
    sources: ["Banking Act 2021", "BoB Prudential Guidelines"],
    confidence: 95,
    regulator: "Bank of Botswana (BoB)"
  },
  {
    id: 2,
    title: "Banking Act Amendment 2025 - Section 4.2 Capital Requirements",
    type: "Document",
    content: "The minimum capital adequacy ratio for commercial banks shall be fifteen percent (15%) of risk-weighted assets, of which at least ten percent (10%) shall be Tier 1 capital...",
    date: "2025-01-10",
    regulator: "Bank of Botswana (BoB)",
    category: "Banking Regulation"
  },
  {
    id: 3,
    title: "AML Guidelines - Customer Due Diligence Procedures",
    type: "Document", 
    content: "Financial institutions must implement enhanced due diligence measures for high-risk customers, including politically exposed persons (PEPs) and customers from high-risk jurisdictions...",
    date: "2024-12-15",
    regulator: "Financial Intelligence Agency (FIA)",
    category: "Anti-Money Laundering"
  },
  {
    id: 4,
    title: "Virtual Assets Service Providers Licensing Requirements",
    type: "Document",
    content: "All Virtual Asset Service Providers (VASPs) must register with NBFIRA and comply with the Virtual Assets Act 2022. The minimum capital requirement is BWP 250,000 for standard VASP licenses...",
    date: "2024-11-20",
    regulator: "Non-Bank Financial Institutions Regulatory Authority (NBFIRA)",
    category: "Cryptocurrency Regulation"
  },
  {
    id: 5,
    title: "Company Registration Process for Financial Institutions",
    type: "Document",
    content: "Financial institutions must register with CIPA and provide beneficial ownership declarations. The company constitution must clearly outline the financial services to be offered...",
    date: "2024-10-05",
    regulator: "Companies and Intellectual Property Authority (CIPA)",
    category: "Business Registration"
  },
  {
    id: 6,
    title: "Tax Reporting Requirements for Financial Services",
    type: "Document",
    content: "Financial institutions must file quarterly VAT returns and annual Corporate Income Tax (CIT) returns. Special considerations apply for financial services with mixed taxable and exempt supplies...",
    date: "2025-01-15",
    regulator: "Botswana Unified Revenue Service (BURS)",
    category: "Tax Compliance"
  },
  {
    id: 7,
    title: "Consumer Protection Guidelines for Digital Financial Services",
    type: "Document",
    content: "Financial service providers must ensure clear terms and conditions, transparent fee structures, and accessible complaint resolution mechanisms for all digital financial services...",
    date: "2024-09-10",
    regulator: "Competition and Consumer Authority (CCA)",
    category: "Consumer Protection"
  },
  {
    id: 8,
    title: "Cybersecurity Standards for Financial Institutions",
    type: "Document",
    content: "All financial institutions offering digital services must implement the minimum cybersecurity standards outlined in the National Cybersecurity Framework, including regular penetration testing...",
    date: "2024-08-22",
    regulator: "Botswana Communications Regulatory Authority (BOCRA)",
    category: "Cybersecurity"
  },
  {
    id: 9,
    title: "SME Board Listing Requirements",
    type: "Document",
    content: "FinTech companies seeking to list on the Tshipidi SME Board must demonstrate minimum capital of BWP 500,000 and engage with the Tshipidi Mentorship Program for at least 6 months...",
    date: "2024-07-30",
    regulator: "Botswana Stock Exchange (BSE)",
    category: "Capital Markets"
  }
];

const relatedTopics = [
  "Capital Adequacy Ratios",
  "Risk-Weighted Assets",
  "Tier 1 Capital",
  "Prudential Requirements",
  "Basel III Implementation",
  "Stress Testing"
];

const recentSearches = [
  "AML customer due diligence requirements",
  "ESG reporting deadlines 2025",
  "NBFIRA licensing procedures",
  "Foreign exchange regulations"
];

export default function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [filters, setFilters] = useState<FilterState | null>(null);
  const [selectedResult, setSelectedResult] = useState<(typeof searchResults)[0] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { hasPermission } = useAuth();
  const { toast } = useToast();

  const handleSearch = () => {
    // Search functionality would be implemented here
    console.log("Searching for:", searchQuery);
  };

  // handle after checklist creation
  const handleChecklistGenerated = () => {
    toast({
      title: "Checklist Generated",
      description: "Your customised compliance checklist is ready for export.",
    });
  };

  const handleOpenDocument = (result: (typeof searchResults)[0]) => {
    setSelectedResult(result);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedResult(null);
  };

  const getActiveFilterCount = () => {
    if (!filters) return 0;
    let count = 0;
    if (filters.financialServices.length) count++;
    if (filters.productTypes.length) count++;
    if (filters.regulators.length) count++;
    if (filters.documentTypes.length) count++;
    if (filters.complianceStatus.length) count++;
    if (filters.riskLevel[0] > 0) count++;
    if (filters.dateRange.from || filters.dateRange.to) count++;
    if (filters.keywords.length) count++;
    return count;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Regulatory Search
            </h1>
            <p className="text-muted-foreground">
              Advanced semantic search across all regulatory documents and compliance frameworks.
            </p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/dashboard')}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Search Interface */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Ask a question or search for regulations... (e.g., 'What are the capital requirements for banks?')"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
              </div>
              <Button onClick={handleSearch} size="lg" className="px-8">
                <SearchIcon className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Search in:</span>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="cursor-pointer">All Documents</Badge>
                  <Badge variant="outline" className="cursor-pointer">BoB</Badge>
                  <Badge variant="outline" className="cursor-pointer">NBFIRA</Badge>
                  <Badge variant="outline" className="cursor-pointer">BSE</Badge>
                  <Badge variant="outline" className="cursor-pointer">FIA</Badge>
                  <Badge variant="outline" className="cursor-pointer">CIPA</Badge>
                  <Badge variant="outline" className="cursor-pointer">BURS</Badge>
                  <Badge variant="outline" className="cursor-pointer">CCA</Badge>
                  <Badge variant="outline" className="cursor-pointer">BOCRA</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(true)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {getActiveFilterCount() > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {getActiveFilterCount()}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setShowChecklist(true)}
                >
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Generate Checklist
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters Panel */}
      <AdvancedSearchFilters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApplyFilters={(f) => {
          setFilters(f);
          setShowFilters(false);
        }}
        initialFilters={filters || undefined}
      />

      {/* Checklist Generator Dialog */}
      <ChecklistGenerator
        isOpen={showChecklist}
        onClose={() => setShowChecklist(false)}
        onChecklistGenerated={handleChecklistGenerated}
      />

      {/* Document Preview Modal */}
      {showModal && (
        <DocumentModal 
          result={selectedResult} 
          onClose={handleCloseModal} 
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Search Results */}
        <div className="lg:col-span-3 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">All Results</TabsTrigger>
                <TabsTrigger value="ai">Smart Answers</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="regulations">Regulations</TabsTrigger>
              </TabsList>
              <div className="text-sm text-muted-foreground">
                Found 127 results in 0.3 seconds
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              {searchResults.map((result) => (
                <Card key={result.id} className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">
                              {result.title}
                            </h3>
                            <Badge variant={result.type === "AI Answer" ? "default" : "secondary"}>
                              {result.type === "AI Answer" ? "Smart Answer" : result.type}
                            </Badge>
                           {result.type === "AI Answer" && (
                              <Badge variant="outline" className="text-xs">
                                {result.confidence}% confidence
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                            {result.content}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="font-medium text-primary">
                              {result.regulator}
                            </span>
                            {result.date && (
                              <>
                                <span>•</span>
                                <span className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {new Date(result.date).toLocaleDateString()}
                                </span>
                              </>
                            )}
                            {result.category && (
                              <>
                                <span>•</span>
                                <span className="flex items-center">
                                  <Tag className="h-4 w-4 mr-1" />
                                  {result.category}
                                </span>
                              </>
                            )}
                          </div>
                          
                          {result.sources && (
                            <div className="mt-3">
                              <span className="text-xs text-muted-foreground">Sources: </span>
                              {result.sources.map((source, index) => (
                                <Badge key={index} variant="outline" className="text-xs mr-1">
                                  {source}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="ml-4" 
                          onClick={() => handleOpenDocument(result)}
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Open
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Related Topics */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Related Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {relatedTopics.map((topic, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-left h-auto p-2"
                >
                  {topic}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Recent Searches */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Recent Searches</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="w-full text-left p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-smooth"
                >
                  {search}
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Search Tips */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Search Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div>
                <strong className="text-foreground">Ask questions:</strong>
                <br />
                "What are the AML requirements for banks?"
              </div>
              <div>
                <strong className="text-foreground">Use quotes:</strong>
                <br />
                "capital adequacy ratio"
              </div>
              <div>
                <strong className="text-foreground">Filter by regulator:</strong>
                <br />
                regulator:BoB capital requirements
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Simple in-file modal for document preview – replaces alert popup.
 * ----------------------------------------------------------------*/
function DocumentModal({
  result,
  onClose,
}: {
  result: (typeof searchResults)[0] | null;
  onClose: () => void;
}) {
  if (!result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background max-w-xl w-full rounded-lg shadow-lg p-6 relative">
        <button
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          {result.title}
        </h2>
        <p className="text-sm text-muted-foreground mb-4">{result.regulator}</p>
        <div className="prose max-h-80 overflow-y-auto">
          {result.content}
        </div>
      </div>
    </div>
  );
}
