import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Check, 
  ChevronsUpDown, 
  X, 
  Filter, 
  Calendar as CalendarIcon,
  Sliders,
  BarChart,
  Building2,
  CreditCard,
  FileText,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";

// TypeScript interfaces
export interface FilterState {
  financialServices: string[];
  productTypes: string[];
  regulators: string[];
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  documentTypes: string[];
  complianceStatus: string[];
  riskLevel: number[];
  keywords: string[];
}

export interface AdvancedSearchFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
}

// Data for filter options
const financialServiceOptions = [
  { value: "banking", label: "Banking" },
  { value: "insurance", label: "Insurance" },
  { value: "pension", label: "Pension Funds" },
  { value: "capital-markets", label: "Capital Markets" },
  { value: "microfinance", label: "Microfinance" },
  { value: "fintech", label: "FinTech" },
  { value: "asset-management", label: "Asset Management" },
  { value: "forex", label: "Foreign Exchange" },
];

const productTypeOptions = [
  { value: "savings", label: "Savings Accounts" },
  { value: "loans", label: "Loans & Credit" },
  { value: "investment", label: "Investment Products" },
  { value: "insurance-products", label: "Insurance Products" },
  { value: "payment-services", label: "Payment Services" },
  { value: "pension-products", label: "Pension Products" },
  { value: "digital-banking", label: "Digital Banking" },
  { value: "wealth-management", label: "Wealth Management" },
  { value: "forex-products", label: "Foreign Exchange Products" },
];

const regulatorOptions = [
  { value: "bob", label: "Bank of Botswana (BoB)", description: "Central bank and banking regulator" },
  { value: "nbfira", label: "Non-Bank Financial Institutions Regulatory Authority (NBFIRA)", description: "Regulates non-banking financial institutions" },
  { value: "bse", label: "Botswana Stock Exchange (BSE)", description: "Stock exchange and capital markets" },
  { value: "fia", label: "Financial Intelligence Agency (FIA)", description: "Anti-money laundering authority" },
  { value: "mti", label: "Ministry of Trade and Industry", description: "General business regulation" },
  { value: "cipa", label: "Companies and Intellectual Property Authority", description: "Company registration" },
];

const documentTypeOptions = [
  { value: "act", label: "Acts & Laws" },
  { value: "regulation", label: "Regulations" },
  { value: "directive", label: "Directives" },
  { value: "guideline", label: "Guidelines" },
  { value: "circular", label: "Circulars" },
  { value: "framework", label: "Frameworks" },
  { value: "policy", label: "Policies" },
  { value: "standard", label: "Standards" },
  { value: "form", label: "Forms & Templates" },
];

const complianceStatusOptions = [
  { value: "compliant", label: "Compliant" },
  { value: "non-compliant", label: "Non-Compliant" },
  { value: "partially-compliant", label: "Partially Compliant" },
  { value: "pending-review", label: "Pending Review" },
  { value: "exempted", label: "Exempted" },
  { value: "not-applicable", label: "Not Applicable" },
];

