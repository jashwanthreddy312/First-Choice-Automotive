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
  color: string; // hex, used for the placeholder illustration
  description: string;
  featured?: boolean;
  status?: "Live" | "Pending Inspection" | "Sold";
};
