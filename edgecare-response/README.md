# EdgeCare Response

Production-ready demo web application for:

**An Integrated Edge-AI Emergency Healthcare Platform for Elderly Fall Prediction Using Wearable Sensors and Real-Time Ambulance Coordination**

## Features

- Next.js, React, TypeScript, Tailwind CSS, ShadCN-style local UI primitives, Framer Motion, Recharts, Leaflet, and Firebase-ready integration.
- Role dashboards for elderly monitoring, caregivers, hospitals, emergency command, analytics, and admin.
- Animated emergency simulation with fall detection, AI verification, ESS scoring, Dijkstra shortest path, ambulance dispatch, pickup, hospital return, and event closure.
- Realistic sample patients, hospitals, ambulances, telemetry, analytics, and event history.
- Light and dark mode.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Firebase

The app runs with sample data by default. To connect Firebase Auth and Firestore, copy `.env.example` to `.env.local` and fill your Firebase web app values.
