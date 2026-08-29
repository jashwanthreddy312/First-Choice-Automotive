import Link from "next/link";
import { Car } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import CarImage from "./CarImage";

export default function CarCard({ car }: { car: Car }) {
  return (
    <Link
      href={`/cars/${car.id}`}
      className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative">
        <CarImage color={car.color} className="w-full h-44 object-cover" />
        {car.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white shadow">
            Featured
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-700">
          {car.year} {car.brand} {car.model}
        </h3>
        <p className="mt-1 text-lg font-bold text-blue-700">
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
        <p className="mt-2 text-xs font-medium text-slate-400">
          {car.location}
        </p>
      </div>
    </Link>
  );
}
