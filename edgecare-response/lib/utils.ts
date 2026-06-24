import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKm(value: number) {
  return `${value.toFixed(1)} km`;
}

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}
