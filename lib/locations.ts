export type Branch = {
  id: string;
  name: string;
  address: string;
  plusCode: string;
  phone: string;
  hours: string;
  rating: number;
};

// Sales contact number shown as the "Call" option on listing pages.
export const SALES_PHONE = "709522422";

// The dealership's one real location.
export const BRANCH: Branch = {
  id: "main",
  name: "First-Choice Automotives",
  address: "Madgulapally, Telangana 508374",
  plusCode: "XFG4+HC Madgulapally, Telangana",
  phone: "091212 16263",
  hours: "Daily, until 8:30 PM",
  rating: 4.8,
};
