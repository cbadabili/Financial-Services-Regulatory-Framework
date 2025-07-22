import React, { useState, useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Sector,
  ComposedChart,
  Scatter,
  ReferenceLine,
  Brush,
  Label
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label as UILabel } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  Download,
  FileDown,
  Filter,
  BarChart2,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  AreaChart as AreaChartIcon,
  Activity,
  Calendar,
  RefreshCw,
  Maximize2,
  Minimize2,
  Info,
  Settings,
  Share2,
  Printer,
  Sliders,
  Eye,
  EyeOff,
  X,
  Plus,
  Trash2
} from "lucide-react";
import { format, parseISO, subDays, subMonths, subYears, addDays } from "date-fns";

// Define color schemes
const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", 
  "#82CA9D", "#A4DE6C", "#D0ED57", "#FAACC5", "#F472B6"
];

const BOB_COLOR = "#1E40AF"; // Bank of Botswana
const NBFIRA_COLOR = "#047857"; // NBFIRA
const BSE_COLOR = "#D97706"; // Botswana Stock Exchange
const FIA_COLOR = "#7C3AED"; // Financial Intelligence Agency
const CIPA_COLOR = "#BE123C"; // CIPA
const BURS_COLOR = "#374151"; // BURS
const CCA_COLOR = "#0369A1"; // CCA
const BOCRA_COLOR = "#4F46E5"; // BOCRA

// Mock data for Regulations per Regulatory Body
const regulationsPerBodyData = [
  { name: "Bank of Botswana", value: 234, color: BOB_COLOR },
  { name: "NBFIRA", value: 156, color: NBFIRA_COLOR },
  { name: "BSE", value: 89, color: BSE_COLOR },
  { name: "FIA", value: 67, color: FIA_COLOR },
  { name: "CIPA", value: 45, color: CIPA_COLOR },
  { name: "BURS", value: 78, color: BURS_COLOR },
  { name: "CCA", value: 32, color: CCA_COLOR },
  { name: "BOCRA", value: 41, color: BOCRA_COLOR }
];

// Mock data for Regulatory Updates Over Time
const generateUpdatesOverTimeData = () => {
  const data = [];
  const now = new Date();
  
  // Generate monthly data for the past 2 years
  for (let i = 24; i >= 0; i--) {
    const date = subMonths(now, i);
    const formattedDate = format(date, "MMM yyyy");
    
    // Randomize data with some patterns
    const bobValue = Math.floor(Math.random() * 10) + (i % 3 === 0 ? 15 : 5);
    const nbfiraValue = Math.floor(Math.random() * 8) + (i % 4 === 0 ? 10 : 3);
    const bseValue = Math.floor(Math.random() * 5) + (i % 6 === 0 ? 8 : 2);
    const fiaValue = Math.floor(Math.random() * 4) + (i % 5 === 0 ? 7 : 1);
    
    data.push({
      date: formattedDate,
      "Bank of Botswana": bobValue,
      "NBFIRA": nbfiraValue,
      "BSE": bseValue,
      "FIA": fiaValue,
      total: bobValue + nbfiraValue + bseValue + fiaValue
    });
  }
  
  return data;
};

const updatesOverTimeData = generateUpdatesOverTimeData();

// Mock data for Compliance Status Distribution
const complianceStatusData = [
  { name: "Compliant", value: 68, color: "#22C55E" },
  { name: "Partially Compliant", value: 17, color: "#F59E0B" },
  { name: "Non-Compliant", value: 9, color: "#EF4444" },
  { name: "Under Review", value: 6, color: "#6366F1" }
];

// Mock data for User Activity Trends
const generateUserActivityData = () => {
  const data = [];
  const now = new Date();
  
  // Generate daily data for the past 30 days
  for (let i = 30; i >= 0; i--) {
    const date = subDays(now, i);
    const formattedDate = format(date, "MMM dd");
    
    // Create some patterns in the data
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseValue = isWeekend ? 10 : 30;
    
    data.push({
      date: formattedDate,
      "Document Views": Math.floor(Math.random() * 20) + baseValue,
      "Checklist Generations": Math.floor(Math.random() * 10) + (baseValue / 2),
      "Downloads": Math.floor(Math.random() * 15) + (baseValue / 3),
      "Searches": Math.floor(Math.random() * 25) + baseValue
    });
  }
  
  return data;
};

const userActivityData = generateUserActivityData();

