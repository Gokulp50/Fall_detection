import { Ambulance, Clock, Hospital, ListChecks } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { EmergencySimulation } from "@/components/emergency-simulation";
import { SectionHeading } from "@/components/section-heading";
import { StatCard } from "@/components/stat-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ambulances, events, hospitals } from "@/lib/data";

export default function CommandPage() {
  return (
    <AppShell>
      <SectionHeading eyebrow="Emergency command center" title="Live response operations" />
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Open Emergencies" value="3" icon={ListChecks} tone="danger" />
        <StatCard label="Available Ambulances" value="2" icon={Ambulance} tone="success" />
        <StatCard label="Hospital Capacity" value="21 beds" icon={Hospital} />
        <StatCard label="Avg Response" value="6.4 min" icon={Clock} tone="accent" />
      </div>
      <div id="simulation" className="mt-6">
        <EmergencySimulation />
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Emergency Events</CardTitle></CardHeader>
          <div className="space-y-3">{events.map((event) => <p key={event.id} className="rounded-md bg-muted p-3 text-sm"><strong>{event.id}</strong> {event.patient} - {event.status}</p>)}</div>
        </Card>
        <Card>
          <CardHeader><CardTitle>Ambulance Status</CardTitle></CardHeader>
          <div className="space-y-3">{ambulances.map((item) => <p key={item.id} className="flex justify-between rounded-md bg-muted p-3 text-sm"><strong>{item.id}</strong><span>{item.status}</span></p>)}</div>
        </Card>
        <Card>
          <CardHeader><CardTitle>Hospital Availability</CardTitle></CardHeader>
          <div className="space-y-3">{hospitals.map((item) => <p key={item.id} className="flex justify-between rounded-md bg-muted p-3 text-sm"><strong>{item.name}</strong><span>{item.availableBeds} beds</span></p>)}</div>
        </Card>
      </div>
    </AppShell>
  );
}
