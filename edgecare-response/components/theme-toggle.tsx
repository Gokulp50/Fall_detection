"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("edgecare-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = saved ? saved === "dark" : prefersDark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("edgecare-theme", next ? "dark" : "light");
  }

  return (
    <Button variant="secondary" className="h-10 w-10 px-0" onClick={toggle} aria-label="Toggle theme">
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}
