"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { hospitals, patients } from "@/lib/data";

const marker = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export function LeafletPreview() {
  const patient = patients[0];
  const hospital = hospitals[1];
  return (
    <MapContainer center={patient.coordinates} zoom={13} scrollWheelZoom={false} className="h-[360px] w-full">
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={patient.coordinates} icon={marker}>
        <Popup>{patient.name} fall event</Popup>
      </Marker>
      <Marker position={hospital.coordinates} icon={marker}>
        <Popup>{hospital.name}</Popup>
      </Marker>
      <Polyline positions={[hospital.coordinates, [12.967, 77.637], patient.coordinates]} color="#0ea5e9" />
    </MapContainer>
  );
}
