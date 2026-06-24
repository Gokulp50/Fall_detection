import { AppShell } from "@/components/app-shell";
import { ArchitectureFlow } from "@/components/architecture-flow";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";

export default function ArchitecturePage() {
  return (
    <AppShell>
      <SectionHeading
        eyebrow="System architecture"
        title="Edge-to-cloud emergency orchestration"
        copy="Clickable animated blocks show how sensor readings move from ESP32 wearables through TinyML verification, ESS scoring, dispatch, live tracking, and hospital pre-notification."
      />
      <ArchitectureFlow />
      <Card className="mt-6">
        <div className="grid gap-4 md:grid-cols-4">
          {["ESP32 + MPU6050", "TinyML inference", "Firebase sync", "Role dashboards"].map((item) => (
            <div key={item} className="rounded-lg border border-border bg-muted/45 p-4">
              <p className="text-sm font-semibold">{item}</p>
              <p className="mt-2 text-xs leading-5 text-foreground/60">Production module represented in the demo data and UI flow.</p>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
