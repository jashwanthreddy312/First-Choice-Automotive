import { Car } from "./types";

export type InspectionStatus = "Good" | "Fair" | "Needs Attention";

export type InspectionItem = {
  category: string;
  status: InspectionStatus;
  note: string;
};

const STATUS_SCORE: Record<InspectionStatus, number> = {
  Good: 100,
  Fair: 70,
  "Needs Attention": 40,
};

function bucket(value: number, good: number, fair: number): InspectionStatus {
  if (value <= good) return "Good";
  if (value <= fair) return "Fair";
  return "Needs Attention";
}

// Derives a deterministic 200-point-style inspection report from a car's
// own stats (age, mileage, ownership) so every listing — seed or
// admin-added — gets a consistent, realistic-looking report without
// needing inspectors to hand-author one for a demo.
export function getInspectionReport(car: Car): InspectionItem[] {
  const ageYears = Math.max(0, new Date().getFullYear() - car.year);

  const exterior = bucket(car.owners, 1, 2);
  const interior = bucket(car.km, 40000, 80000);
  const engine = bucket(car.km, 50000, 90000);
  const tyresAndBrakes = bucket(car.km, 30000, 60000);
  const electricals = bucket(ageYears, 5, 8);
  const acAndComfort = bucket(ageYears, 6, 9);

  return [
    {
      category: "Exterior",
      status: exterior,
      note:
        exterior === "Good"
          ? "Paint and body panels in excellent shape, no dents."
          : exterior === "Fair"
            ? "Minor scratches consistent with age, nothing structural."
            : "Visible wear from multiple owners — inspect in person.",
    },
    {
      category: "Interior",
      status: interior,
      note:
        interior === "Good"
          ? "Seats, dashboard and upholstery show minimal wear."
          : interior === "Fair"
            ? "Light wear on seats and controls, fully functional."
            : "Noticeable wear from high mileage — request photos.",
    },
    {
      category: "Engine & Transmission",
      status: engine,
      note:
        engine === "Good"
          ? "Smooth performance, no unusual noise or vibration."
          : engine === "Fair"
            ? "Performs well; due for routine service soon."
            : "High mileage — full service check recommended.",
    },
    {
      category: "Tyres & Brakes",
      status: tyresAndBrakes,
      note:
        tyresAndBrakes === "Good"
          ? "Good tread depth, brakes responsive."
          : tyresAndBrakes === "Fair"
            ? "Moderate tread wear, brakes within safe range."
            : "Tyres or brake pads may need replacement soon.",
    },
    {
      category: "Electricals",
      status: electricals,
      note:
        electricals === "Good"
          ? "Lights, wipers and infotainment all functional."
          : electricals === "Fair"
            ? "All systems working, minor age-related wear expected."
            : "Older electricals — verify all functions on test drive.",
    },
    {
      category: "AC & Comfort",
      status: acAndComfort,
      note:
        acAndComfort === "Good"
          ? "Cools quickly and evenly."
          : acAndComfort === "Fair"
            ? "Works well, slightly reduced cooling speed with age."
            : "Recommend an AC service check.",
    },
  ];
}

export function getOverallScore(report: InspectionItem[]): number {
  const total = report.reduce((sum, item) => sum + STATUS_SCORE[item.status], 0);
  return Math.round(total / report.length);
}

export const STATUS_DOT: Record<InspectionStatus, string> = {
  Good: "bg-green-500",
  Fair: "bg-amber-500",
  "Needs Attention": "bg-red-500",
};

export const STATUS_BADGE: Record<InspectionStatus, string> = {
  Good: "bg-green-50 text-green-700 ring-green-200",
  Fair: "bg-amber-50 text-amber-700 ring-amber-200",
  "Needs Attention": "bg-red-50 text-red-700 ring-red-200",
};
