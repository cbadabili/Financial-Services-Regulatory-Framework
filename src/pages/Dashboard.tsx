import { 
  FileText, 
  CheckSquare, 
  AlertTriangle, 
  TrendingUp,
  Users,
  Clock,
  Shield,
  BarChart3
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ComplianceOverview } from "@/components/dashboard/ComplianceOverview";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Regulatory Dashboard
        </h1>
        <p className="text-muted-foreground">
          Monitor compliance status, track regulatory changes, and manage your obligations across all financial authorities in Botswana.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Regulations"
          value="847"
          description="Active regulatory documents"
          icon={FileText}
          trend={{
            value: 12,
            label: "vs last month",
            isPositive: true
          }}
          badge={{
            text: "Updated",
            variant: "secondary"
          }}
        />
        
        <StatsCard
          title="Compliance Items"
          value="23"
          description="Pending compliance tasks"
          icon={CheckSquare}
          trend={{
            value: 8,
            label: "vs last week",
            isPositive: false
          }}
          badge={{
            text: "Urgent",
            variant: "destructive"
          }}
        />
        
        <StatsCard
          title="Risk Alerts"
          value="5"
          description="Active compliance alerts"
          icon={AlertTriangle}
          badge={{
            text: "Action Required",
            variant: "destructive"
          }}
        />
        
        <StatsCard
          title="Compliance Score"
          value="94%"
          description="Overall compliance rating"
          icon={Shield}
          trend={{
            value: 3,
            label: "vs last quarter",
            isPositive: true
          }}
          badge={{
            text: "Excellent",
            variant: "secondary"
          }}
        />
      </div>

      {/* Regulatory Bodies Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-bob-blue/20 bg-bob-blue/5">
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-bob-blue" />
            <div>
              <p className="text-sm font-medium text-foreground">Bank of Botswana</p>
              <p className="text-xs text-muted-foreground">234 regulations</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-nbfira-green/20 bg-nbfira-green/5">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-5 w-5 text-nbfira-green" />
            <div>
              <p className="text-sm font-medium text-foreground">NBFIRA</p>
              <p className="text-xs text-muted-foreground">156 regulations</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-bse-orange/20 bg-bse-orange/5">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-5 w-5 text-bse-orange" />
            <div>
              <p className="text-sm font-medium text-foreground">BSE</p>
              <p className="text-xs text-muted-foreground">89 regulations</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-fia-purple/20 bg-fia-purple/5">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-fia-purple" />
            <div>
              <p className="text-sm font-medium text-foreground">FIA</p>
              <p className="text-xs text-muted-foreground">67 regulations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <ComplianceOverview />
      </div>
    </div>
  );
}