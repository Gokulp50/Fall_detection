"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Ambulance,
  BarChart3,
  Building2,
  CircuitBoard,
  Command,
  HeartPulse,
  Home,
  Settings,
  ShieldCheck,
  Users
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/architecture", label: "Architecture", icon: CircuitBoard },
  { href: "/monitoring", label: "Monitoring", icon: HeartPulse },
  { href: "/caregiver", label: "Caregiver", icon: Users },
  { href: "/hospital", label: "Hospital", icon: Building2 },
  { href: "/command", label: "Command", icon: Command },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin", label: "Admin", icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border/70 bg-background/72 p-4 backdrop-blur-xl lg:block">
        <Link href="/" className="mb-7 flex items-center gap-3 rounded-lg px-2 py-3">
          <span className="grid h-11 w-11 place-items-center rounded-md bg-primary text-white shadow-glow">
            <ShieldCheck size={23} />
          </span>
          <span>
            <span className="block text-base font-bold">EdgeCare Response</span>
            <span className="text-xs text-foreground/60">AI emergency platform</span>
          </span>
        </Link>

        <nav className="space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground/70 transition hover:bg-muted hover:text-foreground",
                  active && "bg-primary/12 text-primary"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-border bg-card/70 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-success/15 text-success">
              <Activity size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold">System online</p>
              <p className="text-xs text-foreground/60">ESP32 fleet sync: 98.4%</p>
            </div>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/76 px-4 py-3 backdrop-blur-xl lg:ml-72">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 font-bold lg:hidden">
            <Ambulance className="text-primary" size={22} />
            EdgeCare
          </Link>
          <div className="hidden text-sm text-foreground/60 lg:block">Integrated elderly fall prediction and response workflow</div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-md border border-border px-3 py-2 text-xs text-foreground/70 sm:inline-flex">
              Role demo: Admin Command
            </span>
            <ThemeToggle />
          </div>
        </div>
        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {nav.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-semibold",
                  active && "border-primary bg-primary text-white"
                )}
              >
                <Icon size={15} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="px-4 py-6 lg:ml-72 lg:px-8">{children}</main>
    </div>
  );
}
