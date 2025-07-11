import { useState } from "react";
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Filter,
  Search,
  Eye,
  Settings,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Alert {
  id: string;
  title: string;
  description: string;
  type: "urgent" | "warning" | "info";
  regulator: string;
  date: string;
  status: "unread" | "read" | "acknowledged";
  priority: "high" | "medium" | "low";
}

const alerts: Alert[] = [
  {
    id: "1",
    title: "New AML Reporting Requirements",
    description: "Bank of Botswana has updated anti-money laundering reporting requirements effective immediately.",
    type: "urgent",
    regulator: "Bank of Botswana",
    date: "2025-01-15",
    status: "unread",
    priority: "high"
  },
  {
    id: "2",
    title: "Capital Adequacy Ratio Update",
    description: "NBFIRA announces changes to minimum capital adequacy ratios for insurance companies.",
    type: "warning",
    regulator: "NBFIRA",
    date: "2025-01-14",
    status: "read",
    priority: "medium"
  },
  {
    id: "3",
    title: "Market Conduct Guidelines",
    description: "New market conduct guidelines published for public consultation.",
    type: "info",
    regulator: "BSE",
    date: "2025-01-13",
    status: "acknowledged",
    priority: "low"
  }
];

export default function Alerts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "urgent": return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "warning": return <Clock className="h-5 w-5 text-warning" />;
      case "info": return <Bell className="h-5 w-5 text-bob-blue" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread": return <Badge variant="destructive">Unread</Badge>;
      case "read": return <Badge variant="secondary">Read</Badge>;
      case "acknowledged": return <Badge variant="outline"><CheckCircle className="h-3 w-3 mr-1" />Acknowledged</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || alert.type === filterType;
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Regulatory Alerts</h1>
          <p className="text-muted-foreground">
            Stay informed about regulatory changes and compliance requirements
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Alert Settings
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Alert
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Urgent Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Bell className="h-8 w-8 text-bob-blue" />
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">New This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Acknowledged</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="info">Information</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="acknowledged">Acknowledged</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Alerts List */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Alerts</TabsTrigger>
          <TabsTrigger value="unread">Unread ({alerts.filter(a => a.status === "unread").length})</TabsTrigger>
          <TabsTrigger value="urgent">Urgent ({alerts.filter(a => a.type === "urgent").length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {filteredAlerts.map((alert) => (
            <Card key={alert.id} className="hover:shadow-medium transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{alert.title}</h3>
                        {getStatusBadge(alert.status)}
                        <Badge variant="outline">{alert.priority}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{alert.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>From: {alert.regulator}</span>
                        <span>•</span>
                        <span>{new Date(alert.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {alert.status !== "acknowledged" && (
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Acknowledge
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="unread">
          {/* Unread alerts content */}
        </TabsContent>
        
        <TabsContent value="urgent">
          {/* Urgent alerts content */}
        </TabsContent>
      </Tabs>
    </div>
  );
}