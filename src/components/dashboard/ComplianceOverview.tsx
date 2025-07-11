import { CheckCircle, Clock, AlertTriangle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const complianceItems = [
  {
    id: 1,
    title: "Capital Adequacy Ratio",
    status: "compliant",
    dueDate: "Ongoing",
    progress: 100,
    regulator: "Bank of Botswana",
    description: "Maintain minimum 15% capital adequacy ratio"
  },
  {
    id: 2,
    title: "AML Transaction Monitoring",
    status: "attention",
    dueDate: "Jan 31, 2025",
    progress: 85,
    regulator: "Financial Intelligence Agency",
    description: "Enhanced monitoring for high-risk transactions"
  },
  {
    id: 3,
    title: "Quarterly Risk Assessment",
    status: "due",
    dueDate: "Jan 15, 2025",
    progress: 45,
    regulator: "NBFIRA",
    description: "Q4 2024 operational risk assessment"
  },
  {
    id: 4,
    title: "ESG Reporting",
    status: "pending",
    dueDate: "Mar 31, 2025",
    progress: 20,
    regulator: "Botswana Stock Exchange",
    description: "Environmental and social governance disclosure"
  }
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "compliant":
      return {
        icon: CheckCircle,
        color: "text-success",
        bgColor: "bg-success/10",
        badge: "secondary"
      };
    case "attention":
      return {
        icon: AlertTriangle,
        color: "text-warning",
        bgColor: "bg-warning/10",
        badge: "default"
      };
    case "due":
      return {
        icon: Clock,
        color: "text-destructive",
        bgColor: "bg-destructive/10",
        badge: "destructive"
      };
    case "pending":
      return {
        icon: XCircle,
        color: "text-muted-foreground",
        bgColor: "bg-muted/10",
        badge: "outline"
      };
    default:
      return {
        icon: Clock,
        color: "text-muted-foreground",
        bgColor: "bg-muted/10",
        badge: "outline"
      };
  }
};

export function ComplianceOverview() {
  return (
    <Card className="bg-gradient-card shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Compliance Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {complianceItems.map((item) => {
          const config = getStatusConfig(item.status);
          const StatusIcon = config.icon;
          
          return (
            <div 
              key={item.id}
              className="p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-smooth cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${config.bgColor}`}>
                    <StatusIcon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {item.regulator}
                    </p>
                  </div>
                </div>
                <Badge variant={config.badge as any} className="text-xs capitalize">
                  {item.status}
                </Badge>
              </div>
              
              <p className="text-xs text-muted-foreground mb-3">
                {item.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground font-medium">{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Due: {item.dueDate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}