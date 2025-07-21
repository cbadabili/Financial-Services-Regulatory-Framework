import React, { ReactNode } from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
  Label
} from "recharts";
import { cn } from "@/lib/utils";

// Common interfaces
interface ChartProps {
  data: any[];
  className?: string;
  height?: number | string;
  width?: number | string;
}

// Color schemes
const defaultColors = [
  "#2563eb", // primary blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // purple
  "#06b6d4", // cyan
  "#f97316", // orange
  "#ec4899", // pink
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label, ...props }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-md shadow-md p-3">
        <p className="text-sm font-medium mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={`tooltip-item-${index}`} className="flex items-center text-sm">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="font-medium">{entry.name}: </span>
            <span className="ml-1">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Area Chart Component
interface AreaChartProps extends ChartProps {
  dataKey: string;
  xAxisDataKey: string;
  stroke?: string;
  fill?: string;
  gradient?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  tooltipFormatter?: (value: number) => string;
}

export const AreaChart = ({
  data,
  dataKey,
  xAxisDataKey,
  stroke = defaultColors[0],
  fill = defaultColors[0],
  gradient = true,
  height = 300,
  width = "100%",
  className,
  xAxisLabel,
  yAxisLabel,
  tooltipFormatter,
}: AreaChartProps) => {
  const id = React.useId();
  const gradientId = `areaGradient-${id}`;

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width={width} height={height}>
        <RechartsAreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {gradient && (
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={fill} stopOpacity={0.8} />
                <stop offset="95%" stopColor={fill} stopOpacity={0} />
              </linearGradient>
            )}
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey={xAxisDataKey} 
            className="text-xs text-muted-foreground"
            tick={{ fill: 'currentColor' }}
          >
            {xAxisLabel && <Label value={xAxisLabel} position="insideBottom" offset={-5} />}
          </XAxis>
          <YAxis 
            className="text-xs text-muted-foreground"
            tick={{ fill: 'currentColor' }}
          >
            {yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" />}
          </YAxis>
          <Tooltip content={<CustomTooltip />} formatter={tooltipFormatter} />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={stroke}
            fill={gradient ? `url(#${gradientId})` : fill}
            strokeWidth={2}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Bar Chart Component
interface BarChartProps extends ChartProps {
  dataKey: string | string[];
  xAxisDataKey: string;
  colors?: string[];
  stacked?: boolean;
  horizontal?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  tooltipFormatter?: (value: number) => string;
  legendFormatter?: (value: string) => string;
}

export const BarChart = ({
  data,
  dataKey,
  xAxisDataKey,
  colors = defaultColors,
  stacked = false,
  horizontal = false,
  height = 300,
  width = "100%",
  className,
  xAxisLabel,
  yAxisLabel,
  tooltipFormatter,
  legendFormatter,
}: BarChartProps) => {
  // Convert single dataKey to array for consistent handling
  const dataKeys = Array.isArray(dataKey) ? dataKey : [dataKey];

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width={width} height={height}>
        <RechartsBarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          layout={horizontal ? "horizontal" : "vertical"}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey={horizontal ? undefined : xAxisDataKey}
            type={horizontal ? "number" : "category"}
            className="text-xs text-muted-foreground"
            tick={{ fill: 'currentColor' }}
          >
            {xAxisLabel && <Label value={xAxisLabel} position="insideBottom" offset={-5} />}
          </XAxis>
          <YAxis 
            dataKey={horizontal ? xAxisDataKey : undefined}
            type={horizontal ? "category" : "number"}
            className="text-xs text-muted-foreground"
            tick={{ fill: 'currentColor' }}
          >
            {yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" />}
          </YAxis>
          <Tooltip content={<CustomTooltip />} formatter={tooltipFormatter} />
          <Legend formatter={legendFormatter} />
          {dataKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index % colors.length]}
              stackId={stacked ? "stack" : undefined}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Pie Chart Component
interface PieChartDataItem {
  name: string;
  value: number;
  color?: string;
}

interface PieChartProps extends Omit<ChartProps, 'data'> {
  data: PieChartDataItem[];
  nameKey?: string;
  dataKey?: string;
  colors?: string[];
  innerRadius?: number | string;
  outerRadius?: number | string;
  paddingAngle?: number;
  tooltipFormatter?: (value: number) => string;
  legendFormatter?: (value: string) => string;
  label?: boolean | ReactNode | ((props: any) => ReactNode);
}

export const PieChart = ({
  data,
  nameKey = "name",
  dataKey = "value",
  colors = defaultColors,
  innerRadius = 0,
  outerRadius = "80%",
  paddingAngle = 0,
  height = 300,
  width = "100%",
  className,
  tooltipFormatter,
  legendFormatter,
  label = false,
}: PieChartProps) => {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width={width} height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={label}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={paddingAngle}
            dataKey={dataKey}
            nameKey={nameKey}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || colors[index % colors.length]} 
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} formatter={tooltipFormatter} />
          <Legend formatter={legendFormatter} />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};