export default function AdvancedSearchFilters({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters,
}: AdvancedSearchFiltersProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize filters from URL params or initial props
  const [filters, setFilters] = useState<FilterState>({
    financialServices: [],
    productTypes: [],
    regulators: [],
    dateRange: {
      from: undefined,
      to: undefined,
    },
    documentTypes: [],
    complianceStatus: [],
    riskLevel: [0], // 0-3 scale: Low, Medium, High, Critical
    keywords: [],
  });

  const [isFilterChanged, setIsFilterChanged] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Initialize filters from URL or props
  useEffect(() => {
    // Parse URL search params
    const searchParams = new URLSearchParams(location.search);
    
    // If we have URL params, use them
    if (searchParams.has('filters')) {
      try {
        const urlFilters = JSON.parse(decodeURIComponent(searchParams.get('filters') || '{}'));
        
        // Convert date strings back to Date objects
        if (urlFilters.dateRange) {
          if (urlFilters.dateRange.from) {
            urlFilters.dateRange.from = new Date(urlFilters.dateRange.from);
          }
          if (urlFilters.dateRange.to) {
            urlFilters.dateRange.to = new Date(urlFilters.dateRange.to);
          }
        }
        
        setFilters({
          ...filters,
          ...urlFilters
        });
      } catch (e) {
        console.error("Error parsing filters from URL:", e);
      }
    } 
    // Otherwise use initialFilters if provided
    else if (initialFilters) {
      setFilters({
        ...filters,
        ...initialFilters
      });
    }
  }, [location.search, initialFilters]);

  // Update URL when filters change
  const updateUrlWithFilters = (newFilters: FilterState) => {
    const searchParams = new URLSearchParams(location.search);
    
    // Convert dates to ISO strings for URL storage
    const urlFilters = {
      ...newFilters,
      dateRange: {
        from: newFilters.dateRange.from?.toISOString(),
        to: newFilters.dateRange.to?.toISOString(),
      }
    };
    
    searchParams.set('filters', encodeURIComponent(JSON.stringify(urlFilters)));
    
    // Update URL without reloading the page
    navigate({
      pathname: location.pathname,
      search: searchParams.toString()
    }, { replace: true });
  };

  // Handle filter changes
  const handleFilterChange = <K extends keyof FilterState>(
    key: K, 
    value: FilterState[K]
  ) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    
    setFilters(newFilters);
    setIsFilterChanged(true);
  };

  // Handle multi-select filter changes
  const toggleArrayFilter = <K extends keyof FilterState>(
    key: K, 
    value: string
  ) => {
    const currentValues = filters[key] as string[];
    
    let newValues: string[];
    if (currentValues.includes(value)) {
      newValues = currentValues.filter(v => v !== value);
    } else {
      newValues = [...currentValues, value];
    }
    
    handleFilterChange(key, newValues as FilterState[K]);
  };

  // Apply filters
  const applyFilters = () => {
    updateUrlWithFilters(filters);
    onApplyFilters(filters);
    setIsFilterChanged(false);
  };

  // Clear all filters
  const clearFilters = () => {
    const emptyFilters: FilterState = {
      financialServices: [],
      productTypes: [],
      regulators: [],
      dateRange: {
        from: undefined,
        to: undefined,
      },
      documentTypes: [],
      complianceStatus: [],
      riskLevel: [0],
      keywords: [],
    };
    
    setFilters(emptyFilters);
    updateUrlWithFilters(emptyFilters);
    onApplyFilters(emptyFilters);
    setIsFilterChanged(false);
  };

  // Get count of active filters
  const getActiveFilterCount = () => {
    let count = 0;
    
    if (filters.financialServices.length > 0) count++;
    if (filters.productTypes.length > 0) count++;
    if (filters.regulators.length > 0) count++;
    if (filters.documentTypes.length > 0) count++;
    if (filters.complianceStatus.length > 0) count++;
    if (filters.riskLevel[0] > 0) count++;
    if (filters.dateRange.from || filters.dateRange.to) count++;
    if (filters.keywords.length > 0) count++;
    
    return count;
  };

  // Format risk level label
  const getRiskLevelLabel = (value: number) => {
    switch (value) {
      case 0: return "Any";
      case 1: return "Low";
      case 2: return "Medium";
      case 3: return "High";
      case 4: return "Critical";
      default: return "Any";
    }
  };

  // If the filter panel is not open, don't render anything
  if (!isOpen) return null;

  return (
    <Card className="shadow-md border-border w-full max-w-4xl mx-auto">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Advanced Search Filters</CardTitle>
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFilterCount()} active
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? "Expand" : "Collapse"}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <Collapsible open={!isCollapsed}>
        <CardContent className="p-6">
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Financial Services Filter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium flex items-center">
                    <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                    Financial Services
                  </Label>
                  {filters.financialServices.length > 0 && (
                    <Badge variant="outline" className="font-normal">
                      {filters.financialServices.length} selected
                    </Badge>
                  )}
                </div>
                <div className="space-y-2 border rounded-md p-4">
                  {financialServiceOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`fs-${option.value}`} 
                        checked={filters.financialServices.includes(option.value)}
                        onCheckedChange={() => toggleArrayFilter('financialServices', option.value)}
                      />
                      <Label 
                        htmlFor={`fs-${option.value}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Types Filter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                    Product Types
                  </Label>
                  {filters.productTypes.length > 0 && (
                    <Badge variant="outline" className="font-normal">
                      {filters.productTypes.length} selected
                    </Badge>
                  )}
                </div>
                <div className="space-y-2 border rounded-md p-4">
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="common-products">
                      <AccordionTrigger className="text-sm py-2">Common Products</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pl-2">
                          {productTypeOptions.slice(0, 4).map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`pt-${option.value}`} 
                                checked={filters.productTypes.includes(option.value)}
                                onCheckedChange={() => toggleArrayFilter('productTypes', option.value)}
                              />
                              <Label 
                                htmlFor={`pt-${option.value}`}
                                className="text-sm font-normal cursor-pointer"
                              >
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="specialized-products">
                      <AccordionTrigger className="text-sm py-2">Specialized Products</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pl-2">
                          {productTypeOptions.slice(4).map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`pt-${option.value}`} 
                                checked={filters.productTypes.includes(option.value)}
                                onCheckedChange={() => toggleArrayFilter('productTypes', option.value)}
                              />
                              <Label 
                                htmlFor={`pt-${option.value}`}
                                className="text-sm font-normal cursor-pointer"
                              >
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* Regulators Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center">
                  <Sliders className="h-4 w-4 mr-2 text-muted-foreground" />
                  Regulators
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="justify-between w-full"
                    >
                      {filters.regulators.length > 0 
                        ? `${filters.regulators.length} regulator${filters.regulators.length > 1 ? 's' : ''} selected` 
                        : "Select regulators"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search regulators..." />
                      <CommandList>
                        <CommandEmpty>No regulators found.</CommandEmpty>
                        <CommandGroup>
                          {regulatorOptions.map((regulator) => (
                            <CommandItem
                              key={regulator.value}
                              value={regulator.value}
                              onSelect={() => toggleArrayFilter('regulators', regulator.value)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  filters.regulators.includes(regulator.value) 
                                    ? "opacity-100" 
                                    : "opacity-0"
                                )}
                              />
                              <div>
                                <p>{regulator.label}</p>
                                <p className="text-xs text-muted-foreground">{regulator.description}</p>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {filters.regulators.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {filters.regulators.map(regValue => {
                      const regulator = regulatorOptions.find(r => r.value === regValue);
                      return (
                        <Badge 
                          key={regValue} 
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {regulator?.label.split(' ')[0]}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => toggleArrayFilter('regulators', regValue)}
                          />
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Date Range Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  Date Range
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !filters.dateRange.from && "text-muted-foreground"
                        )}
                      >
                        {filters.dateRange.from ? (
                          format(filters.dateRange.from, "PPP")
                        ) : (
                          "From date"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.dateRange.from}
                        onSelect={(date) => handleFilterChange('dateRange', {
                          ...filters.dateRange,
                          from: date
                        })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !filters.dateRange.to && "text-muted-foreground"
                        )}
                      >
                        {filters.dateRange.to ? (
                          format(filters.dateRange.to, "PPP")
                        ) : (
                          "To date"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.dateRange.to}
                        onSelect={(date) => handleFilterChange('dateRange', {
                          ...filters.dateRange,
                          to: date
                        })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {(filters.dateRange.from || filters.dateRange.to) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs h-7 px-2"
                    onClick={() => handleFilterChange('dateRange', { from: undefined, to: undefined })}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear dates
                  </Button>
                )}
              </div>

              {/* Document Types Filter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    Document Types
                  </Label>
                  {filters.documentTypes.length > 0 && (
                    <Badge variant="outline" className="font-normal">
                      {filters.documentTypes.length} selected
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {documentTypeOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`dt-${option.value}`} 
                        checked={filters.documentTypes.includes(option.value)}
                        onCheckedChange={() => toggleArrayFilter('documentTypes', option.value)}
                      />
                      <Label 
                        htmlFor={`dt-${option.value}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance Status Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-muted-foreground" />
                  Compliance Status
                </Label>
                <RadioGroup
                  value={filters.complianceStatus.length > 0 ? filters.complianceStatus[0] : ""}
                  onValueChange={(value) => handleFilterChange('complianceStatus', value ? [value] : [])}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {complianceStatusOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`cs-${option.value}`} />
                        <Label 
                          htmlFor={`cs-${option.value}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Risk Level Filter */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium flex items-center">
                    <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
                    Risk Level
                  </Label>
                  <Badge variant={filters.riskLevel[0] > 0 ? "default" : "outline"}>
                    {getRiskLevelLabel(filters.riskLevel[0])}
                  </Badge>
                </div>
                <Slider
                  defaultValue={[0]}
                  value={filters.riskLevel}
                  max={4}
                  step={1}
                  onValueChange={(value) => handleFilterChange('riskLevel', value)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Any</span>
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                  <span>Critical</span>
                </div>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Collapsible>

      <CardFooter className="flex justify-between border-t border-border p-4">
        <Button 
          variant="ghost" 
          onClick={clearFilters}
          className="gap-1"
        >
          <RefreshCw className="h-4 w-4" />
          Clear All
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            onClick={applyFilters}
            disabled={!isFilterChanged}
          >
            Apply Filters
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