// Mock data for Document Types by Regulator
const documentTypesData = [
  {
    regulator: "Bank of Botswana",
    "Regulations": 78,
    "Guidelines": 45,
    "Circulars": 62,
    "Forms": 29,
    "Templates": 20
  },
  {
    regulator: "NBFIRA",
    "Regulations": 52,
    "Guidelines": 38,
    "Circulars": 41,
    "Forms": 15,
    "Templates": 10
  },
  {
    regulator: "BSE",
    "Regulations": 34,
    "Guidelines": 22,
    "Circulars": 18,
    "Forms": 10,
    "Templates": 5
  },
  {
    regulator: "FIA",
    "Regulations": 25,
    "Guidelines": 15,
    "Circulars": 12,
    "Forms": 8,
    "Templates": 7
  },
  {
    regulator: "CIPA",
    "Regulations": 18,
    "Guidelines": 12,
    "Circulars": 8,
    "Forms": 5,
    "Templates": 2
  }
];

// Mock data for Activity Heatmap
const generateActivityHeatmapData = () => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i);
  
  const data = [];
  
  daysOfWeek.forEach((day, dayIndex) => {
    hoursOfDay.forEach(hour => {
      // Create patterns - weekdays busier during work hours, weekends less active
      let baseValue = 0;
      
      // Weekday patterns
      if (dayIndex < 5) {
        if (hour >= 8 && hour <= 17) {
          // Work hours - higher activity
          baseValue = 30 + Math.floor(Math.random() * 70);
          // Peak at mid-morning and after lunch
          if ((hour >= 10 && hour <= 11) || (hour >= 14 && hour <= 15)) {
            baseValue += 20;
          }
        } else if (hour >= 6 && hour < 8) {
          // Early morning - moderate activity
          baseValue = 10 + Math.floor(Math.random() * 20);
        } else if (hour > 17 && hour <= 22) {
          // Evening - declining activity
          baseValue = 5 + Math.floor(Math.random() * 15);
        } else {
          // Night - minimal activity
          baseValue = Math.floor(Math.random() * 5);
        }
      } else {
        // Weekend patterns - generally lower activity
        if (hour >= 10 && hour <= 16) {
          baseValue = 5 + Math.floor(Math.random() * 15);
        } else {
          baseValue = Math.floor(Math.random() * 5);
        }
      }
      
      data.push({
        day,
        hour: `${hour}:00`,
        value: baseValue,
        dayIndex,
        hourIndex: hour
      });
    });
  });
  
  return data;
};

const activityHeatmapData = generateActivityHeatmapData();

// Helper function to download chart as image
const downloadChartAsImage = (chartRef, chartName) => {
  if (!chartRef.current) return;
  
  try {
    const svg = chartRef.current.container.children[0];
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = svg.width.baseVal.value;
      canvas.height = svg.height.baseVal.value;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${chartName}_${format(new Date(), "yyyy-MM-dd")}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      
      toast({
        title: "Chart Downloaded",
        description: `${chartName} has been downloaded as a PNG image.`
      });
    };
    
    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
  } catch (error) {
    console.error("Error downloading chart:", error);
    toast({
      title: "Download Failed",
      description: "There was an error downloading the chart. Please try again.",
      variant: "destructive"
    });
  }
};

// Helper function to download chart data as CSV
const downloadChartDataAsCSV = (data, chartName) => {
  try {
    if (!data || data.length === 0) return;
    
    // Get headers from first data item
    const headers = Object.keys(data[0]);
    
    // Create CSV content
    let csvContent = headers.join(",") + "\n";
    
    data.forEach(item => {
      const row = headers.map(header => {
        const value = item[header];
        // Handle special cases like dates or numbers with commas
        if (value === null || value === undefined) return "";
        if (typeof value === "string" && value.includes(",")) return `"${value}"`;
        return value;
      }).join(",");
      csvContent += row + "\n";
    });
    
    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${chartName}_${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Data Downloaded",
      description: `${chartName} data has been downloaded as a CSV file.`
    });
  } catch (error) {
    console.error("Error downloading data:", error);
    toast({
      title: "Download Failed",
      description: "There was an error downloading the data. Please try again.",
      variant: "destructive"
    });
  }
};

