import { Clock, FileText, AlertTriangle, CheckCircle, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    type: "regulation_update",
    title: "Banking Act Amendment 2025",
    description: "BoB updated capital requirements for commercial banks",
    time: "2 hours ago",
    icon: AlertTriangle,
    iconColor: "text-warning",
    source: "Bank of Botswana",
    priority: "high"
  },
  {
    id: 2,
    type: "compliance_due",
    title: "Quarterly Risk Assessment Due",
    description: "Submit Q4 2024 risk assessment to NBFIRA",
    time: "1 day ago",
    icon: Clock,
    iconColor: "text-destructive",
    source: "NBFIRA",
    priority: "urgent"
  },
  {
    id: 3,
    type: "document_upload",
    title: "AML Policy Updated",
    description: "New anti-money laundering guidelines uploaded",
    time: "3 days ago",
    icon: Upload,
    iconColor: "text-success",
    source: "Financial Intelligence Agency",
    priority: "medium"
  },
  {
    id: 4,
    type: "compliance_complete",
    title: "Stress Testing Completed",
    description: "Annual stress testing requirements fulfilled",
    time: "1 week ago",
    icon: CheckCircle,
    iconColor: "text-success",
    source: "Bank of Botswana",
    priority: "low"
  },
  {
    id: 5,
    type: "regulation_new",
    title: "ESG Reporting Framework",
    description: "New environmental and social governance guidelines",
    time: "1 week ago",
    icon: FileText,
    iconColor: "text-primary",
    source: "Botswana Stock Exchange",
    priority: "medium"
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent": return "destructive";
    case "high": return "default";
    case "medium": return "secondary";
    case "low": return "outline";
    default: return "secondary";
  }
};

export function RecentActivity() {
  return (
    <Card className="bg-gradient-card shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className="flex items-start space-x-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-smooth cursor-pointer"
          >
            <div className={`mt-1 ${activity.iconColor}`}>
              <activity.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {activity.title}
                </h4>
                <Badge variant={getPriorityColor(activity.priority)} className="ml-2 text-xs">
                  {activity.priority}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {activity.description}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{activity.source}</span>
                <span>{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}