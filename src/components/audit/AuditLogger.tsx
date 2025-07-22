import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Clock, 
  Download, 
  Filter, 
  Search, 
  User, 
  FileText, 
  LogIn, 
  LogOut, 
  Edit, 
  Trash2, 
  Eye, 
  Plus, 
  CheckCircle,
  X,
  Calendar,
  Newspaper,
  AlertTriangle,
  UploadCloud,
  RefreshCw,
  Lock,
  Settings,
  Save,
  MoreHorizontal,
  ArrowUpDown,
  ChevronDown,
  FileDown
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

// Types
export type AuditActionType = 
  | "login" 
  | "logout" 
  | "view" 
  | "create" 
  | "update" 
  | "delete" 
  | "download" 
  | "upload" 
  | "export" 
  | "import" 
  | "submit" 
  | "approve" 
  | "reject" 
  | "search" 
  | "filter" 
  | "generate" 
  | "print" 
  | "share" 
  | "access_denied" 
  | "password_change" 
  | "settings_change"
  | "system";

export type ResourceType = 
  | "document" 
  | "user" 
  | "news" 
  | "event" 
  | "checklist" 
  | "report" 
  | "form" 
  | "template" 
  | "profile" 
  | "dashboard" 
  | "settings" 
  | "system"
  | "page";

export type SeverityLevel = "info" | "warning" | "error" | "critical";

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  userId: string;
  userName: string;
  userRole?: string;
  action: AuditActionType;
  resourceType: ResourceType;
  resourceId?: string;
  resourceName?: string;
  description: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  severity: SeverityLevel;
  success: boolean;
  duration?: number; // in milliseconds
  tags?: string[];
}

interface AuditContextType {
  logs: AuditLogEntry[];
  addLogEntry: (entry: Omit<AuditLogEntry, "id" | "timestamp" | "userId" | "userName" | "userRole">) => void;
  clearLogs: () => void;
  getLogsByUser: (userId: string) => AuditLogEntry[];
  getLogsByAction: (action: AuditActionType) => AuditLogEntry[];
  getLogsByResource: (resourceType: ResourceType, resourceId?: string) => AuditLogEntry[];
  getLogsBySeverity: (severity: SeverityLevel) => AuditLogEntry[];
  getLogsByTimeRange: (startDate: Date, endDate: Date) => AuditLogEntry[];
  getRecentLogs: (count: number) => AuditLogEntry[];
  exportLogs: (format: "csv" | "json") => void;
}

// Default mock data for initial state
const defaultLogs: AuditLogEntry[] = [
  {
    id: "log-1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    userId: "user-1",
    userName: "admin@bob.bw",
    userRole: "Administrator",
    action: "login",
    resourceType: "system",
    description: "User logged in successfully",
    severity: "info",
    success: true,
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "log-2",
    timestamp: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
    userId: "user-1",
    userName: "admin@bob.bw",
    userRole: "Administrator",
    action: "view",
    resourceType: "document",
    resourceId: "doc-1",
    resourceName: "Banking Act Amendment 2025",
    description: "User viewed document",
    severity: "info",
    success: true,
  },
  {
    id: "log-3",
    timestamp: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
    userId: "user-1",
    userName: "admin@bob.bw",
    userRole: "Administrator",
    action: "update",
    resourceType: "document",
    resourceId: "doc-1",
    resourceName: "Banking Act Amendment 2025",
    description: "User updated document metadata",
    details: {
      changes: {
        title: {
          from: "Banking Act Amendment Draft",
          to: "Banking Act Amendment 2025"
        },
        status: {
          from: "draft",
          to: "published"
        }
      }
    },
    severity: "info",
    success: true,
  },
  {
    id: "log-4",
    timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
    userId: "user-2",
    userName: "compliance.officer@fintech.co.bw",
    userRole: "Compliance Officer",
    action: "generate",
    resourceType: "checklist",
    resourceId: "checklist-1",
    resourceName: "Compliance Checklist Q1 2025",
    description: "User generated compliance checklist",
    severity: "info",
    success: true,
  },
  {
    id: "log-5",
    timestamp: new Date(Date.now() - 1000 * 60 * 1), // 1 minute ago
    userId: "user-3",
    userName: "user@fintech.co.bw",
    userRole: "General User",
    action: "download",
    resourceType: "document",
    resourceId: "doc-2",
    resourceName: "AML/CFT Guidelines 2024",
    description: "User downloaded document",
    severity: "info",
    success: true,
  },
  {
    id: "log-6",
    timestamp: new Date(Date.now() - 1000 * 30), // 30 seconds ago
    userId: "user-2",
    userName: "compliance.officer@fintech.co.bw",
    userRole: "Compliance Officer",
    action: "access_denied",
    resourceType: "settings",
    description: "User attempted to access admin settings",
    severity: "warning",
    success: false,
  },
  {
    id: "log-7",
    timestamp: new Date(),
    userId: "system",
    userName: "System",
    action: "system",
    resourceType: "system",
    description: "Daily compliance report generated",
    severity: "info",
    success: true,
  }
];

