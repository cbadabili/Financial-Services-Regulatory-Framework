import { useState } from "react";
import { CheckCircle, Clock, AlertTriangle, Plus, Filter, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const complianceTasks = [
  {
    id: 1,
    title: "Capital Adequacy Assessment",
    description: "Review and update capital adequacy ratios for Q1 2025",
    regulator: "Bank of Botswana",
    dueDate: "2025-03-31",
    priority: "High",
    status: "In Progress",
    progress: 65,
    assignee: "Risk Management Team",
    checklist: [
      { item: "Collect financial data", completed: true },
      { item: "Calculate ratios", completed: true },
      { item: "Risk assessment", completed: false },
      { item: "Submit report", completed: false }
    ]
  },
  {
    id: 2,
    title: "AML Transaction Monitoring Review",
    description: "Enhanced monitoring procedures for high-risk transactions",
    regulator: "Financial Intelligence Agency",
    dueDate: "2025-02-15",
    priority: "Critical",
    status: "Pending",
    progress: 25,
    assignee: "Compliance Team",
    checklist: [
      { item: "Review monitoring criteria", completed: true },
      { item: "Update detection rules", completed: false },
      { item: "Test monitoring system", completed: false },
      { item: "Staff training", completed: false }
    ]
  },
  {
    id: 3,
    title: "ESG Reporting Preparation",
    description: "Prepare comprehensive ESG disclosure report",
    regulator: "Botswana Stock Exchange",
    dueDate: "2025-04-30",
    priority: "Medium",
    status: "Not Started",
    progress: 0,
    assignee: "Sustainability Team",
    checklist: [
      { item: "Data collection framework", completed: false },
      { item: "Environmental metrics", completed: false },
      { item: "Social impact assessment", completed: false },
      { item: "Governance review", completed: false }
    ]
  }
];

const templates = [
  {
    id: 1,
    name: "Risk Assessment Template",
    description: "Standard template for quarterly risk assessments",
    regulator: "NBFIRA",
    category: "Risk Management",
    downloads: 234
  },
  {
    id: 2,
    name: "AML Compliance Checklist",
    description: "Comprehensive checklist for AML compliance review",
    regulator: "Financial Intelligence Agency",
    category: "Anti-Money Laundering",
    downloads: 456
  },
  {
    id: 3,
    name: "Capital Adequacy Calculator",
    description: "Excel template for calculating capital ratios",
    regulator: "Bank of Botswana",
    category: "Capital Management",
    downloads: 189
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Critical": return "destructive";
    case "High": return "default";
    case "Medium": return "secondary";
    case "Low": return "outline";
    default: return "secondary";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed": return "secondary";
    case "In Progress": return "default";
    case "Pending": return "outline";
    case "Not Started": return "outline";
    default: return "secondary";
  }
};

export default function Compliance() {
  const [activeTab, setActiveTab] = useState("tasks");

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Compliance Center
        </h1>
        <p className="text-muted-foreground">
          Manage compliance tasks, track progress, and access regulatory templates and tools.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Plus className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold text-foreground">15</p>
                <p className="text-sm text-muted-foreground">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="tasks">Compliance Tasks</TabsTrigger>
            <TabsTrigger value="templates">Templates & Tools</TabsTrigger>
            <TabsTrigger value="assessments">Self-Assessments</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => alert('Opening filter options...')}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" onClick={() => alert('Creating new compliance task...')}>
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>

        <TabsContent value="tasks" className="space-y-4">
          {complianceTasks.map((task) => (
            <Card key={task.id} className="shadow-soft hover:shadow-medium transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {task.title}
                      </h3>
                      <Badge variant={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge variant={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {task.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Regulator: {task.regulator}</span>
                      <span>•</span>
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Assignee: {task.assignee}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => alert(`Viewing details for: ${task.title}`)}>
                    View Details
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                  
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {task.checklist.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className={`h-4 w-4 ${item.completed ? 'text-success' : 'text-muted-foreground'}`} />
                        <span className={item.completed ? 'text-foreground' : 'text-muted-foreground'}>
                          {item.item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="shadow-soft hover:shadow-medium transition-smooth">
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Regulator:</span>
                      <span className="text-foreground">{template.regulator}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="text-foreground">{template.category}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Downloads:</span>
                      <span className="text-foreground">{template.downloads}</span>
                    </div>
                  </div>
                  <Button className="w-full" size="sm" onClick={() => alert(`Downloading template: ${template.name}`)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-4">
          <Card className="shadow-soft">
            <CardContent className="p-6 text-center">
              <div className="max-w-md mx-auto">
                <CheckCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Self-Assessment Tools
                </h3>
                <p className="text-muted-foreground mb-6">
                  Interactive compliance assessment tools and checklists will be available here to help you evaluate your regulatory compliance status.
                </p>
                <Button onClick={() => alert('Starting compliance self-assessment...')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Start Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}