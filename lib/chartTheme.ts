// ─── RecoBee Chart.js Theme ─────────────────────────────────
// Apply these defaults globally or per-chart for consistent dark styling.

import { ChartOptions } from "chart.js";

export const chartColors = {
  amber: "#f59e0b",
  amberLight: "#fbbf24",
  amberDim: "rgba(245,158,11,0.3)",
  green: "#4ade80",
  greenDim: "rgba(74,222,128,0.3)",
  red: "#f87171",
  redDim: "rgba(248,113,113,0.3)",
  blue: "#60a5fa",
  blueDim: "rgba(96,165,250,0.3)",
  violet: "#a78bfa",
  violetDim: "rgba(167,139,250,0.3)",
  rose: "#fb7185",
  roseDim: "rgba(251,113,133,0.3)",
  teal: "#2dd4bf",
  tealDim: "rgba(45,212,191,0.3)",
  orange: "#fb923c",
  orangeDim: "rgba(251,146,60,0.3)",
  zinc400: "#a1a1aa",
  zinc600: "#52525b",
  zinc700: "#3f3f46",
  zinc800: "#27272a",
  zinc900: "#18181b",
  white: "#ffffff",
};

/** Standard palette for multi-series charts */
export const seriesPalette = [
  chartColors.amber,
  chartColors.blue,
  chartColors.green,
  chartColors.violet,
  chartColors.rose,
  chartColors.teal,
  chartColors.orange,
];

export const seriesPaletteDim = [
  chartColors.amberDim,
  chartColors.blueDim,
  chartColors.greenDim,
  chartColors.violetDim,
  chartColors.roseDim,
  chartColors.tealDim,
  chartColors.orangeDim,
];

/** Base chart options for RecoBee dark theme */
export const baseChartOptions: Partial<ChartOptions> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: chartColors.zinc400,
        font: { family: "Inter", size: 11, weight: "normal" },
        padding: 16,
        usePointStyle: true,
        pointStyleWidth: 8,
      },
    },
    tooltip: {
      backgroundColor: chartColors.zinc800,
      titleColor: chartColors.white,
      bodyColor: chartColors.zinc400,
      borderColor: "rgba(255,255,255,0.06)",
      borderWidth: 1,
      cornerRadius: 8,
      padding: 10,
      titleFont: { family: "Inter", size: 12, weight: "bold" },
      bodyFont: { family: "Inter", size: 11 },
      displayColors: true,
      boxPadding: 4,
    },
  },
  scales: {
    x: {
      grid: { color: "rgba(255,255,255,0.04)", drawTicks: false },
      ticks: { color: chartColors.zinc600, font: { family: "Inter", size: 11 }, padding: 8 },
      border: { color: "rgba(255,255,255,0.06)" },
    },
    y: {
      grid: { color: "rgba(255,255,255,0.04)", drawTicks: false },
      ticks: { color: chartColors.zinc600, font: { family: "Inter", size: 11 }, padding: 8 },
      border: { display: false },
    },
  },
};

/** Doughnut/Pie specific — no axes */
export const doughnutOptions: Partial<ChartOptions<"doughnut">> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "70%",
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        color: chartColors.zinc400,
        font: { family: "Inter", size: 11, weight: "normal" },
        padding: 16,
        usePointStyle: true,
        pointStyleWidth: 8,
      },
    },
    tooltip: {
      backgroundColor: chartColors.zinc800,
      titleColor: chartColors.white,
      bodyColor: chartColors.zinc400,
      borderColor: "rgba(255,255,255,0.06)",
      borderWidth: 1,
      cornerRadius: 8,
      padding: 10,
    },
  },
};

/** Radar chart specific */
export const radarOptions: Partial<ChartOptions<"radar">> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      grid: { color: "rgba(255,255,255,0.06)" },
      angleLines: { color: "rgba(255,255,255,0.06)" },
      pointLabels: { color: chartColors.zinc400, font: { family: "Inter", size: 11 } },
      ticks: { display: false, backdropColor: "transparent" },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: chartColors.zinc400,
        font: { family: "Inter", size: 11, weight: "normal" },
        padding: 16,
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: chartColors.zinc800,
      titleColor: chartColors.white,
      bodyColor: chartColors.zinc400,
      borderColor: "rgba(255,255,255,0.06)",
      borderWidth: 1,
      cornerRadius: 8,
    },
  },
};
