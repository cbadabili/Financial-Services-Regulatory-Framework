import { useAuth } from "@/contexts/AuthContext";
import InteractiveCharts from "@/components/analytics/InteractiveCharts";

export default function Analytics() {
  const { hasPermission } = useAuth(); // still available for future use

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Analytics & Reports
        </h1>
        <p className="text-muted-foreground">
          Comprehensive analytics and reporting tools for regulatory compliance tracking and insights.
        </p>
      </div>

      {/* Interactive Analytics Dashboard */}
      <InteractiveCharts />
    </div>
  );
}