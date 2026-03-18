"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Doughnut, Radar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import { baseChartOptions, doughnutOptions, radarOptions, seriesPalette, seriesPaletteDim } from "@/lib/chartTheme";

// Register once
ChartJS.register(
  CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, ArcElement, RadialLinearScale, Filler, Tooltip, Legend
);

interface ChartContainerProps {
  title?: string;
  height?: number;
  children: React.ReactNode;
  className?: string;
}

/** Themed wrapper with title and consistent card styling */
export function ChartContainer({ title, height = 280, children, className = "" }: ChartContainerProps) {
  return (
    <div className={`bg-zinc-900/40 backdrop-blur-sm rounded-2xl border border-white/[0.06] p-5 ${className}`}>
      {title && <h3 className="text-[15px] font-semibold text-white mb-4">{title}</h3>}
      <div style={{ height }}>{children}</div>
    </div>
  );
}

/** RecoBee Bar Chart */
export function RBBarChart({
  data,
  options,
  horizontal = false,
}: {
  data: ChartData<"bar">;
  options?: Partial<ChartOptions<"bar">>;
  horizontal?: boolean;
}) {
  const merged = {
    ...baseChartOptions,
    indexAxis: horizontal ? ("y" as const) : ("x" as const),
    ...options,
  } as ChartOptions<"bar">;

  return <Bar data={data} options={merged} />;
}

/** RecoBee Line Chart */
export function RBLineChart({
  data,
  options,
}: {
  data: ChartData<"line">;
  options?: Partial<ChartOptions<"line">>;
}) {
  const merged = { ...baseChartOptions, ...options } as ChartOptions<"line">;
  return <Line data={data} options={merged} />;
}

/** RecoBee Doughnut Chart */
export function RBDoughnutChart({
  data,
  options,
}: {
  data: ChartData<"doughnut">;
  options?: Partial<ChartOptions<"doughnut">>;
}) {
  const merged = { ...doughnutOptions, ...options } as ChartOptions<"doughnut">;
  return <Doughnut data={data} options={merged} />;
}

/** RecoBee Radar Chart */
export function RBRadarChart({
  data,
  options,
}: {
  data: ChartData<"radar">;
  options?: Partial<ChartOptions<"radar">>;
}) {
  const merged = { ...radarOptions, ...options } as ChartOptions<"radar">;
  return <Radar data={data} options={merged} />;
}

// Re-export palette for convenience
export { seriesPalette, seriesPaletteDim };
