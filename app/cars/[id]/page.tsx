"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Car } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import { getCarById } from "@/lib/store";
import CarImage from "@/components/CarImage";

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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <button
        onClick={() => router.push("/")}
        className="mb-4 text-sm font-medium text-blue-700 hover:underline"
      >
        &larr; Back to all cars
      </button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <CarImage color={car.color} className="w-full rounded-xl border border-slate-200 bg-white" />
        </div>

        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold text-slate-900">
            {car.year} {car.brand} {car.model}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{car.location}</p>
          <p className="mt-3 text-3xl font-extrabold text-blue-700">
            {formatPrice(car.price)}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-white p-4 text-sm">
            <div>
              <dt className="text-slate-400">KM Driven</dt>
              <dd className="font-semibold text-slate-800">
                {car.km.toLocaleString("en-IN")} km
              </dd>
            </div>
            <div>
              <dt className="text-slate-400">Fuel Type</dt>
              <dd className="font-semibold text-slate-800">{car.fuel}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Transmission</dt>
              <dd className="font-semibold text-slate-800">{car.transmission}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Ownership</dt>
              <dd className="font-semibold text-slate-800">
                {car.owners === 1 ? "1st Owner" : `${car.owners} Owners`}
              </dd>
            </div>
          </dl>

          <p className="mt-6 text-sm leading-relaxed text-slate-600">
            {car.description}
          </p>

          {submitted ? (
            <div className="mt-6 rounded-lg bg-green-50 p-4 text-sm text-green-700">
              Thanks! A First Choice Motors advisor will call you shortly to
              schedule a test drive.
            </div>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              className="mt-6 w-full rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Request a callback / test drive
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
