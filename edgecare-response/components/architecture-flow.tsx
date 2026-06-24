"use client";

import { motion } from "framer-motion";
import { Cpu, Database, HeartPulse, Hospital, Route, Siren, Smartphone, Waves } from "lucide-react";
import { architecture } from "@/lib/data";
import { Card } from "@/components/ui/card";

const icons = [Smartphone, Waves, Cpu, HeartPulse, Database, Siren, Hospital, Route, Siren, Hospital];

export function ArchitectureFlow() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {architecture.map((step, index) => {
        const Icon = icons[index];
        return (
          <motion.button
            key={step}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ delay: index * 0.04 }}
            className="text-left"
          >
            <Card className="relative h-full min-h-36 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-accent" />
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-primary/12 text-primary">
                  <Icon size={21} />
                </span>
                <span className="text-xs font-bold text-foreground/40">0{index + 1}</span>
              </div>
              <h3 className="mt-5 text-base font-semibold">{step}</h3>
              <p className="mt-2 text-sm leading-6 text-foreground/60">
                {index < 4 ? "Edge intelligence processes sensor evidence locally." : "Cloud coordination synchronizes response teams in real time."}
              </p>
            </Card>
          </motion.button>
        );
      })}
    </div>
  );
}
