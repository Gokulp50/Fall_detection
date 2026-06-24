import { Ambulance, ClipboardPlus, HeartPulse, Hospital, Timer } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { HeartRateChart } from "@/components/charts";
import { SectionHeading } from "@/components/section-heading";
import { StatCard } from "@/components/stat-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { events, patients } from "@/lib/data";

export default function HospitalPage() {
  return (
    <AppShell>
      <SectionHeading eyebrow="Hospital dashboard" title="Incoming emergency pre-arrival reports" />
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Incoming Patients" value="2" icon={ClipboardPlus} tone="danger" />
        <StatCard label="Critical Severity" value="1" icon={HeartPulse} tone="danger" />
        <StatCard label="ETA" value="06:42" icon={Timer} />
        <StatCard label="Ambulance" value="AMB-17" icon={Ambulance} tone="accent" />
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-[.9fr_1.1fr]">
        <Card>
          <CardHeader><CardTitle>Incoming Patients</CardTitle><Hospital className="text-primary" /></CardHeader>
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="rounded-md border border-border bg-muted/50 p-4">
                <p className="font-semibold">{event.patient}</p>
                <p className="mt-1 text-sm text-foreground/65">{event.severity} severity - ETA {event.eta} - {event.location}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader><CardTitle>Patient Health Data</CardTitle><HeartPulse className="text-danger" /></CardHeader>
          <HeartRateChart />
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <p className="rounded-md bg-muted p-3 text-sm">ESS: <strong>{patients[0].ess}/100</strong></p>
            <p className="rounded-md bg-muted p-3 text-sm">BP: <strong>145/92</strong></p>
            <p className="rounded-md bg-muted p-3 text-sm">SpO2: <strong>94%</strong></p>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
