import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  FileText, 
  Newspaper, 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  CheckCircle, 
  Download, 
  Upload, 
  MoreHorizontal,
  Clock,
  Eye,
  Copy,
  AlertTriangle,
  FileUp,
  Tag,
  CalendarIcon
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";

// UI Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Types
interface ContentItem {
  id: string;
  title: string;
  type: string;
  status: "draft" | "published" | "archived";
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  category?: string;
  tags?: string[];
}

interface Document extends ContentItem {
  fileSize: string;
  fileType: string;
  downloadUrl: string;
  regulator: string;
  description: string;
  views: number;
}

interface NewsItem extends ContentItem {
  summary: string;
  content: string;
  imageUrl?: string;
  publishDate: Date;
  expiryDate?: Date;
  priority: "low" | "medium" | "high";
}

interface EventItem extends ContentItem {
  startDate: Date;
  endDate: Date;
  location: string;
  description: string;
  registrationUrl?: string;
  registrationDeadline?: Date;
  capacity?: number;
  attendees?: number;
}

interface AuditLogEntry {
  id: string;
  action: "create" | "update" | "delete" | "publish" | "archive";
  itemId: string;
  itemType: "document" | "news" | "event";
  itemTitle: string;
  timestamp: Date;
  user: string;
  details?: string;
}

// Mock data
const mockDocuments: Document[] = [
  {
    id: "doc-1",
    title: "Banking Act Amendment 2025",
    type: "document",
    status: "published",
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-15"),
    createdBy: "admin@bob.bw",
    category: "Banking Regulation",
    tags: ["Capital Requirements", "Risk Management"],
    fileSize: "2.4 MB",
    fileType: "PDF",
    downloadUrl: "/documents/banking-act-amendment-2025.pdf",
    regulator: "Bank of Botswana (BoB)",
    description: "The minimum capital adequacy ratio for commercial banks shall be fifteen percent (15%) of risk-weighted assets.",
    views: 234
  },
  {
    id: "doc-2",
    title: "AML/CFT Guidelines 2024",
    type: "document",
    status: "published",
    createdAt: new Date("2024-11-05"),
    updatedAt: new Date("2024-11-05"),
    createdBy: "admin@bob.bw",
    category: "Anti-Money Laundering",
    tags: ["AML", "CFT", "Compliance"],
    fileSize: "3.1 MB",
    fileType: "PDF",
    downloadUrl: "/documents/aml-cft-guidelines-2024.pdf",
    regulator: "Financial Intelligence Agency (FIA)",
    description: "Updated guidelines for Anti-Money Laundering and Counter-Financing of Terrorism compliance.",
    views: 189
  },
  {
    id: "doc-3",
    title: "Cybersecurity Framework for Financial Institutions",
    type: "document",
    status: "published",
    createdAt: new Date("2024-09-20"),
    updatedAt: new Date("2024-10-01"),
    createdBy: "admin@bob.bw",
    category: "Technology & Cybersecurity",
    tags: ["Cybersecurity", "Risk", "Technology"],
    fileSize: "4.2 MB",
    fileType: "PDF",
    downloadUrl: "/documents/cybersecurity-framework-2024.pdf",
    regulator: "Bank of Botswana (BoB)",
    description: "Comprehensive framework for implementing cybersecurity controls in financial institutions.",
    views: 156
  },
  {
    id: "doc-4",
    title: "ESG Reporting Template",
    type: "document",
    status: "draft",
    createdAt: new Date("2025-02-01"),
    updatedAt: new Date("2025-02-01"),
    createdBy: "admin@bob.bw",
    category: "ESG Compliance",
    tags: ["ESG", "Reporting", "Sustainability"],
    fileSize: "1.8 MB",
    fileType: "XLSX",
    downloadUrl: "/templates/esg-reporting-template.xlsx",
    regulator: "Botswana Stock Exchange (BSE)",
    description: "Standardized template for Environmental, Social, and Governance (ESG) reporting.",
    views: 0
  },
  {
    id: "doc-5",
    title: "Payment Systems Licensing Guide",
    type: "document",
    status: "published",
    createdAt: new Date("2024-08-15"),
    updatedAt: new Date("2024-08-15"),
    createdBy: "admin@bob.bw",
    category: "Licensing",
    tags: ["Payment", "License", "FinTech"],
    fileSize: "2.9 MB",
    fileType: "PDF",
    downloadUrl: "/documents/payment-licensing-guide-2024.pdf",
    regulator: "Bank of Botswana (BoB)",
    description: "Comprehensive guide for obtaining payment service provider licenses in Botswana.",
    views: 210
  }
];

