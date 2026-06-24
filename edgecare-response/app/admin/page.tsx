import { Ambulance, Database, Hospital, ScrollText, Shield, Users } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { SectionHeading } from "@/components/section-heading";
import { StatCard } from "@/components/stat-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ambulances, events, hospitals, patients } from "@/lib/data";

const modules = [
  ["Patients", patients.length, Users],
  ["Hospitals", hospitals.length, Hospital],
  ["Ambulances", ambulances.length, Ambulance],
  ["Caregivers", 6, Shield],
  ["System Logs", 1284, ScrollText],
  ["Emergency Events", events.length, Database]
] as const;

export default function AdminPage() {
  return (
    <AppShell>
      <SectionHeading eyebrow="Admin panel" title="Operational data management" />
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {modules.map(([label, value, Icon]) => <StatCard key={label} label={label} value={String(value)} icon={Icon} />)}
      </div>
      <Card className="mt-6 overflow-x-auto">
        <CardHeader><CardTitle>Emergency Events</CardTitle><Database className="text-primary" /></CardHeader>
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-border text-foreground/55">
            <tr><th className="py-3">ID</th><th>Patient</th><th>Severity</th><th>Status</th><th>ETA</th><th>Location</th></tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b border-border last:border-0">
                <td className="py-3 font-semibold">{event.id}</td>
                <td>{event.patient}</td>
                <td>{event.severity}</td>
                <td>{event.status}</td>
                <td>{event.eta}</td>
                <td>{event.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppShell>
  );
}
