export type Role = "Elderly User" | "Caregiver" | "Ambulance Staff" | "Hospital Staff" | "Admin";

export type Severity = "Low" | "Moderate" | "Critical";

export type Patient = {
  id: string;
  name: string;
  age: number;
  risk: Severity;
  location: string;
  coordinates: [number, number];
  heartRate: number;
  fallProbability: number;
  battery: number;
  connectivity: "Online" | "Degraded" | "Offline";
  motionStatus: string;
  ess: number;
  caregiver: string;
};

export type Hospital = {
  id: string;
  name: string;
  coordinates: [number, number];
  distanceKm: number;
  travelMin: number;
  availableBeds: number;
  ambulances: number;
  traumaReady: boolean;
};

export type Ambulance = {
  id: string;
  crew: string;
  status: "Available" | "Assigned" | "En Route" | "Transporting" | "Maintenance";
  hospitalId: string;
  speedKph: number;
};

export type EmergencyEvent = {
  id: string;
  patient: string;
  status: string;
  severity: Severity;
  eta: string;
  location: string;
};

export type MetricPoint = {
  name: string;
  heartRate?: number;
  probability?: number;
  accel?: number;
  gyro?: number;
  incidents?: number;
  response?: number;
};
