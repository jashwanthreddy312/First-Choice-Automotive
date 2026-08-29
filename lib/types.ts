export type FuelType = "Petrol" | "Diesel" | "CNG" | "Electric";
export type Transmission = "Manual" | "Automatic";
export type BodyType = "Hatchback" | "Sedan" | "SUV" | "MUV";
export type PriceType = "Negotiable" | "Slightly Negotiable" | "Fixed";

export type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number; // INR
  priceType?: PriceType;
  km: number;
  fuel: FuelType;
  transmission: Transmission;
  owners: number;
  location: string;
  bodyType?: BodyType;
  insurance?: string; // e.g. "Comprehensive, valid till Mar 2027"
  color: string; // hex, used for the generated illustration fallback
  images?: string[]; // real uploaded photos (data URLs); overrides the illustration when present
  description: string;
  featured?: boolean;
  status?: "Live" | "Pending Inspection" | "Sold";
};
