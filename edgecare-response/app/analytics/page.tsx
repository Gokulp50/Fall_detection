import { Activity, BatteryCharging, BrainCircuit, Clock, Percent, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AnalyticsRadar, MonthlyBarChart } from "@/components/charts";
import { SectionHeading } from "@/components/section-heading";
import { StatCard } from "@/components/stat-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <AppShell>
      <SectionHeading eyebrow="Analytics" title="Model and response performance" />
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Accuracy" value="96.8%" icon={ShieldCheck} />
        <StatCard label="Recall" value="95.2%" icon={BrainCircuit} tone="accent" />
        <StatCard label="Precision" value="94.7%" icon={Percent} tone="success" />
        <StatCard label="Specificity" value="97.4%" icon={Activity} />
        <StatCard label="False Alarm" value="3.1%" icon={Percent} tone="danger" />
        <StatCard label="Battery Life" value="88.5%" icon={BatteryCharging} tone="success" />
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <Card><CardHeader><CardTitle>Detection Metrics</CardTitle><BrainCircuit className="text-primary" /></CardHeader><AnalyticsRadar /></Card>
        <Card><CardHeader><CardTitle>Monthly Incidents and Response Time</CardTitle><Clock className="text-accent" /></CardHeader><MonthlyBarChart /></Card>
      </div>
    </AppShell>
  );
}
