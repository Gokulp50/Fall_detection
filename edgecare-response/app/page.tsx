import { Activity, Ambulance, ArrowRight, BadgeCheck, BrainCircuit, HeartPulse, Hospital, Radio, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { StatCard } from "@/components/stat-card";
import { EmergencySimulation } from "@/components/emergency-simulation";
import { LeafletMapCard } from "@/components/leaflet-map-card";

const features: Array<[string, string, LucideIcon]> = [
  ["Edge AI Verification", "TinyML fall prediction combines accelerometer, gyroscope, and heart-rate evidence.", BrainCircuit],
  ["Caregiver Alerts", "Escalation messages keep family members and attendants informed instantly.", Users],
  ["Ambulance Dispatch", "Nearest available ambulance is assigned using distance, ETA, and hospital capacity.", Ambulance],
  ["Hospital Pre-Notification", "Emergency teams receive patient vitals, ESS, and ETA before arrival.", Hospital]
];

export default function Home() {
  return (
    <AppShell>
      <section className="grid min-h-[calc(100vh-7rem)] items-center gap-8 py-6 xl:grid-cols-[1.05fr_.95fr]">
        <div>
          <p className="mb-4 inline-flex rounded-md border border-primary/25 bg-primary/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.24em] text-primary">
            AI healthcare command center
          </p>
          <h1 className="max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
            AI-Powered Elderly Fall Prediction & Emergency Response Platform
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/68">
            Protecting elderly individuals through wearable sensors, Edge AI, real-time ambulance coordination, and hospital pre-notification.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/monitoring">Get Started <ArrowRight size={18} /></ButtonLink>
            <ButtonLink href="/command" variant="secondary">Live Demo</ButtonLink>
            <ButtonLink href="/command#simulation" variant="ghost">View Dashboard</ButtonLink>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <StatCard label="Detection accuracy" value="96.8%" icon={BadgeCheck} trend="TinyML + physiological verification" />
            <StatCard label="Avg response time" value="6.4 min" icon={Radio} trend="Simulated dispatch queue" tone="accent" />
            <StatCard label="Active devices" value="248" icon={ShieldCheck} trend="ESP32 wearable fleet" tone="success" />
          </div>
        </div>

        <Card className="relative overflow-hidden p-0">
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-slate-950/70 p-4 text-white backdrop-blur">
            <span className="text-sm font-semibold">Live Bengaluru emergency layer</span>
            <span className="rounded-md bg-danger px-2 py-1 text-xs font-bold">Critical Event</span>
          </div>
          <LeafletMapCard />
        </Card>
      </section>

      <section className="py-12">
        <SectionHeading eyebrow="Features" title="One platform for the entire response workflow" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map(([title, copy, Icon]) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <Icon className="text-primary" size={22} />
              </CardHeader>
              <p className="text-sm leading-6 text-foreground/65">{copy}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="simulation" className="py-12">
        <SectionHeading
          eyebrow="Live demo"
          title="Animated ambulance simulation"
          copy="Run the complete fall-detected to emergency-closed sequence with live triage cards, route movement, pickup state, ETA, and timeline updates."
        />
        <EmergencySimulation />
      </section>

      <section className="grid gap-4 py-12 lg:grid-cols-3">
        {["Hospitals get pre-arrival reports", "Caregivers get location-aware alerts", "Admins manage patients, ambulances, hospitals, and logs"].map((item) => (
          <Card key={item} className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-success/12 text-success">
              <Activity size={20} />
            </span>
            <p className="font-semibold">{item}</p>
          </Card>
        ))}
      </section>
    </AppShell>
  );
}