// Create Context
const AuditContext = createContext<AuditContextType | undefined>(undefined);

// Provider Component
export function AuditProvider({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<AuditLogEntry[]>(defaultLogs);
  const { user } = useAuth();
  
  // Function to add a new log entry
  const addLogEntry = (
    entry: Omit<AuditLogEntry, "id" | "timestamp" | "userId" | "userName" | "userRole">
  ) => {
    const newEntry: AuditLogEntry = {
      ...entry,
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      userId: user?.id || "anonymous",
      userName: user?.email || "Anonymous User",
      userRole: user?.role || "Guest",
      ipAddress: entry.ipAddress || "127.0.0.1", // In a real app, this would be captured
      userAgent: entry.userAgent || navigator.userAgent,
    };
    
    setLogs(prevLogs => [newEntry, ...prevLogs]);
    
    // In a real application, this would also send the log to a server
    // sendLogToServer(newEntry);
    
    return newEntry;
  };
  
  // Function to clear all logs (mainly for testing)
  const clearLogs = () => {
    setLogs([]);
  };
  
  // Function to get logs by user
  const getLogsByUser = (userId: string) => {
    return logs.filter(log => log.userId === userId);
  };
  
  // Function to get logs by action type
  const getLogsByAction = (action: AuditActionType) => {
    return logs.filter(log => log.action === action);
  };
  
  // Function to get logs by resource
  const getLogsByResource = (resourceType: ResourceType, resourceId?: string) => {
    return logs.filter(log => 
      log.resourceType === resourceType && 
      (resourceId ? log.resourceId === resourceId : true)
    );
  };
  
  // Function to get logs by severity
  const getLogsBySeverity = (severity: SeverityLevel) => {
    return logs.filter(log => log.severity === severity);
  };
  
  // Function to get logs within a time range
  const getLogsByTimeRange = (startDate: Date, endDate: Date) => {
    return logs.filter(log => 
      log.timestamp >= startDate && 
      log.timestamp <= endDate
    );
  };
  
  // Function to get the most recent logs
  const getRecentLogs = (count: number) => {
    return logs.slice(0, count);
  };
  
  // Function to export logs
  const exportLogs = (format: "csv" | "json") => {
    if (format === "csv") {
      // Convert logs to CSV
      const headers = "ID,Timestamp,User ID,User Name,User Role,Action,Resource Type,Resource ID,Resource Name,Description,Severity,Success\n";
      const csvContent = logs.reduce((acc, log) => {
        return acc + [
          log.id,
          log.timestamp.toISOString(),
          log.userId,
          log.userName,
          log.userRole || "",
          log.action,
          log.resourceType,
          log.resourceId || "",
          log.resourceName || "",
          `"${log.description.replace(/"/g, '""')}"`, // Escape quotes
          log.severity,
          log.success
        ].join(",") + "\n";
      }, headers);
      
      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `audit_logs_${format_date(new Date())}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // JSON format
      const jsonContent = JSON.stringify(logs, null, 2);
      const blob = new Blob([jsonContent], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `audit_logs_${format_date(new Date())}.json`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  // Helper function to format date for filenames
  const format_date = (date: Date) => {
    return date.toISOString().split("T")[0];
  };
  
  // Register page views automatically
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      const pageName = path === "/" ? "Home" : path.split("/").pop()?.charAt(0).toUpperCase() + path.split("/").pop()?.slice(1);
      
      if (pageName && user) {
        addLogEntry({
          action: "view",
          resourceType: "page",
          resourceName: pageName,
          description: `User viewed ${pageName} page`,
          severity: "info",
          success: true
        });
      }
    };
    
    // Call once on mount
    handleRouteChange();
    
    // In a real app with a router, you would listen to route changes
    // For example with React Router:
    // return history.listen(handleRouteChange);
    
    // Cleanup function
    return () => {
      // Cleanup if needed
    };
  }, [user]);
  
  const contextValue: AuditContextType = {
    logs,
    addLogEntry,
    clearLogs,
    getLogsByUser,
    getLogsByAction,
    getLogsByResource,
    getLogsBySeverity,
    getLogsByTimeRange,
    getRecentLogs,
    exportLogs
  };
  
  return (
    <AuditContext.Provider value={contextValue}>
      {children}
    </AuditContext.Provider>
  );
}

// Custom hook to use the audit context
export function useAudit() {
  const context = useContext(AuditContext);
  if (context === undefined) {
    throw new Error("useAudit must be used within an AuditProvider");
  }
  return context;
}

// Helper functions for common audit actions
export const AuditActions = {
  logLogin: (success: boolean, details?: Record<string, any>) => {
    const { addLogEntry } = useAudit();
    return addLogEntry({
      action: "login",
      resourceType: "system",
      description: success ? "User logged in successfully" : "Login attempt failed",
      severity: success ? "info" : "warning",
      success,
      details
    });
  },
  
  logLogout: () => {
    const { addLogEntry } = useAudit();
    return addLogEntry({
      action: "logout",
      resourceType: "system",
      description: "User logged out",
      severity: "info",
      success: true
    });
  },
  
  logDocumentView: (documentId: string, documentName: string) => {
    const { addLogEntry } = useAudit();
    return addLogEntry({
      action: "view",
      resourceType: "document",
      resourceId: documentId,
      resourceName: documentName,
      description: `User viewed document: ${documentName}`,
      severity: "info",
      success: true
    });
  },
  
  logDocumentDownload: (documentId: string, documentName: string) => {
    const { addLogEntry } = useAudit();
    return addLogEntry({
      action: "download",
      resourceType: "document",
      resourceId: documentId,
      resourceName: documentName,
      description: `User downloaded document: ${documentName}`,
      severity: "info",
      success: true
    });
  },
  
  logDocumentCreate: (documentId: string, documentName: string, details?: Record<string, any>) => {
    const { addLogEntry } = useAudit();
    return addLogEntry({
      action: "create",
      resourceType: "document",
      resourceId: documentId,
      resourceName: documentName,
      description: `User created document: ${documentName}`,
      severity: "info",
      success: true,
      details
    });
  },
  
  logDocumentUpdate: (documentId: string, documentName: string, details?: Record<string, any>) => {
    const { addLogEntry } = useAudit();
    return addLogEntry({
      action: "update",
      resourceType: "document",
      resourceId: documentId,
      resourceName: documentName,
      description: `User updated document: ${documentName}`,
      severity: "info",
      success: true,
      details
    });
  },
  
  logDocumentDelete: (documentId: string, documentName: string) => {
    const { addLogEntry } = useAudit();
    return addLogEntry({
      action: "delete",
      resourceType: "document",
      resourceId: documentId,
      resourceName: documentName,
      description: `User deleted document: ${documentName}`,
      severity: "warning",
      success: true
    });
  },
  
  logChecklistGenerate: (checklistId: string, checklistName: string) => {
    const { addLogEntry } = useAudit();
    return addLogEntry({
      action: "generate",
      resourceType: "checklist",
      resourceId: checklistId,
      resourceName: checklistName,
      description: `User generated checklist: ${checklistName}`,
      severity: "info",
      success: true
    });
  },
  
  logFormSubmit: (formId: string, formName: string, success: boolean, details?: Record<string, any>) => {
    const { addLogEntry } = useAudit();
    return addLogEntry({
      action: "submit",
      resourceType: "form",
      resourceId: formId,
      resourceName: formName,
      description: `User submitted form: ${formName}`,
      severity: success ? "info" : "warning",
      success,
      details
    });
  },
  
  logAccessDenied: (resourceType: ResourceType, resourceName?: string) => {
    const { addLogEntry } = useAudit();
    return addLogEntry({
      action: "access_denied",
      resourceType,
      resourceName,
      description: `Access denied to ${resourceType}${resourceName ? `: ${resourceName}` : ''}`,
      severity: "warning",
      success: false
    });
  },
  
  logSearch: (query: string, resourceType?: ResourceType, resultCount?: number) => {
    const { addLogEntry } = useAudit();
    return addLogEntry({
      action: "search",
      resourceType: resourceType || "system",
      description: `User searched for: "${query}"`,
      severity: "info",
      success: true,
      details: {
        query,
        resultCount
      }
    });
  },
  
  logSettingsChange: (settingName: string, oldValue: any, newValue: any) => {
    const { addLogEntry } = useAudit();
    return addLogEntry({
      action: "settings_change",
      resourceType: "settings",
      resourceName: settingName,
      description: `User changed setting: ${settingName}`,
      severity: "info",
      success: true,
      details: {
        changes: {
          [settingName]: {
            from: oldValue,
            to: newValue
          }
        }
      }
    });
  }
};

// Audit Log Viewer Component
interface AuditLogViewerProps {
  defaultPageSize?: number;
  showFilters?: boolean;
  showExport?: boolean;
  height?: string;
  title?: string;
  description?: string;
}

export function AuditLogViewer({
  defaultPageSize = 10,
  showFilters = true,
  showExport = true,
  height = "600px",
  title = "Audit Log",
  description = "Track all user and system activities"
}: AuditLogViewerProps) {
  const { logs, exportLogs } = useAudit();
  const [filteredLogs, setFilteredLogs] = useState<AuditLogEntry[]>(logs);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState<AuditActionType | "all">("all");
  const [resourceFilter, setResourceFilter] = useState<ResourceType | "all">("all");
  const [severityFilter, setSeverityFilter] = useState<SeverityLevel | "all">("all");
  const [userFilter, setUserFilter] = useState<string | "all">("all");
  const [successFilter, setSuccessFilter] = useState<"all" | "success" | "failure">("all");
  const [dateRange, setDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);
  const [sortField, setSortField] = useState<keyof AuditLogEntry>("timestamp");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [showDateFilter, setShowDateFilter] = useState(false);
  
  // Get unique users from logs
  const uniqueUsers = Array.from(new Set(logs.map(log => log.userName)));
  
  // Apply filters and search
  useEffect(() => {
    let result = [...logs];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(log => 
        log.description.toLowerCase().includes(query) ||
        (log.resourceName && log.resourceName.toLowerCase().includes(query)) ||
        log.userName.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.resourceType.toLowerCase().includes(query)
      );
    }
    
    // Apply action filter
    if (actionFilter !== "all") {
      result = result.filter(log => log.action === actionFilter);
    }
    
    // Apply resource filter
    if (resourceFilter !== "all") {
      result = result.filter(log => log.resourceType === resourceFilter);
    }
    
    // Apply severity filter
    if (severityFilter !== "all") {
      result = result.filter(log => log.severity === severityFilter);
    }
    
    // Apply user filter
    if (userFilter !== "all") {
      result = result.filter(log => log.userName === userFilter);
    }
    
    // Apply success filter
    if (successFilter !== "all") {
      result = result.filter(log => 
        successFilter === "success" ? log.success : !log.success
      );
    }
    
    // Apply date range filter
    if (dateRange.from) {
      result = result.filter(log => log.timestamp >= dateRange.from!);
    }
    if (dateRange.to) {
      // Include the entire day by setting time to 23:59:59
      const endDate = new Date(dateRange.to);
      endDate.setHours(23, 59, 59, 999);
      result = result.filter(log => log.timestamp <= endDate);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortDirection === "asc" 
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
    
    setFilteredLogs(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    logs, 
    searchQuery, 
    actionFilter, 
    resourceFilter, 
    severityFilter, 
    userFilter, 
    successFilter, 
    dateRange,
    sortField,
    sortDirection
  ]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredLogs.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);
  
  // Handle sort
  const handleSort = (field: keyof AuditLogEntry) => {
    if (field === sortField) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field, default to descending
      setSortField(field);
      setSortDirection("desc");
    }
  };
  
  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLogs(currentLogs.map(log => log.id));
    } else {
      setSelectedLogs([]);
    }
  };
  
  // Handle select single log
  const handleSelectLog = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedLogs([...selectedLogs, id]);
    } else {
      setSelectedLogs(selectedLogs.filter(logId => logId !== id));
    }
  };
  
  // Handle export selected
  const handleExportSelected = (format: "csv" | "json") => {
    if (selectedLogs.length === 0) {
      toast({
        title: "No logs selected",
        description: "Please select at least one log entry to export",
        variant: "destructive"
      });
      return;
    }
    
    // Filter logs to only selected ones
    const selectedLogEntries = logs.filter(log => selectedLogs.includes(log.id));
    
    if (format === "csv") {
      // Convert logs to CSV
      const headers = "ID,Timestamp,User ID,User Name,User Role,Action,Resource Type,Resource ID,Resource Name,Description,Severity,Success\n";
      const csvContent = selectedLogEntries.reduce((acc, log) => {
        return acc + [
          log.id,
          log.timestamp.toISOString(),
          log.userId,
          log.userName,
          log.userRole || "",
          log.action,
          log.resourceType,
          log.resourceId || "",
          log.resourceName || "",
          `"${log.description.replace(/"/g, '""')}"`, // Escape quotes
          log.severity,
          log.success
        ].join(",") + "\n";
      }, headers);
      
      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `selected_audit_logs_${format_date(new Date())}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // JSON format
      const jsonContent = JSON.stringify(selectedLogEntries, null, 2);
      const blob = new Blob([jsonContent], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `selected_audit_logs_${format_date(new Date())}.json`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    toast({
      title: "Export Complete",
      description: `${selectedLogs.length} log entries exported as ${format.toUpperCase()}`
    });
  };
  
  // Helper function to format date for filenames
  const format_date = (date: Date) => {
    return date.toISOString().split("T")[0];
  };
  
  // Get icon for action type
  const getActionIcon = (action: AuditActionType) => {
    switch (action) {
      case "login": return <LogIn className="h-4 w-4" />;
      case "logout": return <LogOut className="h-4 w-4" />;
      case "view": return <Eye className="h-4 w-4" />;
      case "create": return <Plus className="h-4 w-4" />;
      case "update": return <Edit className="h-4 w-4" />;
      case "delete": return <Trash2 className="h-4 w-4" />;
      case "download": return <Download className="h-4 w-4" />;
      case "upload": return <UploadCloud className="h-4 w-4" />;
      case "export": return <FileDown className="h-4 w-4" />;
      case "import": return <FileUp className="h-4 w-4" />;
      case "submit": return <CheckCircle className="h-4 w-4" />;
      case "search": return <Search className="h-4 w-4" />;
      case "filter": return <Filter className="h-4 w-4" />;
      case "generate": return <RefreshCw className="h-4 w-4" />;
      case "access_denied": return <X className="h-4 w-4" />;
      case "password_change": return <Lock className="h-4 w-4" />;
      case "settings_change": return <Settings className="h-4 w-4" />;
      case "system": return <Settings className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };
  
  // Get icon for resource type
  const getResourceIcon = (resourceType: ResourceType) => {
    switch (resourceType) {
      case "document": return <FileText className="h-4 w-4" />;
      case "user": return <User className="h-4 w-4" />;
      case "news": return <Newspaper className="h-4 w-4" />;
      case "event": return <Calendar className="h-4 w-4" />;
      case "checklist": return <CheckCircle className="h-4 w-4" />;
      case "report": return <BarChart className="h-4 w-4" />;
      case "form": return <FileText className="h-4 w-4" />;
      case "template": return <FileText className="h-4 w-4" />;
      case "profile": return <User className="h-4 w-4" />;
      case "settings": return <Settings className="h-4 w-4" />;
      case "system": return <Settings className="h-4 w-4" />;
      case "page": return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };
  
  // Get severity badge variant
  const getSeverityBadge = (severity: SeverityLevel) => {
    switch (severity) {
      case "info": return "secondary";
      case "warning": return "warning";
      case "error": return "destructive";
      case "critical": return "destructive";
      default: return "secondary";
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
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        {showFilters && (
          <div className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search logs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={actionFilter} onValueChange={(value: any) => setActionFilter(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Action Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="logout">Logout</SelectItem>
                  <SelectItem value="view">View</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="download">Download</SelectItem>
                  <SelectItem value="upload">Upload</SelectItem>
                  <SelectItem value="generate">Generate</SelectItem>
                  <SelectItem value="submit">Submit</SelectItem>
                  <SelectItem value="access_denied">Access Denied</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={resourceFilter} onValueChange={(value: any) => setResourceFilter(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Resource Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Resources</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="checklist">Checklist</SelectItem>
                  <SelectItem value="report">Report</SelectItem>
                  <SelectItem value="form">Form</SelectItem>
                  <SelectItem value="page">Page</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover open={showDateFilter} onOpenChange={setShowDateFilter}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      "Date Range"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                  <div className="flex items-center justify-between px-4 py-2 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDateRange({});
                        setShowDateFilter(false);
                      }}
                    >
                      Clear
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setShowDateFilter(false)}
                    >
                      Apply
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={severityFilter} onValueChange={(value: any) => setSeverityFilter(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="User" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {uniqueUsers.map(user => (
                    <SelectItem key={user} value={user}>
                      {user}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={successFilter} onValueChange={(value: any) => setSuccessFilter(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failure">Failure</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex-1 flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setActionFilter("all");
                    setResourceFilter("all");
                    setSeverityFilter("all");
                    setUserFilter("all");
                    setSuccessFilter("all");
                    setDateRange({});
                  }}
                >
                  Clear Filters
                </Button>
                
                {showExport && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => exportLogs("csv")}>
                        Export All as CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => exportLogs("json")}>
                        Export All as JSON
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleExportSelected("csv")}>
                        Export Selected as CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExportSelected("json")}>
                        Export Selected as JSON
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Log Table */}
        <div className={`border rounded-md overflow-hidden`} style={{ height }}>
          <ScrollArea className="h-full">
            <Table>
              <TableHeader className="sticky top-0 bg-background">
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox 
                      checked={
                        currentLogs.length > 0 && 
                        currentLogs.every(log => selectedLogs.includes(log.id))
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead 
                    className="w-[160px] cursor-pointer"
                    onClick={() => handleSort("timestamp")}
                  >
                    <div className="flex items-center">
                      Timestamp
                      {sortField === "timestamp" && (
                        <ChevronDown className={cn(
                          "ml-1 h-4 w-4",
                          sortDirection === "asc" && "rotate-180"
                        )} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("userName")}
                  >
                    <div className="flex items-center">
                      User
                      {sortField === "userName" && (
                        <ChevronDown className={cn(
                          "ml-1 h-4 w-4",
                          sortDirection === "asc" && "rotate-180"
                        )} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("action")}
                  >
                    <div className="flex items-center">
                      Action
                      {sortField === "action" && (
                        <ChevronDown className={cn(
                          "ml-1 h-4 w-4",
                          sortDirection === "asc" && "rotate-180"
                        )} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("severity")}
                  >
                    <div className="flex items-center">
                      Severity
                      {sortField === "severity" && (
                        <ChevronDown className={cn(
                          "ml-1 h-4 w-4",
                          sortDirection === "asc" && "rotate-180"
                        )} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentLogs.length > 0 ? (
                  currentLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedLogs.includes(log.id)}
                          onCheckedChange={(checked) => handleSelectLog(log.id, !!checked)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{formatDate(log.timestamp)}</div>
                        <div className="text-xs text-muted-foreground">{formatTime(log.timestamp)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{log.userName}</span>
                        </div>
                        {log.userRole && (
                          <div className="text-xs text-muted-foreground ml-6">
                            {log.userRole}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="mr-2">{getActionIcon(log.action)}</span>
                          <span className="capitalize">{log.action.replace(/_/g, ' ')}</span>
                        </div>
                        <div className="text-xs text-muted-foreground ml-6">
                          {log.success ? "Success" : "Failed"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="mr-2">{getResourceIcon(log.resourceType)}</span>
                          <span className="capitalize">{log.resourceType.replace(/_/g, ' ')}</span>
                        </div>
                        {log.resourceName && (
                          <div className="text-xs text-muted-foreground ml-6 truncate max-w-[150px]">
                            {log.resourceName}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="truncate max-w-[200px]">
                          {log.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getSeverityBadge(log.severity)}>
                          {log.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              View Details
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Clock className="h-12 w-12 mb-2 opacity-20" />
                        <p>No log entries found</p>
                        <p className="text-sm">Try adjusting your filters or search term</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredLogs.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, filteredLogs.length)} of {filteredLogs.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm mx-2">
              Page {currentPage} of {totalPages || 1}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Last
            </Button>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                setPageSize(parseInt(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Page Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 / page</SelectItem>
                <SelectItem value="25">25 / page</SelectItem>
                <SelectItem value="50">50 / page</SelectItem>
                <SelectItem value="100">100 / page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Recent Activity Component (simplified version of AuditLogViewer)
interface RecentActivityProps {
  limit?: number;
  showTitle?: boolean;
  height?: string;
}

export function RecentActivity({ 
  limit = 5, 
  showTitle = true,
  height = "auto"
}: RecentActivityProps) {
  const { logs } = useAudit();
  const recentLogs = logs.slice(0, limit);
  
  // Get icon for action type
  const getActionIcon = (action: AuditActionType) => {
    switch (action) {
      case "login": return <LogIn className="h-4 w-4" />;
      case "logout": return <LogOut className="h-4 w-4" />;
      case "view": return <Eye className="h-4 w-4" />;
      case "create": return <Plus className="h-4 w-4" />;
      case "update": return <Edit className="h-4 w-4" />;
      case "delete": return <Trash2 className="h-4 w-4" />;
      case "download": return <Download className="h-4 w-4" />;
      case "upload": return <UploadCloud className="h-4 w-4" />;
      case "generate": return <RefreshCw className="h-4 w-4" />;
      case "access_denied": return <X className="h-4 w-4" />;
      case "system": return <Settings className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };
  
  // Get severity class
  const getSeverityClass = (severity: SeverityLevel) => {
    switch (severity) {
      case "info": return "text-primary";
      case "warning": return "text-warning";
      case "error": return "text-destructive";
      case "critical": return "text-destructive";
      default: return "text-primary";
    }
  };
  
  // Format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffSec < 60) return `${diffSec} seconds ago`;
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    
    return format(date, "MMM d, yyyy");
  };
  
  return (
    <Card className="bg-gradient-card shadow-soft">
      {showTitle && (
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-4" style={{ height }}>
        {recentLogs.length > 0 ? (
          recentLogs.map((log) => (
            <div 
              key={log.id}
              className="flex items-start space-x-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-smooth cursor-pointer"
            >
              <div className={`mt-1 ${getSeverityClass(log.severity)}`}>
                {getActionIcon(log.action)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {log.resourceName || log.description}
                  </h4>
                  <Badge variant={log.success ? "secondary" : "destructive"} className="ml-2 text-xs">
                    {log.success ? "Success" : "Failed"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {log.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{log.userName}</span>
                  <span>{formatRelativeTime(log.timestamp)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p>No recent activity</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Helper function to format date for filenames
function format_date(date: Date) {
  return date.toISOString().split("T")[0];
}

// Helper component for BarChart icon
function BarChart({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}

// Helper function to check if two dates are the same day
function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