// Regulations Per Regulatory Body Chart Component
const RegulationsPerBodyChart = ({ data, onFilter }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const chartRef = useRef(null);
  
  const handleMouseEnter = (_, index) => {
    setActiveIndex(index);
  };
  
  const handleMouseLeave = () => {
    setActiveIndex(null);
  };
  
  const handleClick = (entry, index) => {
    if (onFilter) {
      onFilter("regulator", entry.name);
    }
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Regulations per Regulatory Body</CardTitle>
            <CardDescription>Distribution of regulatory documents by authority</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => downloadChartAsImage(chartRef, "Regulations_Per_Body")}>
                <FileDown className="mr-2 h-4 w-4" />
                Download as Image
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => downloadChartDataAsCSV(data, "Regulations_Per_Body")}>
                <Download className="mr-2 h-4 w-4" />
                Download Data
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" />
                Print Chart
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%" ref={chartRef}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barSize={40}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
              <YAxis>
                <Label
                  value="Number of Regulations"
                  angle={-90}
                  position="insideLeft"
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>
              <Tooltip
                formatter={(value, name) => [`${value} regulations`, name]}
                labelFormatter={(label) => `Regulator: ${label}`}
              />
              <Legend />
              <Bar
                dataKey="value"
                name="Regulations"
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color || COLORS[index % COLORS.length]}
                    opacity={activeIndex === index ? 0.8 : 1}
                    stroke={activeIndex === index ? "#000" : "none"}
                    strokeWidth={activeIndex === index ? 1 : 0}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="text-xs text-muted-foreground">
          Click on a bar to filter dashboard by regulator
        </div>
      </CardFooter>
    </Card>
  );
};

// Regulatory Updates Over Time Chart Component
const RegulatoryUpdatesChart = ({ data, onFilter }) => {
  const [visibleLines, setVisibleLines] = useState({
    "Bank of Botswana": true,
    "NBFIRA": true,
    "BSE": true,
    "FIA": true,
    "total": false
  });
  const [timeRange, setTimeRange] = useState("2y"); // 6m, 1y, 2y, all
  const chartRef = useRef(null);
  
  // Filter data based on time range
  const getFilteredData = () => {
    const now = new Date();
    let cutoffDate;
    
    switch (timeRange) {
      case "6m":
        cutoffDate = subMonths(now, 6);
        break;
      case "1y":
        cutoffDate = subYears(now, 1);
        break;
      case "2y":
        cutoffDate = subYears(now, 2);
        break;
      default:
        return data;
    }
    
    const cutoffDateStr = format(cutoffDate, "MMM yyyy");
    return data.filter(item => {
      const itemDate = parseISO(`01 ${item.date}`);
      return itemDate >= cutoffDate;
    });
  };
  
  const filteredData = getFilteredData();
  
  const toggleLine = (line) => {
    setVisibleLines(prev => ({
      ...prev,
      [line]: !prev[line]
    }));
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Regulatory Updates Over Time</CardTitle>
            <CardDescription>Monthly regulatory changes by authority</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
                <SelectItem value="2y">2 Years</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => downloadChartAsImage(chartRef, "Regulatory_Updates_Over_Time")}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Download as Image
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadChartDataAsCSV(filteredData, "Regulatory_Updates_Over_Time")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Data
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.print()}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print Chart
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge 
            variant={visibleLines["Bank of Botswana"] ? "default" : "outline"}
            className="cursor-pointer"
            style={{ backgroundColor: visibleLines["Bank of Botswana"] ? BOB_COLOR : "transparent" }}
            onClick={() => toggleLine("Bank of Botswana")}
          >
            Bank of Botswana
          </Badge>
          <Badge 
            variant={visibleLines["NBFIRA"] ? "default" : "outline"}
            className="cursor-pointer"
            style={{ backgroundColor: visibleLines["NBFIRA"] ? NBFIRA_COLOR : "transparent" }}
            onClick={() => toggleLine("NBFIRA")}
          >
            NBFIRA
          </Badge>
          <Badge 
            variant={visibleLines["BSE"] ? "default" : "outline"}
            className="cursor-pointer"
            style={{ backgroundColor: visibleLines["BSE"] ? BSE_COLOR : "transparent" }}
            onClick={() => toggleLine("BSE")}
          >
            BSE
          </Badge>
          <Badge 
            variant={visibleLines["FIA"] ? "default" : "outline"}
            className="cursor-pointer"
            style={{ backgroundColor: visibleLines["FIA"] ? FIA_COLOR : "transparent" }}
            onClick={() => toggleLine("FIA")}
          >
            FIA
          </Badge>
          <Badge 
            variant={visibleLines["total"] ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleLine("total")}
          >
            Total
          </Badge>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%" ref={chartRef}>
            <LineChart
              data={filteredData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                angle={-45} 
                textAnchor="end" 
                height={70}
                tickFormatter={(value) => value}
              />
              <YAxis>
                <Label
                  value="Number of Updates"
                  angle={-90}
                  position="insideLeft"
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>
              <Tooltip 
                formatter={(value, name) => [`${value} updates`, name]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              {visibleLines["Bank of Botswana"] && (
                <Line
                  type="monotone"
                  dataKey="Bank of Botswana"
                  stroke={BOB_COLOR}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 8 }}
                  onClick={(data) => onFilter && onFilter("regulator", "Bank of Botswana")}
                />
              )}
              {visibleLines["NBFIRA"] && (
                <Line
                  type="monotone"
                  dataKey="NBFIRA"
                  stroke={NBFIRA_COLOR}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 8 }}
                  onClick={(data) => onFilter && onFilter("regulator", "NBFIRA")}
                />
              )}
              {visibleLines["BSE"] && (
                <Line
                  type="monotone"
                  dataKey="BSE"
                  stroke={BSE_COLOR}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 8 }}
                  onClick={(data) => onFilter && onFilter("regulator", "BSE")}
                />
              )}
              {visibleLines["FIA"] && (
                <Line
                  type="monotone"
                  dataKey="FIA"
                  stroke={FIA_COLOR}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 8 }}
                  onClick={(data) => onFilter && onFilter("regulator", "FIA")}
                />
              )}
              {visibleLines["total"] && (
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#000000"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3 }}
                  activeDot={{ r: 8 }}
                />
              )}
              <Brush 
                dataKey="date" 
                height={30} 
                stroke="#8884d8"
                startIndex={filteredData.length > 12 ? filteredData.length - 12 : 0}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="text-xs text-muted-foreground">
          Click on a line to filter dashboard by regulator. Click badges to toggle visibility.
        </div>
      </CardFooter>
    </Card>
  );
};

