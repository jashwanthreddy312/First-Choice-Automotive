export type FuelType = "Petrol" | "Diesel" | "CNG" | "Electric";
export type Transmission = "Manual" | "Automatic";

export type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number; // INR
  km: number;
  fuel: FuelType;
  transmission: Transmission;
  owners: number;
  location: string;
  color: string; // hex, used for the generated illustration fallback
  images?: string[]; // real uploaded photos (data URLs); overrides the illustration when present
  description: string;
  featured?: boolean;
  status?: "Live" | "Pending Inspection" | "Sold";
};