const mockNewsItems: NewsItem[] = [
  {
    id: "news-1",
    title: "New Capital Requirements Announced for Banks",
    type: "news",
    status: "published",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
    createdBy: "admin@bob.bw",
    category: "Banking Regulation",
    tags: ["Capital", "Banks", "Regulation"],
    summary: "Bank of Botswana announces increased capital requirements for commercial banks effective July 2025.",
    content: "The Bank of Botswana has announced new capital requirements for all commercial banks operating in the country. Effective July 1, 2025, all banks will be required to maintain a minimum capital adequacy ratio of 15%, up from the current 12.5%. This increase aims to strengthen the banking sector's resilience against financial shocks and align with international Basel III standards.",
    publishDate: new Date("2025-01-15"),
    priority: "high"
  },
  {
    id: "news-2",
    title: "NBFIRA Releases New Insurance Regulatory Framework",
    type: "news",
    status: "published",
    createdAt: new Date("2024-12-10"),
    updatedAt: new Date("2024-12-10"),
    createdBy: "admin@bob.bw",
    category: "Insurance",
    tags: ["Insurance", "Regulation", "NBFIRA"],
    summary: "NBFIRA has released a comprehensive new regulatory framework for the insurance sector.",
    content: "The Non-Bank Financial Institutions Regulatory Authority (NBFIRA) has released a comprehensive new regulatory framework for the insurance sector. The framework introduces risk-based supervision, enhanced consumer protection measures, and new solvency requirements for insurance companies. Industry stakeholders have until March 2025 to submit feedback before the final framework is implemented in July 2025.",
    publishDate: new Date("2024-12-10"),
    priority: "medium"
  },
  {
    id: "news-3",
    title: "FIA Issues Warning on Cryptocurrency Scams",
    type: "news",
    status: "published",
    createdAt: new Date("2025-02-05"),
    updatedAt: new Date("2025-02-05"),
    createdBy: "admin@bob.bw",
    category: "Fraud Prevention",
    tags: ["Cryptocurrency", "Fraud", "Warning"],
    summary: "Financial Intelligence Agency warns public about increasing cryptocurrency investment scams.",
    content: "The Financial Intelligence Agency (FIA) has issued a public warning about the increasing number of cryptocurrency investment scams targeting Botswana residents. The agency has observed a sharp rise in fraudulent investment schemes promising unrealistic returns on cryptocurrency investments. The FIA advises the public to exercise extreme caution when approached with cryptocurrency investment opportunities and to verify the legitimacy of any investment platform with regulatory authorities.",
    publishDate: new Date("2025-02-05"),
    priority: "high"
  },
  {
    id: "news-4",
    title: "BSE Launches New Market for SMEs",
    type: "news",
    status: "draft",
    createdAt: new Date("2025-02-20"),
    updatedAt: new Date("2025-02-20"),
    createdBy: "admin@bob.bw",
    category: "Capital Markets",
    tags: ["BSE", "SME", "Market"],
    summary: "Botswana Stock Exchange announces new dedicated market segment for small and medium enterprises.",
    content: "The Botswana Stock Exchange (BSE) has announced the launch of a new market segment dedicated to small and medium enterprises (SMEs). The BSE SME Board aims to provide smaller companies with access to capital markets through simplified listing requirements and reduced fees. The initiative is part of BSE's strategy to deepen the capital markets and support the growth of SMEs in Botswana. The new board is expected to be operational by September 2025.",
    publishDate: new Date("2025-03-01"),
    priority: "medium"
  }
];

const mockEvents: EventItem[] = [
  {
    id: "event-1",
    title: "Annual Banking Compliance Conference 2025",
    type: "event",
    status: "published",
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-05"),
    createdBy: "admin@bob.bw",
    category: "Conference",
    tags: ["Banking", "Compliance", "Conference"],
    startDate: new Date("2025-03-15"),
    endDate: new Date("2025-03-17"),
    location: "Gaborone International Convention Centre",
    description: "The Annual Banking Compliance Conference brings together regulators, compliance officers, and banking executives to discuss the latest regulatory developments and compliance challenges in the banking sector.",
    registrationUrl: "https://banking-compliance-conference.bw",
    registrationDeadline: new Date("2025-03-01"),
    capacity: 300,
    attendees: 120
  },
  {
    id: "event-2",
    title: "FinTech Innovation Workshop",
    type: "event",
    status: "published",
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-10"),
    createdBy: "admin@bob.bw",
    category: "Workshop",
    tags: ["FinTech", "Innovation", "Workshop"],
    startDate: new Date("2025-02-25"),
    endDate: new Date("2025-02-25"),
    location: "Bank of Botswana Training Centre",
    description: "A one-day workshop focused on regulatory approaches to financial technology innovations. The workshop will cover regulatory sandboxes, licensing requirements for FinTech companies, and compliance considerations for digital financial services.",
    registrationUrl: "https://fintech-workshop.bob.bw",
    registrationDeadline: new Date("2025-02-20"),
    capacity: 100,
    attendees: 85
  },
  {
    id: "event-3",
    title: "AML/CFT Certification Program",
    type: "event",
    status: "published",
    createdAt: new Date("2024-11-15"),
    updatedAt: new Date("2024-11-15"),
    createdBy: "admin@bob.bw",
    category: "Training",
    tags: ["AML", "CFT", "Certification", "Training"],
    startDate: new Date("2025-04-10"),
    endDate: new Date("2025-04-14"),
    location: "Financial Intelligence Agency Training Facility",
    description: "A comprehensive five-day certification program on Anti-Money Laundering and Counter-Financing of Terrorism. The program covers regulatory requirements, risk assessment methodologies, customer due diligence procedures, and suspicious transaction reporting.",
    registrationUrl: "https://aml-certification.fia.bw",
    registrationDeadline: new Date("2025-03-25"),
    capacity: 50,
    attendees: 32
  },
  {
    id: "event-4",
    title: "ESG Reporting Webinar",
    type: "event",
    status: "draft",
    createdAt: new Date("2025-02-10"),
    updatedAt: new Date("2025-02-10"),
    createdBy: "admin@bob.bw",
    category: "Webinar",
    tags: ["ESG", "Reporting", "Webinar"],
    startDate: new Date("2025-03-05"),
    endDate: new Date("2025-03-05"),
    location: "Virtual (Zoom)",
    description: "A webinar on Environmental, Social, and Governance (ESG) reporting requirements for listed companies. The webinar will cover the new ESG disclosure framework, reporting templates, and implementation timelines.",
    registrationUrl: "https://esg-webinar.bse.bw",
    registrationDeadline: new Date("2025-03-04"),
    capacity: 200,
    attendees: 0
  }
];