// Compliance Status Distribution Chart Component
const ComplianceStatusChart = ({ data, onFilter }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const chartRef = useRef(null);
  
  const renderActiveShape = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value } = props;
    const sin = Math.sin(-midAngle * Math.PI / 180);
    const cos = Math.cos(-midAngle * Math.PI / 180);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name}: ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  
  const handlePieEnter = (_, index) => {
    setActiveIndex(index);
  };
  
  const handlePieClick = (entry) => {
    if (onFilter) {
      onFilter("complianceStatus", entry.name);
    }
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Compliance Status Distribution</CardTitle>
            <CardDescription>Overall compliance status across all entities</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => downloadChartAsImage(chartRef, "Compliance_Status_Distribution")}>
                <FileDown className="mr-2 h-4 w-4" />
                Download as Image
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => downloadChartDataAsCSV(data, "Compliance_Status_Distribution")}>
                <Download className="mr-2 h-4 w-4" />
                Download Data
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" />
                Print Chart
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%" ref={chartRef}>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                onMouseEnter={handlePieEnter}
                onClick={handlePieClick}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color || COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [`${value} entities (${((value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%)`, name]}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                onClick={handlePieClick}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="text-xs text-muted-foreground">
          Hover over segments for details. Click to filter dashboard by compliance status.
        </div>
      </CardFooter>
    </Card>
  );
};

