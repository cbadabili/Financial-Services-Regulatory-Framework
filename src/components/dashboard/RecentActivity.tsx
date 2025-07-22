import {
  Clock,
  FileText,
  AlertTriangle,
  CheckCircle,
  UploadCloud,
  LogIn,
  LogOut,
  Eye,
  Plus,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  X,
  Settings
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAudit, AuditLogEntry, AuditActionType, SeverityLevel } from "@/components/audit/AuditLogger";
import { formatDistanceToNowStrict } from "date-fns";

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
  const { logs } = useAudit();
  const recentLogs = logs.slice(0, 5);

  const getActionIcon = (action: AuditActionType) => {
    switch (action) {
      case "login":
        return LogIn;
      case "logout":
        return LogOut;
      case "view":
        return Eye;
      case "create":
        return Plus;
      case "update":
        return Edit;
      case "delete":
        return Trash2;
      case "download":
        return Download;
      case "upload":
        return UploadCloud;
      case "generate":
        return RefreshCw;
      case "access_denied":
        return X;
      case "system":
        return Settings;
      default:
        return FileText;
    }
  };

  const getSeverityColor = (sev: SeverityLevel) => {
    switch (sev) {
      case "warning":
        return "text-warning";
      case "error":
      case "critical":
        return "text-destructive";
      default:
        return "text-primary";
    }
  };

  return (
    <Card className="bg-gradient-card shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentLogs.map((log: AuditLogEntry) => {
          const Icon = getActionIcon(log.action);
          return (
          <div 
            key={log.id}
            className="flex items-start space-x-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-smooth cursor-pointer"
          >
            <div className={`mt-1 ${getSeverityColor(log.severity)}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {log.resourceName || log.description}
                </h4>
                <Badge variant={log.success ? "secondary" : "destructive"} className="ml-2 text-xs">
                  {log.success ? "success" : "failed"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {log.description}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{log.userName}</span>
                <span>{formatDistanceToNowStrict(log.timestamp, { addSuffix: true })}</span>
              </div>
            </div>
          </div>
          );
        })}
      </CardContent>
    </Card>
  );
}