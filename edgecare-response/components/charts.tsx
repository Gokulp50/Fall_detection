"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { analytics, heartTrend, monthly } from "@/lib/data";

const tooltipStyle = {
  border: "1px solid hsl(var(--border))",
  borderRadius: 8,
  background: "hsl(var(--card))",
  color: "hsl(var(--foreground))"
};

export function HeartRateChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={heartTrend}>
        <defs>
          <linearGradient id="heart" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.45} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="name" stroke="currentColor" fontSize={12} />
        <YAxis stroke="currentColor" fontSize={12} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="heartRate" stroke="#ef4444" fill="url(#heart)" strokeWidth={3} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function MotionChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={heartTrend}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="name" stroke="currentColor" fontSize={12} />
        <YAxis stroke="currentColor" fontSize={12} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="accel" stroke="#06b6d4" strokeWidth={3} dot={false} />
        <Line type="monotone" dataKey="gyro" stroke="#2563eb" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function ProbabilityChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={heartTrend}>
        <defs>
          <linearGradient id="probability" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="name" stroke="currentColor" fontSize={12} />
        <YAxis stroke="currentColor" fontSize={12} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="probability" stroke="#0ea5e9" fill="url(#probability)" strokeWidth={3} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function AnalyticsRadar() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={analytics}>
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis dataKey="name" fontSize={12} />
        <Radar dataKey="value" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.32} />
        <Tooltip contentStyle={tooltipStyle} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function MonthlyBarChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthly}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="name" stroke="currentColor" fontSize={12} />
        <YAxis stroke="currentColor" fontSize={12} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="incidents" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
        <Bar dataKey="response" fill="#14b8a6" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
