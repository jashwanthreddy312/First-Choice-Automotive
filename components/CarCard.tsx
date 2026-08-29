import Link from "next/link";
import { Car } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import { getInspectionReport, STATUS_BADGE, STATUS_DOT } from "@/lib/inspection";
import CarImage from "./CarImage";

export default function CarCard({ car }: { car: Car }) {
  const sold = car.status === "Sold";
  const report = getInspectionReport(car);
  const exterior = report.find((item) => item.category === "Exterior")!;
  const interior = report.find((item) => item.category === "Interior")!;

  return (
    <Link
      href={`/cars/${car.id}`}
      className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10"
    >
      <div className="relative overflow-hidden">
        <div className={sold ? "grayscale" : undefined}>
          {car.images && car.images.length > 0 ? (
            // eslint-disable-next-line @next/next/no-img-element -- data URLs from localStorage
            <img
              src={car.images[0]}
              alt={`${car.year} ${car.brand} ${car.model}`}
              className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <CarImage
              color={car.color}
              className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}
        </div>
        {sold && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/35">
            <span className="-rotate-6 rounded border-4 border-white px-4 py-1 text-xl font-extrabold uppercase tracking-widest text-white">
              Sold
            </span>
          </div>
        )}
        {!sold && car.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white shadow">
            Featured
          </span>
        )}
        {!sold && car.status === "Pending Inspection" && (
          <span className="absolute left-3 top-3 rounded-full bg-slate-700/90 px-2.5 py-1 text-xs font-semibold text-white shadow">
            Pending Inspection
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/15 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="font-[family-name:var(--font-heading)] text-base font-bold tracking-tight text-slate-900 group-hover:text-blue-700">
          {car.year} {car.brand} {car.model}
        </h3>
        <p className={`mt-1 text-lg font-bold ${sold ? "text-slate-400" : "text-blue-700"}`}>
          {formatPrice(car.price)}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
          <span>{car.km.toLocaleString("en-IN")} km</span>
          <span>&middot;</span>
          <span>{car.fuel}</span>
          <span>&middot;</span>
          <span>{car.transmission}</span>
          <span>&middot;</span>
          <span>{car.owners === 1 ? "1st Owner" : `${car.owners} Owners`}</span>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${STATUS_BADGE[exterior.status]}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[exterior.status]}`} />
            Exterior: {exterior.status}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${STATUS_BADGE[interior.status]}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[interior.status]}`} />
            Interior: {interior.status}
          </span>
        </div>
        <p className="mt-2 flex items-center gap-1 text-xs font-medium text-slate-400">
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
            <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          {car.location}
        </p>
      </div>
    </Link>
  );
}
