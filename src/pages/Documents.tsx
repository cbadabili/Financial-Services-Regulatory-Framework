import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Search, Filter, Download, Eye, Calendar, Tag } from "lucide-react";
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

const documents = [
  {
    id: 1,
    title: "Banking Act Amendment 2025",
    type: "Amendment",
    regulator: "Bank of Botswana",
    date: "2025-01-10",
    status: "Active",
    category: "Banking Regulation",
    tags: ["Capital Requirements", "Risk Management"],
    size: "2.4 MB",
    views: 234
  },
  {
    id: 2,
    title: "AML/CFT Guidelines for Banks",
    type: "Guideline",
    regulator: "Financial Intelligence Agency",
    date: "2024-12-15",
    status: "Active",
    category: "Anti-Money Laundering",
    tags: ["AML", "CFT", "Due Diligence"],
    size: "1.8 MB",
    views: 456
  },
  {
    id: 3,
    title: "Quarterly Risk Assessment Framework",
    type: "Framework",
    regulator: "NBFIRA",
    date: "2024-11-30",
    status: "Active",
    category: "Risk Management",
    tags: ["Risk Assessment", "Quarterly Reporting"],
    size: "3.1 MB",
    views: 189
  },
  {
    id: 4,
    title: "ESG Reporting Standards",
    type: "Standard",
    regulator: "Botswana Stock Exchange",
    date: "2024-10-20",
    status: "Draft",
    category: "ESG Compliance",
    tags: ["ESG", "Environmental", "Social", "Governance"],
    size: "4.2 MB",
    views: 78
  },
  {
    id: 5,
    title: "Stress Testing Requirements",
    type: "Requirement",
    regulator: "Bank of Botswana",
    date: "2024-09-12",
    status: "Active",
    category: "Stress Testing",
    tags: ["Stress Testing", "Capital Planning"],
    size: "2.9 MB",
    views: 312
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
  switch (regulator) {
    case "Bank of Botswana": return "bob-blue";
    case "NBFIRA": return "nbfira-green";
    case "Botswana Stock Exchange": return "bse-orange";
    case "Financial Intelligence Agency": return "fia-purple";
    default: return "primary";
  }
};

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegulator, setSelectedRegulator] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { hasPermission } = useAuth();

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Document Library
        </h1>
        <p className="text-muted-foreground">
          Access and manage all regulatory documents, policies, and compliance frameworks.
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
                <SelectItem value="bob">Bank of Botswana</SelectItem>
                <SelectItem value="nbfira">NBFIRA</SelectItem>
                <SelectItem value="bse">Botswana Stock Exchange</SelectItem>
                <SelectItem value="fia">Financial Intelligence Agency</SelectItem>
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
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            {hasPermission('write_reports') && (
            <Button onClick={() => {
              const input = window.document.createElement('input');
              input.type = 'file';
              input.accept = '.pdf,.doc,.docx';
              input.multiple = true;
              input.onchange = () => alert('Upload functionality activated - files would be processed here');
              input.click();
            }}>
              Upload Documents
            </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="space-y-4">
        {documents.map((document) => (
          <Card key={document.id} className="hover:shadow-medium transition-smooth cursor-pointer">
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
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <span className={`text-${getRegulatorColor(document.regulator)} font-medium`}>
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

                  <div className="flex items-center space-x-2 mb-3">
                    {document.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => window.open('#', '_blank')}>
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  {hasPermission('read_documents') && (
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.preventDefault();
                    const link = window.document.createElement('a');
                    link.href = '#';
                    link.download = `${document.title}.pdf`;
                    link.click();
                  }}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}