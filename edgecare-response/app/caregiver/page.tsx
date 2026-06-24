import { BellRing, Clock, HeartPulse, MapPin, Phone, Settings, UserRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { SectionHeading } from "@/components/section-heading";
import { StatCard } from "@/components/stat-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { patients } from "@/lib/data";

export default function CaregiverPage() {
  return (
    <AppShell>
      <SectionHeading eyebrow="Caregiver dashboard" title="Family and attendant monitoring" />
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Patients" value="3" icon={UserRound} />
        <StatCard label="Emergency Alerts" value="1 active" icon={BellRing} tone="danger" />
        <StatCard label="Contacts" value="6" icon={Phone} tone="success" />
        <StatCard label="Notifications" value="Enabled" icon={Settings} tone="accent" />
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {patients.map((patient) => (
          <Card key={patient.id}>
            <CardHeader><CardTitle>{patient.name}</CardTitle><HeartPulse className="text-danger" /></CardHeader>
            <div className="space-y-3 text-sm">
              <p className="flex justify-between"><span className="text-foreground/60">Health status</span><strong>{patient.risk}</strong></p>
              <p className="flex justify-between"><span className="text-foreground/60">Heart rate</span><strong>{patient.heartRate} bpm</strong></p>
              <p className="flex justify-between"><span className="text-foreground/60">Fall probability</span><strong>{patient.fallProbability}%</strong></p>
              <p className="flex items-center gap-2 text-foreground/65"><MapPin size={16} /> {patient.location}</p>
            </div>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <CardHeader><CardTitle>Event History</CardTitle><Clock className="text-primary" /></CardHeader>
        <div className="grid gap-3 md:grid-cols-3">
          {["Fall alert verified and ambulance assigned", "Routine heart-rate threshold warning resolved", "Device battery replaced by caregiver"].map((item) => (
            <p key={item} className="rounded-md bg-muted p-4 text-sm">{item}</p>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
