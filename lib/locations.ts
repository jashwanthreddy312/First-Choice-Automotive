export type Branch = {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  flagship?: boolean;
};

export const BRANCHES: Branch[] = [
  {
    id: "blr",
    city: "Bengaluru",
    name: "First-Choice Automotive — Outer Ring Road Hub",
    address: "42, Outer Ring Road, Marathahalli, Bengaluru, Karnataka 560103",
    phone: "+91 80 4567 1200",
    hours: "Mon–Sun, 10:00 AM – 8:00 PM",
    flagship: true,
  },
  {
    id: "mum",
    city: "Mumbai",
    name: "First-Choice Automotive — Andheri Showroom",
    address: "12A, SEEPZ Road, Andheri East, Mumbai, Maharashtra 400093",
    phone: "+91 22 3312 4488",
    hours: "Mon–Sun, 10:00 AM – 8:00 PM",
  },
  {
    id: "pun",
    city: "Pune",
    name: "First-Choice Automotive — Baner Road Hub",
    address: "7, Baner Road, Baner, Pune, Maharashtra 411045",
    phone: "+91 20 6789 3345",
    hours: "Mon–Sun, 10:00 AM – 7:30 PM",
  },
  {
    id: "del",
    city: "Delhi NCR",
    name: "First-Choice Automotive — Gurugram Hub",
    address: "Plot 18, Udyog Vihar Phase IV, Gurugram, Haryana 122015",
    phone: "+91 124 458 9021",
    hours: "Mon–Sun, 10:00 AM – 8:00 PM",
  },
  {
    id: "hyd",
    city: "Hyderabad",
    name: "First-Choice Automotive — Gachibowli Showroom",
    address: "24, Financial District, Gachibowli, Hyderabad, Telangana 500032",
    phone: "+91 40 2345 6790",
    hours: "Mon–Sun, 10:00 AM – 7:30 PM",
  },
  {
    id: "che",
    city: "Chennai",
    name: "First-Choice Automotive — OMR Hub",
    address: "56, Old Mahabalipuram Road, Sholinganallur, Chennai, Tamil Nadu 600119",
    phone: "+91 44 6123 7890",
    hours: "Mon–Sun, 10:00 AM – 7:30 PM",
  },
];