const mockAuditLog: AuditLogEntry[] = [
  {
    id: "log-1",
    action: "create",
    itemId: "doc-4",
    itemType: "document",
    itemTitle: "ESG Reporting Template",
    timestamp: new Date("2025-02-01T10:15:00"),
    user: "admin@bob.bw",
    details: "Created new document"
  },
  {
    id: "log-2",
    action: "update",
    itemId: "doc-1",
    itemType: "document",
    itemTitle: "Banking Act Amendment 2025",
    timestamp: new Date("2025-01-15T14:30:00"),
    user: "admin@bob.bw",
    details: "Updated document description and tags"
  },
  {
    id: "log-3",
    action: "publish",
    itemId: "news-1",
    itemType: "news",
    itemTitle: "New Capital Requirements Announced for Banks",
    timestamp: new Date("2025-01-15T09:45:00"),
    user: "admin@bob.bw",
    details: "Published news article"
  },
  {
    id: "log-4",
    action: "create",
    itemId: "event-2",
    itemType: "event",
    itemTitle: "FinTech Innovation Workshop",
    timestamp: new Date("2025-01-10T11:20:00"),
    user: "admin@bob.bw",
    details: "Created new event"
  },
  {
    id: "log-5",
    action: "update",
    itemId: "event-1",
    itemType: "event",
    itemTitle: "Annual Banking Compliance Conference 2025",
    timestamp: new Date("2024-12-05T16:10:00"),
    user: "admin@bob.bw",
    details: "Updated event details and capacity"
  },
  {
    id: "log-6",
    action: "create",
    itemId: "news-4",
    itemType: "news",
    itemTitle: "BSE Launches New Market for SMEs",
    timestamp: new Date("2025-02-20T13:40:00"),
    user: "admin@bob.bw",
    details: "Created news draft"
  },
  {
    id: "log-7",
    action: "create",
    itemId: "event-4",
    itemType: "event",
    itemTitle: "ESG Reporting Webinar",
    timestamp: new Date("2025-02-10T10:05:00"),
    user: "admin@bob.bw",
    details: "Created event draft"
  }
];

