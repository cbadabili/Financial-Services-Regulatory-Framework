import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Search as SearchIcon, Filter, BookOpen, Calendar, Tag, Sparkles, ArrowLeft, X, ClipboardList, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import AdvancedSearchFilters, { FilterState } from "@/components/search/AdvancedSearchFilters";
import ChecklistGenerator from "@/components/search/ChecklistGenerator";

const allSearchResults = [
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

// Define all available regulators for filtering
const regulators = [
  { id: "all", name: "All Documents" },
  { id: "bob", name: "BoB" },
  { id: "nbfira", name: "NBFIRA" },
  { id: "bse", name: "BSE" },
  { id: "fia", name: "FIA" },
  { id: "cipa", name: "CIPA" },
  { id: "burs", name: "BURS" },
  { id: "cca", name: "CCA" },
  { id: "bocra", name: "BOCRA" }
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [filters, setFilters] = useState<FilterState | null>(null);
  const [selectedResult, setSelectedResult] = useState<(typeof allSearchResults)[0] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { hasPermission } = useAuth();
  const { toast } = useToast();
  
  // Add state for selected regulator
  const [selectedRegulator, setSelectedRegulator] = useState("all");
  // Add state for filtered search results
  const [searchResults, setSearchResults] = useState(allSearchResults);
  // Add state for results count
  const [resultsCount, setResultsCount] = useState(allSearchResults.length);
  // Add state for search time
  const [searchTime, setSearchTime] = useState(0.3);

  // Filter results based on search query and selected regulator
  const filterResults = () => {
    const startTime = performance.now();
    
    let filtered = [...allSearchResults];
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(result => 
        result.title.toLowerCase().includes(query) || 
        result.content.toLowerCase().includes(query) ||
        (result.category && result.category.toLowerCase().includes(query)) ||
        (result.regulator && result.regulator.toLowerCase().includes(query))
      );
    }
    
    // Filter by selected regulator
    if (selectedRegulator !== "all") {
      filtered = filtered.filter(result => 
        result.regulator.toLowerCase().includes(selectedRegulator.toLowerCase())
      );
    }
    
    // Filter by active tab
    if (activeTab === "ai") {
      filtered = filtered.filter(result => result.type === "AI Answer");
    } else if (activeTab === "documents") {
      filtered = filtered.filter(result => result.type === "Document");
    } else if (activeTab === "regulations") {
      filtered = filtered.filter(result => 
        result.type === "Document" && 
        (result.category?.includes("Regulation") || result.title.includes("Regulation"))
      );
    }
    
    // Apply advanced filters if available
    if (filters) {
      if (filters.regulators.length > 0) {
        filtered = filtered.filter(result => 
          filters.regulators.some(reg => 
            result.regulator.toLowerCase().includes(reg.toLowerCase())
          )
        );
      }
      
      if (filters.documentTypes.length > 0) {
        filtered = filtered.filter(result => 
          filters.documentTypes.includes(result.type)
        );
      }
      
      if (filters.dateRange.from || filters.dateRange.to) {
        filtered = filtered.filter(result => {
          if (!result.date) return false;
          
          const resultDate = new Date(result.date);
          
          if (filters.dateRange.from && filters.dateRange.to) {
            return resultDate >= filters.dateRange.from && resultDate <= filters.dateRange.to;
          } else if (filters.dateRange.from) {
            return resultDate >= filters.dateRange.from;
          } else if (filters.dateRange.to) {
            return resultDate <= filters.dateRange.to;
          }
          
          return true;
        });
      }
      
      if (filters.keywords.length > 0) {
        filtered = filtered.filter(result => 
          filters.keywords.some(keyword => 
            result.content.toLowerCase().includes(keyword.toLowerCase()) ||
            result.title.toLowerCase().includes(keyword.toLowerCase())
          )
        );
      }
    }
    
    const endTime = performance.now();
    const searchTimeInSeconds = ((endTime - startTime) / 1000).toFixed(1);
    
    setSearchResults(filtered);
    setResultsCount(filtered.length);
    setSearchTime(parseFloat(searchTimeInSeconds));
  };

  // Handle search button click and Enter key press
  const handleSearch = () => {
    filterResults();
    
    // Update URL parameters to reflect the current search
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedRegulator !== 'all') params.set('category', selectedRegulator);
    setSearchParams(params);
    
    // Update related topics based on search query
    if (searchQuery.toLowerCase().includes("capital") || 
        searchQuery.toLowerCase().includes("bank")) {
      // This would normally fetch from an API, but for demo we'll just use the static list
    }
  };

  // Handle regulator selection
  const handleRegulatorSelect = (regId: string) => {
    setSelectedRegulator(regId);
    // Apply filtering immediately when regulator is selected
    setTimeout(() => {
      filterResults();
      
      // Update URL parameters
      const params = new URLSearchParams(searchParams);
      if (regId !== 'all') {
        params.set('category', regId);
      } else {
        params.delete('category');
      }
      setSearchParams(params);
    }, 0);
  };

  // Handle after checklist creation
  const handleChecklistGenerated = () => {
    toast({
      title: "Checklist Generated",
      description: "Your customised compliance checklist is ready for export.",
    });
    
    // Show download notification
    setTimeout(() => {
      toast({
        title: "Checklist Downloaded",
        description: "Your compliance checklist has been downloaded as PDF.",
      });
    }, 1500);
  };

  // Handle opening document
  const handleOpenDocument = (result: (typeof allSearchResults)[0]) => {
    setSelectedResult(result);
    setShowModal(true);
  };

  // Handle closing document modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedResult(null);
  };

  // Handle clicking on a related topic
  const handleTopicClick = (topic: string) => {
    setSearchQuery(topic);
    setTimeout(() => handleSearch(), 0);
  };

  // Handle clicking on a recent search
  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    setTimeout(() => handleSearch(), 0);
  };

  // Count active filters
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

  // Read URL parameters when component mounts
  useEffect(() => {
    const queryParam = searchParams.get('q');
    const categoryParam = searchParams.get('category');
    
    // Set search query from URL parameter
    if (queryParam) {
      setSearchQuery(queryParam);
    }
    
    // Set selected regulator from URL parameter
    if (categoryParam) {
      setSelectedRegulator(categoryParam);
    }
    
    // Trigger search if parameters are present
    if (queryParam || categoryParam) {
      setTimeout(filterResults, 0);
    }
  }, [searchParams]);

  // Initialize results on first render
  useEffect(() => {
    filterResults();
  }, []);

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
                  {regulators.map((regulator) => (
                    <Badge 
                      key={regulator.id}
                      variant={selectedRegulator === regulator.id ? "secondary" : "outline"} 
                      className="cursor-pointer hover:bg-secondary/80 transition-colors"
                      onClick={() => handleRegulatorSelect(regulator.id)}
                    >
                      {regulator.name}
                    </Badge>
                  ))}
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
          // Apply filters after setting them
          setTimeout(() => filterResults(), 0);
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
          <Tabs value={activeTab} onValueChange={(tab) => {
            setActiveTab(tab);
            // Re-filter results when tab changes
            setTimeout(() => filterResults(), 0);
          }}>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">All Results</TabsTrigger>
                <TabsTrigger value="ai">Smart Answers</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="regulations">Regulations</TabsTrigger>
              </TabsList>
              <div className="text-sm text-muted-foreground">
                Found {resultsCount} results in {searchTime} seconds
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
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
                ))
              ) : (
                <Card className="shadow-soft">
                  <CardContent className="p-6 flex flex-col items-center justify-center py-10">
                    <SearchIcon className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No results found</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="ai" className="space-y-4">
              {searchResults.filter(r => r.type === "AI Answer").length > 0 ? (
                searchResults
                  .filter(r => r.type === "AI Answer")
                  .map((result) => (
                    <Card key={result.id} className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer">
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-foreground">
                                  {result.title}
                                </h3>
                                <Badge variant="default">
                                  Smart Answer
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {result.confidence}% confidence
                                </Badge>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                                {result.content}
                              </p>
                              
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span className="font-medium text-primary">
                                  {result.regulator}
                                </span>
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
                  ))
              ) : (
                <Card className="shadow-soft">
                  <CardContent className="p-6 flex flex-col items-center justify-center py-10">
                    <Sparkles className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No smart answers available</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                      Try asking a specific question about regulatory requirements.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              {searchResults.filter(r => r.type === "Document").length > 0 ? (
                searchResults
                  .filter(r => r.type === "Document")
                  .map((result) => (
                    <Card key={result.id} className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer">
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-foreground">
                                  {result.title}
                                </h3>
                                <Badge variant="secondary">
                                  Document
                                </Badge>
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
                  ))
              ) : (
                <Card className="shadow-soft">
                  <CardContent className="p-6 flex flex-col items-center justify-center py-10">
                    <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No documents found</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                      Try adjusting your search terms or filters to find relevant documents.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="regulations" className="space-y-4">
              {searchResults.filter(r => 
                r.type === "Document" && 
                (r.category?.includes("Regulation") || r.title.includes("Regulation"))
              ).length > 0 ? (
                searchResults
                  .filter(r => 
                    r.type === "Document" && 
                    (r.category?.includes("Regulation") || r.title.includes("Regulation"))
                  )
                  .map((result) => (
                    <Card key={result.id} className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer">
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-foreground">
                                  {result.title}
                                </h3>
                                <Badge variant="secondary">
                                  Regulation
                                </Badge>
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
                  ))
              ) : (
                <Card className="shadow-soft">
                  <CardContent className="p-6 flex flex-col items-center justify-center py-10">
                    <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No regulations found</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                      Try adjusting your search terms or filters to find relevant regulations.
                    </p>
                  </CardContent>
                </Card>
              )}
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
                  onClick={() => handleTopicClick(topic)}
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
                  onClick={() => handleRecentSearchClick(search)}
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
  result: (typeof allSearchResults)[0] | null;
  onClose: () => void;
}) {
  if (!result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background max-w-3xl w-full rounded-lg shadow-lg p-6 relative max-h-[80vh] overflow-y-auto">
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
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
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
        <div className="prose max-w-none">
          <p className="text-base mb-4">{result.content}</p>
          
          {/* Additional content for AI answers */}
          {result.type === "AI Answer" && result.sources && (
            <div className="mt-6 pt-4 border-t">
              <h3 className="text-lg font-medium mb-2">Sources</h3>
              <ul className="list-disc pl-5 space-y-1">
                {result.sources.map((source, index) => (
                  <li key={index}>{source}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Additional content for documents */}
          {result.type === "Document" && (
            <div className="mt-6">
              <p className="text-sm text-muted-foreground">
                This is a preview of the document. For the complete content, please download the full document.
              </p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            Download Full Document
          </Button>
        </div>
      </div>
    </div>
  );
}