// User Activity Trends Chart Component
const UserActivityTrendsChart = ({ data }) => {
  const [visibleLines, setVisibleLines] = useState({
    "Document Views": true,
    "Checklist Generations": true,
    "Downloads": true,
    "Searches": true
  });
  const [timeRange, setTimeRange] = useState("30d"); // 7d, 14d, 30d, all
  const chartRef = useRef(null);
  
  // Filter data based on time range
  const getFilteredData = () => {
    const now = new Date();
    let cutoffDate;
    
    switch (timeRange) {
      case "7d":
        cutoffDate = subDays(now, 7);
        break;
      case "14d":
        cutoffDate = subDays(now, 14);
        break;
      case "30d":
        cutoffDate = subDays(now, 30);
        break;
      default:
        return data;
    }
    
    return data.slice(data.length - parseInt(timeRange));
  };
  
  const filteredData = getFilteredData();
  
  const toggleLine = (line) => {
    setVisibleLines(prev => ({
      ...prev,
      [line]: !prev[line]
    }));
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">User Activity Trends</CardTitle>
            <CardDescription>Daily platform usage metrics</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="14d">14 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => downloadChartAsImage(chartRef, "User_Activity_Trends")}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Download as Image
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadChartDataAsCSV(filteredData, "User_Activity_Trends")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Data
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.print()}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print Chart
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge 
            variant={visibleLines["Document Views"] ? "default" : "outline"}
            className="cursor-pointer"
            style={{ backgroundColor: visibleLines["Document Views"] ? "#3B82F6" : "transparent" }}
            onClick={() => toggleLine("Document Views")}
          >
            Document Views
          </Badge>
          <Badge 
            variant={visibleLines["Checklist Generations"] ? "default" : "outline"}
            className="cursor-pointer"
            style={{ backgroundColor: visibleLines["Checklist Generations"] ? "#10B981" : "transparent" }}
            onClick={() => toggleLine("Checklist Generations")}
          >
            Checklist Generations
          </Badge>
          <Badge 
            variant={visibleLines["Downloads"] ? "default" : "outline"}
            className="cursor-pointer"
            style={{ backgroundColor: visibleLines["Downloads"] ? "#F59E0B" : "transparent" }}
            onClick={() => toggleLine("Downloads")}
          >
            Downloads
          </Badge>
          <Badge 
            variant={visibleLines["Searches"] ? "default" : "outline"}
            className="cursor-pointer"
            style={{ backgroundColor: visibleLines["Searches"] ? "#8B5CF6" : "transparent" }}
            onClick={() => toggleLine("Searches")}
          >
            Searches
          </Badge>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%" ref={chartRef}>
            <AreaChart
              data={filteredData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                angle={-45} 
                textAnchor="end" 
                height={70}
              />
              <YAxis>
                <Label
                  value="Number of Activities"
                  angle={-90}
                  position="insideLeft"
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>
              <Tooltip 
                formatter={(value, name) => [`${value} actions`, name]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend onClick={(e) => toggleLine(e.dataKey)} />
              {visibleLines["Document Views"] && (
                <Area
                  type="monotone"
                  dataKey="Document Views"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                  stackId="1"
                />
              )}
              {visibleLines["Checklist Generations"] && (
                <Area
                  type="monotone"
                  dataKey="Checklist Generations"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                  stackId="1"
                />
              )}
              {visibleLines["Downloads"] && (
                <Area
                  type="monotone"
                  dataKey="Downloads"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.3}
                  stackId="1"
                />
              )}
              {visibleLines["Searches"] && (
                <Area
                  type="monotone"
                  dataKey="Searches"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.3}
                  stackId="1"
                />
              )}
              <Brush 
                dataKey="date" 
                height={30} 
                stroke="#8884d8"
                startIndex={Math.max(0, filteredData.length - 14)}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="text-xs text-muted-foreground">
          Click on legend items to toggle visibility. Use brush to zoom into specific time periods.
        </div>
      </CardFooter>
    </Card>
  );
};

