import { BarChart3, TrendingUp, FileText, Calendar, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Analytics() {
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">847</p>
                <p className="text-sm text-muted-foreground">Total Documents</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">94%</p>
                <p className="text-sm text-muted-foreground">Compliance Rate</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">23</p>
                <p className="text-sm text-muted-foreground">Active Tasks</p>
              </div>
              <Calendar className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-sm text-muted-foreground">Reports Generated</p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="regulators">Regulators</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          
          <Button onClick={() => alert('Exporting analytics report...')}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Document Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Chart visualization would be displayed here</p>
                    <p className="text-sm">Integration with charting library required</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Compliance Score Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Compliance trend visualization</p>
                    <p className="text-sm">Real-time compliance scoring</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Compliance Metrics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-card rounded-lg">
                  <div className="text-3xl font-bold text-success mb-2">94%</div>
                  <div className="text-sm text-muted-foreground">Overall Compliance</div>
                </div>
                <div className="text-center p-6 bg-gradient-card rounded-lg">
                  <div className="text-3xl font-bold text-warning mb-2">12</div>
                  <div className="text-sm text-muted-foreground">Pending Items</div>
                </div>
                <div className="text-center p-6 bg-gradient-card rounded-lg">
                  <div className="text-3xl font-bold text-destructive mb-2">3</div>
                  <div className="text-sm text-muted-foreground">Overdue Tasks</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regulators" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-soft border-l-4 border-l-bob-blue">
              <CardHeader>
                <CardTitle className="text-bob-blue">Bank of Botswana</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Documents:</span>
                  <span className="font-semibold">234</span>
                </div>
                <div className="flex justify-between">
                  <span>Compliance Rate:</span>
                  <span className="font-semibold text-success">96%</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Tasks:</span>
                  <span className="font-semibold">8</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-l-4 border-l-nbfira-green">
              <CardHeader>
                <CardTitle className="text-nbfira-green">NBFIRA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Documents:</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between">
                  <span>Compliance Rate:</span>
                  <span className="font-semibold text-success">92%</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Tasks:</span>
                  <span className="font-semibold">5</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-l-4 border-l-bse-orange">
              <CardHeader>
                <CardTitle className="text-bse-orange">Botswana Stock Exchange</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Documents:</span>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex justify-between">
                  <span>Compliance Rate:</span>
                  <span className="font-semibold text-warning">88%</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Tasks:</span>
                  <span className="font-semibold">7</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-l-4 border-l-fia-purple">
              <CardHeader>
                <CardTitle className="text-fia-purple">Financial Intelligence Agency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Documents:</span>
                  <span className="font-semibold">67</span>
                </div>
                <div className="flex justify-between">
                  <span>Compliance Rate:</span>
                  <span className="font-semibold text-success">98%</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Tasks:</span>
                  <span className="font-semibold">3</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}