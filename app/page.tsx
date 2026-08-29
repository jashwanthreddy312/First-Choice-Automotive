"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Car } from "@/lib/types";
import { SEED_CARS } from "@/lib/data";
import { getAllCars } from "@/lib/store";
import { BRANCH, SALES_PHONE } from "@/lib/locations";
import CarCard from "@/components/CarCard";
import FilterBar, { DEFAULT_FILTERS, Filters } from "@/components/FilterBar";

export default function HomePage() {
  const [cars, setCars] = useState<Car[]>(SEED_CARS);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  useEffect(() => {
    // localStorage isn't available during SSR, so we render the seed data
    // first and swap in the full list (seed + locally added cars) after
    // mount to avoid a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCars(getAllCars());
  }, []);

  const brands = useMemo(
    () => Array.from(new Set(cars.map((c) => c.brand))).sort(),
    [cars]
  );

  const filtered = useMemo(() => {
    let result = cars.filter((c) => {
      const q = filters.query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        c.brand.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q);
      const matchesBrand = filters.brand === "All" || c.brand === filters.brand;
      const matchesFuel = filters.fuel === "All" || c.fuel === filters.fuel;
      const matchesTransmission =
        filters.transmission === "All" || c.transmission === filters.transmission;
      const matchesPrice = c.price <= filters.maxPrice;
      return (
        matchesQuery &&
        matchesBrand &&
        matchesFuel &&
        matchesTransmission &&
        matchesPrice
      );
    });

    switch (filters.sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "year-desc":
        result = [...result].sort((a, b) => b.year - a.year);
        break;
      case "km-asc":
        result = [...result].sort((a, b) => a.km - b.km);
        break;
      default:
        result = [...result].sort(
          (a, b) => Number(!!b.featured) - Number(!!a.featured)
        );
    }
    return result;
  }, [cars, filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <section className="relative mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-6 py-14 text-white sm:px-10 sm:py-16">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="relative animate-fade-up">
          <h1 className="max-w-2xl font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Buy your next used car, hassle-free.
          </h1>
          <p className="mt-4 max-w-xl text-blue-100/90">
            Transparent pricing, no haggling, and doorstep delivery. Find
            your next car from our inspected inventory in minutes.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white/5 px-5 py-3 text-sm ring-1 ring-white/10">
            <p className="font-[family-name:var(--font-heading)] text-xl font-bold">{cars.length}+</p>
            <p className="text-xs text-blue-100/70">cars available</p>
          </div>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:grid-cols-5 lg:gap-10">
        <div className="lg:col-span-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
            About us
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-slate-900">
            Why buy from First-Choice Automotive
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            First-Choice Automotive is a locally run used car dealership
            based in Madgulapally, Telangana. We buy, inspect, and
            recondition every vehicle ourselves before it reaches our
            showroom floor &mdash; no dealer network, no hidden middlemen,
            just a team that knows every car on the lot personally. Every
            listing here comes with a full inspection report and a
            transparent price, so you know exactly what you&rsquo;re paying for.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/locations"
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Visit our showroom
            </Link>
            <a
              href={`tel:${SALES_PHONE}`}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Call {SALES_PHONE}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:col-span-2">
          <div className="rounded-xl bg-blue-50 p-4">
            <p className="font-[family-name:var(--font-heading)] text-2xl font-extrabold text-blue-700">
              {BRANCH.rating}&#9733;
            </p>
            <p className="mt-1 text-xs text-slate-500">Rated on Google</p>
          </div>
          <div className="rounded-xl bg-blue-50 p-4">
            <p className="font-[family-name:var(--font-heading)] text-2xl font-extrabold text-blue-700">
              1
            </p>
            <p className="mt-1 text-xs text-slate-500">Showroom, personally run</p>
          </div>
          <div className="rounded-xl bg-blue-50 p-4">
            <p className="font-[family-name:var(--font-heading)] text-2xl font-extrabold text-blue-700">
              0
            </p>
            <p className="mt-1 text-xs text-slate-500">Middlemen or commission games</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <FilterBar filters={filters} onChange={setFilters} brands={brands} />
      </section>

      <section className="mt-6">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            {filtered.length} car{filtered.length !== 1 ? "s" : ""} found
          </h2>
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
            No cars match your filters. Try widening your budget or clearing
            filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