// Document Types by Regulator Chart Component
const DocumentTypesChart = ({ data, onFilter }) => {
  const chartRef = useRef(null);
  const [selectedRegulators, setSelectedRegulators] = useState(data.map(item => item.regulator));
  
  const toggleRegulator = (regulator) => {
    setSelectedRegulators(prev => {
      if (prev.includes(regulator)) {
        return prev.filter(r => r !== regulator);
      } else {
        return [...prev, regulator];
      }
    });
  };
  
  const filteredData = data.filter(item => selectedRegulators.includes(item.regulator));
  
  const documentTypes = ["Regulations", "Guidelines", "Circulars", "Forms", "Templates"];
  const colors = {
    "Regulations": "#3B82F6",
    "Guidelines": "#10B981",
    "Circulars": "#F59E0B",
    "Forms": "#8B5CF6",
    "Templates": "#EC4899"
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Document Types by Regulator</CardTitle>
            <CardDescription>Distribution of document categories across regulatory bodies</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => downloadChartAsImage(chartRef, "Document_Types_By_Regulator")}>
                <FileDown className="mr-2 h-4 w-4" />
                Download as Image
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => downloadChartDataAsCSV(filteredData, "Document_Types_By_Regulator")}>
                <Download className="mr-2 h-4 w-4" />
                Download Data
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" />
                Print Chart
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {data.map(item => (
            <Badge 
              key={item.regulator}
              variant={selectedRegulators.includes(item.regulator) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleRegulator(item.regulator)}
            >
              {item.regulator}
            </Badge>
          ))}
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%" ref={chartRef}>
            <BarChart
              data={filteredData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barSize={40}
              barGap={0}
              barCategoryGap={10}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="regulator" angle={-45} textAnchor="end" height={70} />
              <YAxis>
                <Label
                  value="Number of Documents"
                  angle={-90}
                  position="insideLeft"
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>
              <Tooltip 
                formatter={(value, name) => [`${value} documents`, name]}
                labelFormatter={(label) => `Regulator: ${label}`}
              />
              <Legend 
                onClick={(e) => {
                  if (onFilter) {
                    onFilter("documentType", e.dataKey);
                  }
                }}
              />
              {documentTypes.map((type, index) => (
                <Bar 
                  key={type}
                  dataKey={type}
                  stackId="a"
                  fill={colors[type] || COLORS[index % COLORS.length]}
                  onClick={(data) => {
                    if (onFilter) {
                      onFilter("regulator", data.regulator);
                    }
                  }}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="text-xs text-muted-foreground">
          Click on a bar to filter by regulator. Click legend items to filter by document type.
        </div>
      </CardFooter>
    </Card>
  );
};

// Activity Heatmap Chart Component
const ActivityHeatmapChart = ({ data }) => {
  const chartRef = useRef(null);
  const [viewMode, setViewMode] = useState("week"); // week, day
  
  // Process data for heatmap
  const processHeatmapData = () => {
    if (viewMode === "week") {
      // Return data as is for weekly view
      return data;
    } else {
      // For daily view, group by hour and average across all days
      const hourlyData = Array.from({ length: 24 }, (_, hour) => {
        const hourData = data.filter(item => item.hourIndex === hour);
        const avgValue = hourData.reduce((sum, item) => sum + item.value, 0) / 7;
        
        return {
          hour: `${hour}:00`,
          value: Math.round(avgValue),
          hourIndex: hour
        };
      });
      
      return hourlyData;
    }
  };
  
  const processedData = processHeatmapData();
  
  // Custom color scale for heatmap
  const getColor = (value) => {
    // Define color scale thresholds
    if (value < 5) return "#F3F4F6";
    if (value < 15) return "#DBEAFE";
    if (value < 30) return "#93C5FD";
    if (value < 50) return "#60A5FA";
    if (value < 70) return "#3B82F6";
    if (value < 90) return "#2563EB";
    return "#1D4ED8";
  };
  
  // For week view
  const renderWeekHeatmap = () => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const hoursOfDay = Array.from({ length: 24 }, (_, i) => i);
    
    return (
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="flex mb-2">
            <div className="w-20"></div>
            {hoursOfDay.map(hour => (
              <div key={hour} className="flex-1 text-center text-xs text-muted-foreground">
                {hour}:00
              </div>
            ))}
          </div>
          
          {daysOfWeek.map((day, dayIndex) => (
            <div key={day} className="flex items-center mb-1">
              <div className="w-20 text-xs font-medium">{day}</div>
              <div className="flex-1 flex">
                {hoursOfDay.map(hour => {
                  const dataPoint = data.find(d => d.day === day && d.hourIndex === hour);
                  const value = dataPoint ? dataPoint.value : 0;
                  
                  return (
                    <CustomTooltip
                      key={`${day}-${hour}`}
                      content={
                        <div className="text-xs p-2">
                          <div className="font-medium">{day} at {hour}:00</div>
                          <div>{value} activities</div>
                        </div>
                      }
                    >
                      <div 
                        className="flex-1 h-8 mx-px cursor-pointer transition-colors"
                        style={{ backgroundColor: getColor(value) }}
                      />
                    </CustomTooltip>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // For day view (averaged across week)
  const renderDayHeatmap = () => {
    return (
      <ResponsiveContainer width="100%" height={300} ref={chartRef}>
        <BarChart
          data={processedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barSize={15}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="hour" 
            angle={-45} 
            textAnchor="end" 
            height={70}
            interval={1}
          />
          <YAxis>
            <Label
              value="Average Activity"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip 
            formatter={(value) => [`${value} activities`, "Average"]}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Bar 
            dataKey="value" 
            name="Activity Level"
          >
            {processedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getColor(entry.value)} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Activity Heatmap</CardTitle>
            <CardDescription>User activity patterns by time of day and day of week</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="View Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Weekly</SelectItem>
                <SelectItem value="day">Daily Avg</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => downloadChartAsImage(chartRef, "Activity_Heatmap")}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Download as Image
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadChartDataAsCSV(data, "Activity_Heatmap")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Data
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.print()}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print Chart
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Activity Level:</div>
            <div className="flex items-center space-x-1">
              <div className="h-4 w-4" style={{ backgroundColor: "#F3F4F6" }}></div>
              <div className="h-4 w-4" style={{ backgroundColor: "#DBEAFE" }}></div>
              <div className="h-4 w-4" style={{ backgroundColor: "#93C5FD" }}></div>
              <div className="h-4 w-4" style={{ backgroundColor: "#60A5FA" }}></div>
              <div className="h-4 w-4" style={{ backgroundColor: "#3B82F6" }}></div>
              <div className="h-4 w-4" style={{ backgroundColor: "#2563EB" }}></div>
              <div className="h-4 w-4" style={{ backgroundColor: "#1D4ED8" }}></div>
              <div className="text-xs text-muted-foreground ml-2">Low to High</div>
            </div>
          </div>
        </div>
        
        {viewMode === "week" ? renderWeekHeatmap() : renderDayHeatmap()}
      </CardContent>
      <CardFooter className="pt-0">
        <div className="text-xs text-muted-foreground">
          Hover over cells to see detailed activity counts. Switch views to see different perspectives.
        </div>
      </CardFooter>
    </Card>
  );
};

// Main Interactive Charts Component
export default function InteractiveCharts() {
  const [filterCriteria, setFilterCriteria] = useState({
    regulator: null,
    documentType: null,
    complianceStatus: null,
    timeRange: "all"
  });
  const [refreshInterval, setRefreshInterval] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [showFilters, setShowFilters] = useState(false);
  
  // Handle filter application
  const handleFilter = (filterType, value) => {
    setFilterCriteria(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value
    }));
    
    toast({
      title: "Filter Applied",
      description: `Filtered by ${filterType}: ${value}`
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilterCriteria({
      regulator: null,
      documentType: null,
      complianceStatus: null,
      timeRange: "all"
    });
    
    toast({
      title: "Filters Cleared",
      description: "All dashboard filters have been reset"
    });
  };
  
  // Handle data refresh
  const refreshData = () => {
    // In a real app, this would fetch fresh data from the API
    // For the demo, we'll just update the last updated timestamp
    setLastUpdated(new Date());
    
    toast({
      title: "Data Refreshed",
      description: `Dashboard data updated at ${format(new Date(), "h:mm:ss a")}`
    });
  };
  
  // Toggle auto-refresh
  const toggleAutoRefresh = (interval) => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
      setRefreshInterval(null);
      
      toast({
        title: "Auto-Refresh Disabled",
        description: "Dashboard will no longer automatically refresh"
      });
    } else {
      const intervalId = setInterval(() => {
        refreshData();
      }, interval * 1000);
      
      setRefreshInterval(intervalId);
      
      toast({
        title: "Auto-Refresh Enabled",
        description: `Dashboard will refresh every ${interval} seconds`
      });
    }
  };
  
  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [refreshInterval]);
  
  // Apply filters to data (in a real app, this would be more sophisticated)
  const getFilteredData = (data, filterType) => {
    // This is a simplified example - in a real app, you'd have more complex filtering logic
    if (!filterCriteria.regulator && !filterCriteria.documentType && !filterCriteria.complianceStatus) {
      return data;
    }
    
    // For demo purposes, just return the original data
    // In a real app, you'd filter the data based on the criteria
    return data;
  };
  
  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Interactive visualizations of regulatory compliance and user activity data
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Filter Button */}
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-muted" : ""}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {Object.values(filterCriteria).some(v => v && v !== "all") && (
              <Badge variant="secondary" className="ml-2">Active</Badge>
            )}
          </Button>
          
          {/* Refresh Button */}
          <Button variant="outline" onClick={refreshData}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          
          {/* Auto-Refresh Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                {refreshInterval ? "Auto-Refresh On" : "Auto-Refresh"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Refresh Interval</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toggleAutoRefresh(30)}>
                30 seconds
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleAutoRefresh(60)}>
                1 minute
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleAutoRefresh(300)}>
                5 minutes
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toggleAutoRefresh(0)} disabled={!refreshInterval}>
                Turn Off
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Export Dashboard Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" />
                Print Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                toast({
                  title: "Export Initiated",
                  description: "Exporting all charts as PNG images..."
                });
                
                // In a real app, this would trigger export of all charts
                setTimeout(() => {
                  toast({
                    title: "Export Complete",
                    description: "All charts have been exported successfully."
                  });
                }, 2000);
              }}>
                <FileDown className="mr-2 h-4 w-4" />
                Export All Charts
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                toast({
                  title: "Export Initiated",
                  description: "Exporting all data as CSV files..."
                });
                
                // In a real app, this would trigger export of all data
                setTimeout(() => {
                  toast({
                    title: "Export Complete",
                    description: "All data has been exported successfully."
                  });
                }, 2000);
              }}>
                <Download className="mr-2 h-4 w-4" />
                Export All Data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Active Filters */}
      {showFilters && (
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Dashboard Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <UILabel>Regulator</UILabel>
                <Select 
                  value={filterCriteria.regulator || "all"} 
                  onValueChange={(value) => handleFilter("regulator", value === "all" ? null : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Regulators" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regulators</SelectItem>
                    <SelectItem value="Bank of Botswana">Bank of Botswana</SelectItem>
                    <SelectItem value="NBFIRA">NBFIRA</SelectItem>
                    <SelectItem value="BSE">BSE</SelectItem>
                    <SelectItem value="FIA">FIA</SelectItem>
                    <SelectItem value="CIPA">CIPA</SelectItem>
                    <SelectItem value="BURS">BURS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <UILabel>Document Type</UILabel>
                <Select 
                  value={filterCriteria.documentType || "all"} 
                  onValueChange={(value) => handleFilter("documentType", value === "all" ? null : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Document Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Document Types</SelectItem>
                    <SelectItem value="Regulations">Regulations</SelectItem>
                    <SelectItem value="Guidelines">Guidelines</SelectItem>
                    <SelectItem value="Circulars">Circulars</SelectItem>
                    <SelectItem value="Forms">Forms</SelectItem>
                    <SelectItem value="Templates">Templates</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <UILabel>Compliance Status</UILabel>
                <Select 
                  value={filterCriteria.complianceStatus || "all"} 
                  onValueChange={(value) => handleFilter("complianceStatus", value === "all" ? null : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Compliant">Compliant</SelectItem>
                    <SelectItem value="Partially Compliant">Partially Compliant</SelectItem>
                    <SelectItem value="Non-Compliant">Non-Compliant</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <UILabel>Time Range</UILabel>
                <Select 
                  value={filterCriteria.timeRange} 
                  onValueChange={(value) => handleFilter("timeRange", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="1m">Last Month</SelectItem>
                    <SelectItem value="3m">Last 3 Months</SelectItem>
                    <SelectItem value="6m">Last 6 Months</SelectItem>
                    <SelectItem value="1y">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {filterCriteria.regulator && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Regulator: {filterCriteria.regulator}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleFilter("regulator", null)} 
                  />
                </Badge>
              )}
              
              {filterCriteria.documentType && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Document Type: {filterCriteria.documentType}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleFilter("documentType", null)} 
                  />
                </Badge>
              )}
              
              {filterCriteria.complianceStatus && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Compliance Status: {filterCriteria.complianceStatus}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleFilter("complianceStatus", null)} 
                  />
                </Badge>
              )}
              
              {filterCriteria.timeRange !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Time Range: {filterCriteria.timeRange}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleFilter("timeRange", "all")} 
                  />
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Last Updated Info */}
      <div className="text-xs text-muted-foreground text-right">
        Last updated: {format(lastUpdated, "PPp")}
        {refreshInterval && " • Auto-refresh enabled"}
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Row 1 */}
        <RegulationsPerBodyChart 
          data={getFilteredData(regulationsPerBodyData, "regulationsPerBody")} 
          onFilter={handleFilter}
        />
        
        <ComplianceStatusChart 
          data={getFilteredData(complianceStatusData, "complianceStatus")} 
          onFilter={handleFilter}
        />
        
        {/* Row 2 */}
        <RegulatoryUpdatesChart 
          data={getFilteredData(updatesOverTimeData, "updatesOverTime")} 
          onFilter={handleFilter}
        />
        
        <UserActivityTrendsChart 
          data={getFilteredData(userActivityData, "userActivity")} 
        />
        
        {/* Row 3 - Full Width */}
        <div className="col-span-1 md:col-span-2">
          <DocumentTypesChart 
            data={getFilteredData(documentTypesData, "documentTypes")} 
            onFilter={handleFilter}
          />
        </div>
        
        {/* Row 4 - Full Width */}
        <div className="col-span-1 md:col-span-2">
          <ActivityHeatmapChart 
            data={getFilteredData(activityHeatmapData, "activityHeatmap")} 
          />
        </div>
      </div>
    </div>
  );
}

// Helper component for MoreVertical icon
function MoreVertical({ className }) {
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}

// Helper component for CustomTooltip
function CustomTooltip({ children, content }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseEnter = (e) => {
    setIsVisible(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseLeave = () => {
    setIsVisible(false);
  };
  
  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };
  
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="relative"
    >
      {children}
      {isVisible && (
        <div
          className="absolute z-50 bg-popover text-popover-foreground p-2 rounded-md shadow-md text-sm"
          style={{
            left: `${position.x + 10}px`,
            top: `${position.y + 10}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}
