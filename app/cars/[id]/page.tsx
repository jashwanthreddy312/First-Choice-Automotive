"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Car } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import { getCarById } from "@/lib/store";
import CarGallery from "@/components/CarGallery";

const SPEC_ICONS: Record<string, React.ReactNode> = {
  km: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-blue-600">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  fuel: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-blue-600">
      <path d="M5 20V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 20h10M15 9h1.5A1.5 1.5 0 0 1 18 10.5V15a1.5 1.5 0 0 0 3 0v-4l-2-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 6h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  transmission: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-blue-600">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 8v8M12 8v8M16 8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  owner: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-blue-600">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [car, setCar] = useState<Car | null | undefined>(undefined);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // localStorage isn't available during SSR, so we look the car up
    // client-side after mount rather than on the server.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCar(getCarById(id) ?? null);
  }, [id]);

  if (car === undefined) {
    return <div className="mx-auto max-w-5xl px-4 py-16 text-slate-500">Loading...</div>;
  }

  if (car === null) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <p className="text-slate-600">This listing could not be found.</p>
        <Link href="/" className="mt-4 inline-block text-blue-700 underline">
          Back to all cars
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 animate-fade-up">
      <button
        onClick={() => router.push("/")}
        className="mb-4 text-sm font-medium text-blue-700 hover:underline"
      >
        &larr; Back to all cars
      </button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <CarGallery color={car.color} images={car.images} />
        </div>

        <div className="lg:col-span-2">
          {car.featured && (
            <span className="mb-2 inline-block rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
              Featured
            </span>
          )}
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-slate-900">
            {car.year} {car.brand} {car.model}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{car.location}</p>
          <p className="mt-3 text-3xl font-extrabold text-blue-700">
            {formatPrice(car.price)}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
            <div className="flex items-start gap-2">
              {SPEC_ICONS.km}
              <div>
                <dt className="text-slate-400">KM Driven</dt>
                <dd className="font-semibold text-slate-800">
                  {car.km.toLocaleString("en-IN")} km
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-2">
              {SPEC_ICONS.fuel}
              <div>
                <dt className="text-slate-400">Fuel Type</dt>
                <dd className="font-semibold text-slate-800">{car.fuel}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2">
              {SPEC_ICONS.transmission}
              <div>
                <dt className="text-slate-400">Transmission</dt>
                <dd className="font-semibold text-slate-800">{car.transmission}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2">
              {SPEC_ICONS.owner}
              <div>
                <dt className="text-slate-400">Ownership</dt>
                <dd className="font-semibold text-slate-800">
                  {car.owners === 1 ? "1st Owner" : `${car.owners} Owners`}
                </dd>
              </div>
            </div>
          </dl>

          <p className="mt-6 text-sm leading-relaxed text-slate-600">
            {car.description}
          </p>

          {submitted ? (
            <div className="mt-6 rounded-lg bg-green-50 p-4 text-sm text-green-700">
              Thanks! A First-Choice Automotive advisor will call you
              shortly to schedule a test drive.
            </div>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              className="mt-6 w-full rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 active:scale-[0.99]"
            >
              Request a callback / test drive
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