// Component
export default function ContentManager() {
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState("documents");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // State for each content type
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [newsItems, setNewsItems] = useState<NewsItem[]>(mockNewsItems);
  const [events, setEvents] = useState<EventItem[]>(mockEvents);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>(mockAuditLog);
  
  // State for selected items (batch operations)
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  // State for edit/create modals
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [currentNewsItem, setCurrentNewsItem] = useState<NewsItem | null>(null);
  const [currentEvent, setCurrentEvent] = useState<EventItem | null>(null);
  
  // State for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: string, type: string, title: string} | null>(null);
  
  // State for file upload
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  
  // Filtered content based on search and filters
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchQuery === "" || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.regulator.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  const filteredNews = newsItems.filter(news => {
    const matchesSearch = searchQuery === "" || 
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || news.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || news.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  const filteredEvents = events.filter(event => {
    const matchesSearch = searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  // Get unique categories for filter
  const allCategories = [
    ...new Set([
      ...documents.map(doc => doc.category || ""),
      ...newsItems.map(news => news.category || ""),
      ...events.map(event => event.category || "")
    ])
  ].filter(category => category !== "");
  
  // Handle item selection for batch operations
  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    }
  };
  
  // Handle select all for current view
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      switch (activeTab) {
        case "documents":
          setSelectedItems(filteredDocuments.map(doc => doc.id));
          break;
        case "news":
          setSelectedItems(filteredNews.map(news => news.id));
          break;
        case "events":
          setSelectedItems(filteredEvents.map(event => event.id));
          break;
      }
    } else {
      setSelectedItems([]);
    }
  };
  
  // Handle batch delete
  const handleBatchDelete = () => {
    if (selectedItems.length === 0) return;
    
    // For each content type, filter out selected items
    const updatedDocuments = documents.filter(doc => !selectedItems.includes(doc.id));
    const updatedNews = newsItems.filter(news => !selectedItems.includes(news.id));
    const updatedEvents = events.filter(event => !selectedItems.includes(event.id));
    
    // Update state
    setDocuments(updatedDocuments);
    setNewsItems(updatedNews);
    setEvents(updatedEvents);
    
    // Log audit entries for each deleted item
    const newAuditEntries: AuditLogEntry[] = [];
    
    selectedItems.forEach(itemId => {
      let itemType: "document" | "news" | "event" = "document";
      let itemTitle = "";
      
      // Find the item details
      const doc = documents.find(d => d.id === itemId);
      const news = newsItems.find(n => n.id === itemId);
      const event = events.find(e => e.id === itemId);
      
      if (doc) {
        itemType = "document";
        itemTitle = doc.title;
      } else if (news) {
        itemType = "news";
        itemTitle = news.title;
      } else if (event) {
        itemType = "event";
        itemTitle = event.title;
      }
      
      newAuditEntries.push({
        id: `log-${Date.now()}-${itemId}`,
        action: "delete",
        itemId,
        itemType,
        itemTitle,
        timestamp: new Date(),
        user: "admin@bob.bw",
        details: "Batch delete operation"
      });
    });
    
    // Update audit log
    setAuditLog([...newAuditEntries, ...auditLog]);
    
    // Clear selection
    setSelectedItems([]);
    
    // Notify user
    toast({
      title: "Batch Delete Successful",
      description: `${selectedItems.length} items have been deleted.`
    });
  };
  
  // Handle batch publish
  const handleBatchPublish = () => {
    if (selectedItems.length === 0) return;
    
    // For each content type, update status of selected items
    const updatedDocuments = documents.map(doc => 
      selectedItems.includes(doc.id) ? { ...doc, status: "published" as const } : doc
    );
    
    const updatedNews = newsItems.map(news => 
      selectedItems.includes(news.id) ? { ...news, status: "published" as const } : news
    );
    
    const updatedEvents = events.map(event => 
      selectedItems.includes(event.id) ? { ...event, status: "published" as const } : event
    );
    
    // Update state
    setDocuments(updatedDocuments);
    setNewsItems(updatedNews);
    setEvents(updatedEvents);
    
    // Log audit entries for each published item
    const newAuditEntries: AuditLogEntry[] = [];
    
    selectedItems.forEach(itemId => {
      let itemType: "document" | "news" | "event" = "document";
      let itemTitle = "";
      
      // Find the item details
      const doc = documents.find(d => d.id === itemId);
      const news = newsItems.find(n => n.id === itemId);
      const event = events.find(e => e.id === itemId);
      
      if (doc) {
        itemType = "document";
        itemTitle = doc.title;
      } else if (news) {
        itemType = "news";
        itemTitle = news.title;
      } else if (event) {
        itemType = "event";
        itemTitle = event.title;
      }
      
      newAuditEntries.push({
        id: `log-${Date.now()}-${itemId}`,
        action: "publish",
        itemId,
        itemType,
        itemTitle,
        timestamp: new Date(),
        user: "admin@bob.bw",
        details: "Batch publish operation"
      });
    });
    
    // Update audit log
    setAuditLog([...newAuditEntries, ...auditLog]);
    
    // Clear selection
    setSelectedItems([]);
    
    // Notify user
    toast({
      title: "Batch Publish Successful",
      description: `${selectedItems.length} items have been published.`
    });
  };
  
  // Handle edit document
  const handleEditDocument = (document: Document) => {
    setCurrentDocument(document);
    setShowDocumentModal(true);
  };
  
  // Handle edit news
  const handleEditNews = (news: NewsItem) => {
    setCurrentNewsItem(news);
    setShowNewsModal(true);
  };
  
  // Handle edit event
  const handleEditEvent = (event: EventItem) => {
    setCurrentEvent(event);
    setShowEventModal(true);
  };
  
  // Handle create new document
  const handleCreateDocument = () => {
    setCurrentDocument({
      id: `doc-${Date.now()}`,
      title: "",
      type: "document",
      status: "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "admin@bob.bw",
      fileSize: "0 KB",
      fileType: "",
      downloadUrl: "",
      regulator: "",
      description: "",
      views: 0
    });
    setShowDocumentModal(true);
  };
  
  // Handle create new news item
  const handleCreateNews = () => {
    setCurrentNewsItem({
      id: `news-${Date.now()}`,
      title: "",
      type: "news",
      status: "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "admin@bob.bw",
      summary: "",
      content: "",
      publishDate: new Date(),
      priority: "medium"
    });
    setShowNewsModal(true);
  };
  
  // Handle create new event
  const handleCreateEvent = () => {
    setCurrentEvent({
      id: `event-${Date.now()}`,
      title: "",
      type: "event",
      status: "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "admin@bob.bw",
      startDate: new Date(),
      endDate: new Date(),
      location: "",
      description: ""
    });
    setShowEventModal(true);
  };
  
  // Handle save document
  const handleSaveDocument = () => {
    if (!currentDocument) return;
    
    // Validate required fields
    if (!currentDocument.title || !currentDocument.regulator || !currentDocument.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if this is an update or create
    const isNewDocument = !documents.some(doc => doc.id === currentDocument.id);
    
    if (isNewDocument) {
      // Add to documents array
      setDocuments([currentDocument, ...documents]);
      
      // Add audit log entry
      const newLogEntry: AuditLogEntry = {
        id: `log-${Date.now()}`,
        action: "create",
        itemId: currentDocument.id,
        itemType: "document",
        itemTitle: currentDocument.title,
        timestamp: new Date(),
        user: "admin@bob.bw",
        details: "Created new document"
      };
      
      setAuditLog([newLogEntry, ...auditLog]);
      
      toast({
        title: "Document Created",
        description: "The document has been successfully created."
      });
    } else {
      // Update existing document
      setDocuments(documents.map(doc => 
        doc.id === currentDocument.id ? { ...currentDocument, updatedAt: new Date() } : doc
      ));
      
      // Add audit log entry
      const newLogEntry: AuditLogEntry = {
        id: `log-${Date.now()}`,
        action: "update",
        itemId: currentDocument.id,
        itemType: "document",
        itemTitle: currentDocument.title,
        timestamp: new Date(),
        user: "admin@bob.bw",
        details: "Updated document"
      };
      
      setAuditLog([newLogEntry, ...auditLog]);
      
      toast({
        title: "Document Updated",
        description: "The document has been successfully updated."
      });
    }
    
    // Close modal
    setShowDocumentModal(false);
    setCurrentDocument(null);
  };
  
  // Handle save news
  const handleSaveNews = () => {
    if (!currentNewsItem) return;
    
    // Validate required fields
    if (!currentNewsItem.title || !currentNewsItem.summary || !currentNewsItem.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if this is an update or create
    const isNewNews = !newsItems.some(news => news.id === currentNewsItem.id);
    
    if (isNewNews) {
      // Add to news array
      setNewsItems([currentNewsItem, ...newsItems]);
      
      // Add audit log entry
      const newLogEntry: AuditLogEntry = {
        id: `log-${Date.now()}`,
        action: "create",
        itemId: currentNewsItem.id,
        itemType: "news",
        itemTitle: currentNewsItem.title,
        timestamp: new Date(),
        user: "admin@bob.bw",
        details: `Created new news item (${currentNewsItem.status})`
      };
      
      setAuditLog([newLogEntry, ...auditLog]);
      
      toast({
        title: "News Item Created",
        description: "The news item has been successfully created."
      });
    } else {
      // Update existing news
      setNewsItems(newsItems.map(news => 
        news.id === currentNewsItem.id ? { ...currentNewsItem, updatedAt: new Date() } : news
      ));
      
      // Add audit log entry
      const newLogEntry: AuditLogEntry = {
        id: `log-${Date.now()}`,
        action: "update",
        itemId: currentNewsItem.id,
        itemType: "news",
        itemTitle: currentNewsItem.title,
        timestamp: new Date(),
        user: "admin@bob.bw",
        details: "Updated news item"
      };
      
      setAuditLog([newLogEntry, ...auditLog]);
      
      toast({
        title: "News Item Updated",
        description: "The news item has been successfully updated."
      });
    }
    
    // Close modal
    setShowNewsModal(false);
    setCurrentNewsItem(null);
  };
  
  // Handle save event
  const handleSaveEvent = () => {
    if (!currentEvent) return;
    
    // Validate required fields
    if (!currentEvent.title || !currentEvent.location || !currentEvent.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if end date is after start date
    if (currentEvent.endDate < currentEvent.startDate) {
      toast({
        title: "Invalid Dates",
        description: "End date must be after start date.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if this is an update or create
    const isNewEvent = !events.some(event => event.id === currentEvent.id);
    
    if (isNewEvent) {
      // Add to events array
      setEvents([currentEvent, ...events]);
      
      // Add audit log entry
      const newLogEntry: AuditLogEntry = {
        id: `log-${Date.now()}`,
        action: "create",
        itemId: currentEvent.id,
        itemType: "event",
        itemTitle: currentEvent.title,
        timestamp: new Date(),
        user: "admin@bob.bw",
        details: `Created new event (${currentEvent.status})`
      };
      
      setAuditLog([newLogEntry, ...auditLog]);
      
      toast({
        title: "Event Created",
        description: "The event has been successfully created."
      });
    } else {
      // Update existing event
      setEvents(events.map(event => 
        event.id === currentEvent.id ? { ...currentEvent, updatedAt: new Date() } : event
      ));
      
      // Add audit log entry
      const newLogEntry: AuditLogEntry = {
        id: `log-${Date.now()}`,
        action: "update",
        itemId: currentEvent.id,
        itemType: "event",
        itemTitle: currentEvent.title,
        timestamp: new Date(),
        user: "admin@bob.bw",
        details: "Updated event"
      };
      
      setAuditLog([newLogEntry, ...auditLog]);
      
      toast({
        title: "Event Updated",
        description: "The event has been successfully updated."
      });
    }
    
    // Close modal
    setShowEventModal(false);
    setCurrentEvent(null);
  };
  
  // Handle delete item
  const handleDeleteItem = (id: string, type: string, title: string) => {
    setItemToDelete({ id, type, title });
    setShowDeleteConfirm(true);
  };
  
  // Confirm delete
  const confirmDelete = () => {
    if (!itemToDelete) return;
    
    const { id, type, title } = itemToDelete;
    
    switch (type) {
      case "document":
        setDocuments(documents.filter(doc => doc.id !== id));
        break;
      case "news":
        setNewsItems(newsItems.filter(news => news.id !== id));
        break;
      case "event":
        setEvents(events.filter(event => event.id !== id));
        break;
    }
    
    // Add audit log entry
    const newLogEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      action: "delete",
      itemId: id,
      itemType: type as "document" | "news" | "event",
      itemTitle: title,
      timestamp: new Date(),
      user: "admin@bob.bw",
      details: `Deleted ${type}`
    };
    
    setAuditLog([newLogEntry, ...auditLog]);
    
    // Close dialog and reset
    setShowDeleteConfirm(false);
    setItemToDelete(null);
    
    toast({
      title: "Item Deleted",
      description: `The ${type} has been successfully deleted.`
    });
  };
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
      
      if (currentDocument) {
        const fileSize = (e.target.files[0].size / 1024 / 1024).toFixed(1) + " MB";
        const fileType = e.target.files[0].name.split('.').pop()?.toUpperCase() || "";
        
        setCurrentDocument({
          ...currentDocument,
          fileSize,
          fileType,
          downloadUrl: `/documents/${e.target.files[0].name}`
        });
      }
    }
  };
  
  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published": return "success";
      case "draft": return "secondary";
      case "archived": return "outline";
      default: return "secondary";
    }
  };
  
  // Get priority badge variant
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };
  
  // Get action color
  const getActionColor = (action: string) => {
    switch (action) {
      case "create": return "text-success";
      case "update": return "text-primary";
      case "delete": return "text-destructive";
      case "publish": return "text-success";
      case "archive": return "text-muted-foreground";
      default: return "text-primary";
    }
  };
  
  // Format date
  const formatDate = (date: Date) => {
    return format(date, "PPP");
  };
  
  // Format time
  const formatTime = (date: Date) => {
    return format(date, "p");
  };
  
  // Format date and time
  const formatDateTime = (date: Date) => {
    return format(date, "PPp");
  };
  
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Content Management
        </h1>
        <p className="text-muted-foreground">
          Manage all regulatory documents, news updates, and events in a centralized dashboard.
        </p>
      </div>
      
      {/* Content Tabs */}
      <Tabs defaultValue="documents" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="documents" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center">
              <Newspaper className="mr-2 h-4 w-4" />
              News
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Audit Log
            </TabsTrigger>
          </TabsList>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            {activeTab !== "audit" && (
              <>
                {/* Create New Button */}
                <Button 
                  onClick={() => {
                    switch (activeTab) {
                      case "documents": handleCreateDocument(); break;
                      case "news": handleCreateNews(); break;
                      case "events": handleCreateEvent(); break;
                    }
                  }}
                  className="flex items-center"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create New
                </Button>
                
                {/* Batch Operations */}
                {selectedItems.length > 0 && (
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={handleBatchPublish}
                      className="flex items-center"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Publish ({selectedItems.length})
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleBatchDelete}
                      className="flex items-center"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete ({selectedItems.length})
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Search and Filters */}
        {activeTab !== "audit" && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={`Search ${activeTab}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {allCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Documents Tab */}
        <TabsContent value="documents" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox 
                        checked={
                          filteredDocuments.length > 0 && 
                          filteredDocuments.every(doc => selectedItems.includes(doc.id))
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Regulator</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.length > 0 ? (
                    filteredDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedItems.includes(doc.id)}
                            onCheckedChange={(checked) => handleSelectItem(doc.id, !!checked)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            {doc.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {doc.fileSize} • {doc.fileType} • {doc.views} views
                          </div>
                        </TableCell>
                        <TableCell>{doc.regulator}</TableCell>
                        <TableCell>
                          {doc.category && (
                            <Badge variant="outline">{doc.category}</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadge(doc.status)}>
                            {doc.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{formatDate(doc.updatedAt)}</div>
                          <div className="text-xs text-muted-foreground">{formatTime(doc.updatedAt)}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleEditDocument(doc)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteItem(doc.id, "document", doc.title)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <FileText className="h-12 w-12 mb-2 opacity-20" />
                          <p>No documents found</p>
                          <p className="text-sm">Try adjusting your filters or search term</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* News Tab */}
        <TabsContent value="news" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox 
                        checked={
                          filteredNews.length > 0 && 
                          filteredNews.every(news => selectedItems.includes(news.id))
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Publish Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNews.length > 0 ? (
                    filteredNews.map((news) => (
                      <TableRow key={news.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedItems.includes(news.id)}
                            onCheckedChange={(checked) => handleSelectItem(news.id, !!checked)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Newspaper className="h-4 w-4 mr-2 text-muted-foreground" />
                            {news.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                            {news.summary}
                          </div>
                        </TableCell>
                        <TableCell>
                          {news.category && (
                            <Badge variant="outline">{news.category}</Badge>
                          )}
                        </TableCell>
                        <TableCell>{formatDate(news.publishDate)}</TableCell>
                        <TableCell>
                          <Badge variant={getPriorityBadge(news.priority)}>
                            {news.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadge(news.status)}>
                            {news.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleEditNews(news)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteItem(news.id, "news", news.title)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <Newspaper className="h-12 w-12 mb-2 opacity-20" />
                          <p>No news items found</p>
                          <p className="text-sm">Try adjusting your filters or search term</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Events Tab */}
        <TabsContent value="events" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox 
                        checked={
                          filteredEvents.length > 0 && 
                          filteredEvents.every(event => selectedItems.includes(event.id))
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedItems.includes(event.id)}
                            onCheckedChange={(checked) => handleSelectItem(event.id, !!checked)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            {event.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                            {event.description.substring(0, 60)}...
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{formatDate(event.startDate)}</div>
                          {!isSameDay(event.startDate, event.endDate) && (
                            <div className="text-xs text-muted-foreground">
                              to {formatDate(event.endDate)}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>
                          {event.category && (
                            <Badge variant="outline">{event.category}</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadge(event.status)}>
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleEditEvent(event)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                Preview
                              </DropdownMenuItem>
                              {event.registrationUrl && (
                                <DropdownMenuItem>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Registration Page
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteItem(event.id, "event", event.title)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <Calendar className="h-12 w-12 mb-2 opacity-20" />
                          <p>No events found</p>
                          <p className="text-sm">Try adjusting your filters or search term</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Audit Log Tab */}
        <TabsContent value="audit" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLog.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <div className="text-sm">{formatDate(entry.timestamp)}</div>
                        <div className="text-xs text-muted-foreground">{formatTime(entry.timestamp)}</div>
                      </TableCell>
                      <TableCell>{entry.user}</TableCell>
                      <TableCell>
                        <div className={`flex items-center ${getActionColor(entry.action)}`}>
                          {entry.action === "create" && <Plus className="h-4 w-4 mr-1" />}
                          {entry.action === "update" && <Edit className="h-4 w-4 mr-1" />}
                          {entry.action === "delete" && <Trash2 className="h-4 w-4 mr-1" />}
                          {entry.action === "publish" && <CheckCircle className="h-4 w-4 mr-1" />}
                          {entry.action === "archive" && <Archive className="h-4 w-4 mr-1" />}
                          <span className="capitalize">{entry.action}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {entry.itemType === "document" && <FileText className="h-4 w-4 mr-1 text-muted-foreground" />}
                          {entry.itemType === "news" && <Newspaper className="h-4 w-4 mr-1 text-muted-foreground" />}
                          {entry.itemType === "event" && <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />}
                          <span className="line-clamp-1">{entry.itemTitle}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <span className="capitalize">{entry.itemType}</span> ({entry.itemId})
                        </div>
                      </TableCell>
                      <TableCell>{entry.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Document Edit/Create Modal */}
      <Dialog open={showDocumentModal} onOpenChange={setShowDocumentModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {currentDocument && documents.some(doc => doc.id === currentDocument.id)
                ? "Edit Document"
                : "Add New Document"
              }
            </DialogTitle>
            <DialogDescription>
              {currentDocument && documents.some(doc => doc.id === currentDocument.id)
                ? "Update document details and metadata."
                : "Upload a new document and add relevant metadata."
              }
            </DialogDescription>
          </DialogHeader>
          
          {currentDocument && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="document-title">Title</Label>
                  <Input
                    id="document-title"
                    value={currentDocument.title}
                    onChange={(e) => setCurrentDocument({
                      ...currentDocument,
                      title: e.target.value
                    })}
                    placeholder="Enter document title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="document-regulator">Regulator</Label>
                  <Select
                    value={currentDocument.regulator}
                    onValueChange={(value) => setCurrentDocument({
                      ...currentDocument,
                      regulator: value
                    })}
                  >
                    <SelectTrigger id="document-regulator">
                      <SelectValue placeholder="Select regulator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bank of Botswana (BoB)">Bank of Botswana (BoB)</SelectItem>
                      <SelectItem value="Financial Intelligence Agency (FIA)">Financial Intelligence Agency (FIA)</SelectItem>
                      <SelectItem value="Non-Bank Financial Institutions Regulatory Authority (NBFIRA)">NBFIRA</SelectItem>
                      <SelectItem value="Botswana Stock Exchange (BSE)">Botswana Stock Exchange (BSE)</SelectItem>
                      <SelectItem value="Companies and Intellectual Property Authority (CIPA)">CIPA</SelectItem>
                      <SelectItem value="Botswana Unified Revenue Service (BURS)">BURS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="document-category">Category</Label>
                  <Select
                    value={currentDocument.category}
                    onValueChange={(value) => setCurrentDocument({
                      ...currentDocument,
                      category: value
                    })}
                  >
                    <SelectTrigger id="document-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Banking Regulation">Banking Regulation</SelectItem>
                      <SelectItem value="Anti-Money Laundering">Anti-Money Laundering</SelectItem>
                      <SelectItem value="Licensing">Licensing</SelectItem>
                      <SelectItem value="Risk Management">Risk Management</SelectItem>
                      <SelectItem value="Technology & Cybersecurity">Technology & Cybersecurity</SelectItem>
                      <SelectItem value="ESG Compliance">ESG Compliance</SelectItem>
                      <SelectItem value="Corporate Governance">Corporate Governance</SelectItem>
                      <SelectItem value="Consumer Protection">Consumer Protection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="document-status">Status</Label>
                  <Select
                    value={currentDocument.status}
                    onValueChange={(value: "draft" | "published" | "archived") => setCurrentDocument({
                      ...currentDocument,
                      status: value
                    })}
                  >
                    <SelectTrigger id="document-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="document-description">Description</Label>
                <Textarea
                  id="document-description"
                  value={currentDocument.description}
                  onChange={(e) => setCurrentDocument({
                    ...currentDocument,
                    description: e.target.value
                  })}
                  placeholder="Enter document description"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="document-tags">Tags</Label>
                <Input
                  id="document-tags"
                  value={currentDocument.tags?.join(", ") || ""}
                  onChange={(e) => setCurrentDocument({
                    ...currentDocument,
                    tags: e.target.value.split(",").map(tag => tag.trim()).filter(tag => tag)
                  })}
                  placeholder="Enter tags separated by commas"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="document-file">Document File</Label>
                <Input
                  id="document-file"
                  type="file"
                  accept=".pdf,.doc,.docx,.xlsx,.pptx"
                  onChange={handleFileChange}
                />
                {currentDocument.fileSize && currentDocument.fileType && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Current file: {currentDocument.fileSize} {currentDocument.fileType}
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDocumentModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDocument}>
              {currentDocument && documents.some(doc => doc.id === currentDocument.id)
                ? "Update Document"
                : "Save Document"
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* News Edit/Create Modal */}
      <Dialog open={showNewsModal} onOpenChange={setShowNewsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {currentNewsItem && newsItems.some(news => news.id === currentNewsItem.id)
                ? "Edit News Item"
                : "Add News Item"
              }
            </DialogTitle>
            <DialogDescription>
              {currentNewsItem && newsItems.some(news => news.id === currentNewsItem.id)
                ? "Update news item details and content."
                : "Create a new news item to publish on the portal."
              }
            </DialogDescription>
          </DialogHeader>
          
          {currentNewsItem && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="news-title">Title</Label>
                <Input
                  id="news-title"
                  value={currentNewsItem.title}
                  onChange={(e) => setCurrentNewsItem({
                    ...currentNewsItem,
                    title: e.target.value
                  })}
                  placeholder="Enter news title"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="news-category">Category</Label>
                  <Select
                    value={currentNewsItem.category}
                    onValueChange={(value) => setCurrentNewsItem({
                      ...currentNewsItem,
                      category: value
                    })}
                  >
                    <SelectTrigger id="news-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Banking Regulation">Banking Regulation</SelectItem>
                      <SelectItem value="Insurance">Insurance</SelectItem>
                      <SelectItem value="Capital Markets">Capital Markets</SelectItem>
                      <SelectItem value="Fraud Prevention">Fraud Prevention</SelectItem>
                      <SelectItem value="Regulatory Updates">Regulatory Updates</SelectItem>
                      <SelectItem value="Industry News">Industry News</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="news-priority">Priority</Label>
                  <Select
                    value={currentNewsItem.priority}
                    onValueChange={(value: "low" | "medium" | "high") => setCurrentNewsItem({
                      ...currentNewsItem,
                      priority: value
                    })}
                  >
                    <SelectTrigger id="news-priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="news-publish-date">Publish Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        id="news-publish-date"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {currentNewsItem.publishDate
                          ? format(currentNewsItem.publishDate, "PPP")
                          : "Select date"
                        }
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={currentNewsItem.publishDate}
                        onSelect={(date) => setCurrentNewsItem({
                          ...currentNewsItem,
                          publishDate: date || new Date()
                        })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="news-status">Status</Label>
                  <Select
                    value={currentNewsItem.status}
                    onValueChange={(value: "draft" | "published" | "archived") => setCurrentNewsItem({
                      ...currentNewsItem,
                      status: value
                    })}
                  >
                    <SelectTrigger id="news-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="news-summary">Summary</Label>
                <Textarea
                  id="news-summary"
                  value={currentNewsItem.summary}
                  onChange={(e) => setCurrentNewsItem({
                    ...currentNewsItem,
                    summary: e.target.value
                  })}
                  placeholder="Enter a brief summary of the news item"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="news-content">Content</Label>
                <Textarea
                  id="news-content"
                  value={currentNewsItem.content}
                  onChange={(e) => setCurrentNewsItem({
                    ...currentNewsItem,
                    content: e.target.value
                  })}
                  placeholder="Enter the full content of the news item"
                  rows={6}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="news-tags">Tags</Label>
                <Input
                  id="news-tags"
                  value={currentNewsItem.tags?.join(", ") || ""}
                  onChange={(e) => setCurrentNewsItem({
                    ...currentNewsItem,
                    tags: e.target.value.split(",").map(tag => tag.trim()).filter(tag => tag)
                  })}
                  placeholder="Enter tags separated by commas"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewsModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNews}>
              {currentNewsItem && newsItems.some(news => news.id === currentNewsItem.id)
                ? "Update News Item"
                : "Save News Item"
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Event Edit/Create Modal */}
      <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {currentEvent && events.some(event => event.id === currentEvent.id)
                ? "Edit Event"
                : "Add New Event"
              }
            </DialogTitle>
            <DialogDescription>
              {currentEvent && events.some(event => event.id === currentEvent.id)
                ? "Update event details and information."
                : "Create a new event to publish on the portal."
              }
            </DialogDescription>
          </DialogHeader>
          
          {currentEvent && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="event-title">Title</Label>
                <Input
                  id="event-title"
                  value={currentEvent.title}
                  onChange={(e) => setCurrentEvent({
                    ...currentEvent,
                    title: e.target.value
                  })}
                  placeholder="Enter event title"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-start-date">Start Date</Label>
                  <Popover>
                    <PopoverTrig