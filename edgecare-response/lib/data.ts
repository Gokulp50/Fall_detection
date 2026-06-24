import type { Ambulance, EmergencyEvent, Hospital, MetricPoint, Patient } from "@/lib/types";

export const patients: Patient[] = [
  {
    id: "PT-1042",
    name: "Lakshmi Rao",
    age: 76,
    risk: "Critical",
    location: "Indiranagar, Bengaluru",
    coordinates: [12.9784, 77.6408],
    heartRate: 118,
    fallProbability: 91,
    battery: 68,
    connectivity: "Online",
    motionStatus: "Impact detected, immobile",
    ess: 86,
    caregiver: "Ananya Rao"
  },
  {
    id: "PT-1088",
    name: "George Mathew",
    age: 82,
    risk: "Moderate",
    location: "Koramangala, Bengaluru",
    coordinates: [12.9352, 77.6245],
    heartRate: 92,
    fallProbability: 36,
    battery: 81,
    connectivity: "Online",
    motionStatus: "Walking slowly",
    ess: 44,
    caregiver: "Rina Mathew"
  },
  {
    id: "PT-1120",
    name: "Meera Iyer",
    age: 79,
    risk: "Low",
    location: "Malleswaram, Bengaluru",
    coordinates: [13.0031, 77.5643],
    heartRate: 78,
    fallProbability: 12,
    battery: 74,
    connectivity: "Degraded",
    motionStatus: "Resting",
    ess: 21,
    caregiver: "S. Iyer"
  }
];

export const hospitals: Hospital[] = [
  {
    id: "HSP-01",
    name: "St. Martha Emergency Institute",
    coordinates: [12.9716, 77.5946],
    distanceKm: 4.8,
    travelMin: 9,
    availableBeds: 8,
    ambulances: 3,
    traumaReady: true
  },
  {
    id: "HSP-02",
    name: "Aster Rapid Care Center",
    coordinates: [12.9603, 77.6483],
    distanceKm: 3.2,
    travelMin: 7,
    availableBeds: 2,
    ambulances: 1,
    traumaReady: true
  },
  {
    id: "HSP-03",
    name: "Northline Senior Health",
    coordinates: [13.0092, 77.5511],
    distanceKm: 9.4,
    travelMin: 19,
    availableBeds: 11,
    ambulances: 4,
    traumaReady: false
  }
];

export const ambulances: Ambulance[] = [
  { id: "AMB-17", crew: "Naveen + Priya", status: "Available", hospitalId: "HSP-02", speedKph: 54 },
  { id: "AMB-21", crew: "Karthik + Sana", status: "En Route", hospitalId: "HSP-01", speedKph: 48 },
  { id: "AMB-09", crew: "Rahul + Divya", status: "Available", hospitalId: "HSP-01", speedKph: 52 },
  { id: "AMB-32", crew: "Imran + Kavya", status: "Maintenance", hospitalId: "HSP-03", speedKph: 0 }
];

export const events: EmergencyEvent[] = [
  { id: "EVT-9021", patient: "Lakshmi Rao", status: "AI verified", severity: "Critical", eta: "06:42", location: "Indiranagar" },
  { id: "EVT-9018", patient: "George Mathew", status: "Caregiver notified", severity: "Moderate", eta: "12:10", location: "Koramangala" },
  { id: "EVT-9002", patient: "Meera Iyer", status: "Closed", severity: "Low", eta: "Completed", location: "Malleswaram" }
];

export const heartTrend: MetricPoint[] = [
  { name: "10:00", heartRate: 76, probability: 8, accel: 0.6, gyro: 0.4 },
  { name: "10:05", heartRate: 78, probability: 11, accel: 0.8, gyro: 0.5 },
  { name: "10:10", heartRate: 84, probability: 19, accel: 1.1, gyro: 0.9 },
  { name: "10:15", heartRate: 126, probability: 88, accel: 4.8, gyro: 3.7 },
  { name: "10:20", heartRate: 118, probability: 91, accel: 0.2, gyro: 0.1 },
  { name: "10:25", heartRate: 112, probability: 84, accel: 0.3, gyro: 0.2 }
];

export const analytics = [
  { name: "Accuracy", value: 96.8 },
  { name: "Recall", value: 95.2 },
  { name: "Precision", value: 94.7 },
  { name: "Specificity", value: 97.4 },
  { name: "False Alarm", value: 3.1 },
  { name: "Battery Life", value: 88.5 }
];

export const monthly: MetricPoint[] = [
  { name: "Jan", incidents: 16, response: 9.8 },
  { name: "Feb", incidents: 19, response: 8.9 },
  { name: "Mar", incidents: 14, response: 8.1 },
  { name: "Apr", incidents: 22, response: 7.6 },
  { name: "May", incidents: 18, response: 7.1 },
  { name: "Jun", incidents: 24, response: 6.4 }
];

export const architecture = [
  "Wearable Device",
  "Sensor Data Collection",
  "TinyML Fall Prediction",
  "Physiological Verification",
  "Emergency Severity Score",
  "Caregiver Alert",
  "Hospital Selection",
  "Ambulance Dispatch",
  "Live Tracking",
  "Hospital Pre-Notification"
];

export const simulationSteps = [
  "Fall Detected",
  "AI Verification",
  "ESS Assessment",
  "Hospital Selection",
  "Ambulance Assigned",
  "Ambulance En Route",
  "Arrived at Patient",
  "Patient Picked Up",
  "Transporting",
  "Arrived at Hospital",
  "Emergency Closed"
];
