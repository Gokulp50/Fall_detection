"use client";

import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Activity, Ambulance, BellRing, BrainCircuit, CheckCircle2, Hospital, MapPin, Route, Siren } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { hospitals, patients, simulationSteps } from "@/lib/data";
import { dijkstra, pathToPoints } from "@/lib/pathfinding";
import { cn, formatKm } from "@/lib/utils";

type Phase = "idle" | "detected" | "verified" | "selected" | "dispatch" | "pickup" | "returning" | "closed";

const phaseForStep: Phase[] = [
  "detected",
  "verified",
  "verified",
  "selected",
  "dispatch",
  "dispatch",
  "pickup",
  "pickup",
  "returning",
  "closed",
  "closed"
];

function interpolate(points: { x: number; y: number }[], progress: number) {
  const segments = points.length - 1;
  const scaled = Math.min(progress, 0.999) * segments;
  const index = Math.floor(scaled);
  const local = scaled - index;
  const current = points[index];
  const next = points[index + 1] ?? current;
  return {
    x: current.x + (next.x - current.x) * local,
    y: current.y + (next.y - current.y) * local,
    angle: Math.atan2(next.y - current.y, next.x - current.x) * (180 / Math.PI)
  };
}

export function EmergencySimulation() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const route = useMemo(() => dijkstra("hospital", "patient"), []);
  const returnRoute = useMemo(() => dijkstra("patient", "hospital"), []);
  const outbound = useMemo(() => pathToPoints(route.path), [route.path]);
  const inbound = useMemo(() => pathToPoints(returnRoute.path), [returnRoute.path]);
  const progress = useMotionValue(0);
  const x = useTransform(progress, (value) => interpolate(phase === "returning" ? inbound : outbound, value).x);
  const y = useTransform(progress, (value) => interpolate(phase === "returning" ? inbound : outbound, value).y);
  const rotate = useTransform(progress, (value) => interpolate(phase === "returning" ? inbound : outbound, value).angle);

  async function run() {
    if (running) return;
    setRunning(true);
    progress.set(0);

    for (let index = 0; index < simulationSteps.length; index += 1) {
      setStep(index);
      setPhase(phaseForStep[index]);
      if (index === 5) await animate(progress, 1, { duration: 5.2, ease: "easeInOut" });
      if (index === 8) {
        progress.set(0);
        await animate(progress, 1, { duration: 5.6, ease: "easeInOut" });
      }
      await new Promise((resolve) => setTimeout(resolve, index === 6 || index === 7 ? 900 : 650));
    }
    setRunning(false);
  }

  const activeRoute = phase === "returning" ? inbound : outbound;
  const path = activeRoute.map((point) => `${point.x},${point.y}`).join(" ");
  const critical = phase !== "idle" && phase !== "closed";

  return (
    <div className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
      <Card className="overflow-hidden p-0">
        <div className="flex flex-col gap-3 border-b border-border p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Animated emergency simulation</p>
            <h2 className="mt-2 text-2xl font-bold">Hospital to patient to hospital dispatch loop</h2>
          </div>
          <Button onClick={run} disabled={running}>
            <Siren size={18} />
            {running ? "Simulation Running" : "Run Emergency Simulation"}
          </Button>
        </div>

        <div className="relative min-h-[560px] overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 opacity-70">
            <div className="absolute left-[6%] top-[18%] h-[1px] w-[90%] rotate-[-13deg] bg-cyan-400/25" />
            <div className="absolute left-[2%] top-[48%] h-[1px] w-[100%] rotate-[10deg] bg-blue-400/25" />
            <div className="absolute left-[20%] top-[5%] h-[90%] w-[1px] rotate-[20deg] bg-cyan-400/20" />
            <div className="absolute left-[64%] top-[2%] h-[94%] w-[1px] rotate-[18deg] bg-blue-400/20" />
          </div>

          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <polyline points="15,72 33,56 52,62 68,42 84,24" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points={path} fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2" />
            {activeRoute.map((node) => (
              <g key={node.id}>
                <circle cx={node.x} cy={node.y} r="1.4" fill="#e0f2fe" />
              </g>
            ))}
          </svg>

          <div className="absolute left-[15%] top-[72%] -translate-x-1/2 -translate-y-1/2">
            <span className="grid h-12 w-12 place-items-center rounded-md bg-cyan-500 text-white shadow-glow">
              <Hospital size={22} />
            </span>
            <p className="mt-2 w-36 text-xs font-semibold">Aster Rapid Care</p>
          </div>

          <div className="absolute left-[84%] top-[24%] -translate-x-1/2 -translate-y-1/2">
            {critical ? <span className="absolute inset-0 rounded-full bg-danger/50 animate-pulseRing" /> : null}
            <span className="relative grid h-12 w-12 place-items-center rounded-full bg-danger text-white shadow-glow">
              <MapPin size={22} />
            </span>
            <p className="mt-2 w-28 text-xs font-semibold">Patient</p>
          </div>

          <motion.div className="absolute" style={{ left: useTransform(x, (v) => `${v}%`), top: useTransform(y, (v) => `${v}%`), rotate }}>
            <div className="-translate-x-1/2 -translate-y-1/2 rounded-md bg-white px-2 py-1 text-danger shadow-glow">
              <div className="absolute -top-1 left-1 h-2 w-2 animate-pulse rounded-full bg-danger" />
              <div className="absolute -top-1 right-1 h-2 w-2 animate-pulse rounded-full bg-blue-500" />
              <Ambulance size={30} />
            </div>
          </motion.div>

          <div className="absolute bottom-4 left-4 right-4 grid gap-3 md:grid-cols-4">
            {[
              ["Status", step >= 0 ? simulationSteps[step] : "Ready"],
              ["ESS", phase === "idle" ? "21 baseline" : "86 critical"],
              ["Distance", formatKm(phase === "returning" ? returnRoute.distance : route.distance)],
              ["ETA", phase === "closed" ? "Arrived" : running ? "06:42" : "Standby"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/10 p-3 backdrop-blur-md">
                <p className="text-xs text-cyan-100/70">{label}</p>
                <p className="mt-1 font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>AI Decision Card</CardTitle>
            <BrainCircuit className="text-primary" size={22} />
          </CardHeader>
          <div className="space-y-3 text-sm">
            <p className="flex justify-between"><span className="text-foreground/60">Selected hospital</span><strong>{hospitals[1].name}</strong></p>
            <p className="flex justify-between"><span className="text-foreground/60">Nearest ambulance</span><strong>AMB-17</strong></p>
            <p className="flex justify-between"><span className="text-foreground/60">Decision basis</span><strong>Distance + capacity</strong></p>
            <p className="flex justify-between"><span className="text-foreground/60">Pathfinding</span><strong>Dijkstra</strong></p>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Live Timeline</CardTitle>
            <Activity className="text-accent" size={22} />
          </CardHeader>
          <div className="space-y-3">
            {simulationSteps.map((label, index) => (
              <div key={label} className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid h-7 w-7 shrink-0 place-items-center rounded-full border",
                    index <= step ? "border-success bg-success text-white" : "border-border text-foreground/35"
                  )}
                >
                  <CheckCircle2 size={15} />
                </span>
                <span className={cn("text-sm", index <= step ? "font-semibold" : "text-foreground/50")}>{label}</span>
              </div>
            ))}
          </div>
        </Card>

        <AnimatePresence>
          {phase === "detected" ? (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Card className="border-danger/40 bg-danger/10">
                <div className="flex items-center gap-3">
                  <BellRing className="text-danger" />
                  <div>
                    <p className="font-bold">Fall Detected</p>
                    <p className="text-sm text-foreground/65">{patients[0].name} shows impact, immobility, and heart-rate spike.</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
