"use client";

import dynamic from "next/dynamic";

export const LeafletMapCard = dynamic(() => import("@/components/leaflet-preview").then((m) => m.LeafletPreview), {
  ssr: false,
  loading: () => <div className="grid h-[360px] place-items-center text-sm text-foreground/60">Loading live map...</div>
});
