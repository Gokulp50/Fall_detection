import { Battery, Gauge, HeartPulse, MapPin, Radio, Smartphone } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { HeartRateChart, MotionChart, ProbabilityChart } from "@/components/charts";
import { SectionHeading } from "@/components/section-heading";
import { StatCard } from "@/components/stat-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { patients } from "@/lib/data";

export default function MonitoringPage() {
  const patient = patients[0];
  return (
    <AppShell>
      <SectionHeading eyebrow="Real-time monitoring" title="Patient wearable telemetry dashboard" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Live Heart Rate" value={`${patient.heartRate} bpm`} icon={HeartPulse} tone="danger" trend="Spike detected after impact" />
        <StatCard label="Fall Probability" value={`${patient.fallProbability}%`} icon={Gauge} trend="TinyML high-risk output" />
        <StatCard label="Battery Status" value={`${patient.battery}%`} icon={Battery} tone="success" trend="ESP32 wearable healthy" />
        <StatCard label="Device Connectivity" value={patient.connectivity} icon={Radio} tone="accent" trend="Synced 3 seconds ago" />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Patient Profile</CardTitle>
            <Smartphone className="text-primary" />
          </CardHeader>
          <div className="space-y-3 text-sm">
            {[
              ["Name", patient.name],
              ["Age", String(patient.age)],
              ["GPS Location", patient.location],
              ["Motion Status", patient.motionStatus],
              ["Emergency Severity Score", `${patient.ess}/100`],
              ["Caregiver", patient.caregiver]
            ].map(([label, value]) => (
              <p key={label} className="flex justify-between gap-4 border-b border-border pb-3 last:border-0">
                <span className="text-foreground/60">{label}</span>
                <strong className="text-right">{value}</strong>
              </p>
            ))}
          </div>
        </Card>
        <div className="grid gap-5">
          <Card><CardHeader><CardTitle>Heart Rate Trend</CardTitle><HeartPulse className="text-danger" /></CardHeader><HeartRateChart /></Card>
          <Card><CardHeader><CardTitle>Motion Analysis</CardTitle><MapPin className="text-primary" /></CardHeader><MotionChart /></Card>
          <Card><CardHeader><CardTitle>Fall Probability Graph</CardTitle><Gauge className="text-accent" /></CardHeader><ProbabilityChart /></Card>
        </div>
      </div>
    </AppShell>
  );
}
