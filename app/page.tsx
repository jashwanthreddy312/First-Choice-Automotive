"use client";

import { useEffect, useMemo, useState } from "react";
import { Car } from "@/lib/types";
import { SEED_CARS } from "@/lib/data";
import { getAllCars } from "@/lib/store";
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
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-100 ring-1 ring-white/15">
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
              <path d="M12 2 3 6v6c0 5 3.8 8.7 9 10 5.2-1.3 9-5 9-10V6l-9-4Z" stroke="currentColor" strokeWidth="1.6" />
              <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            200-point inspected &middot; warranty included
          </span>
          <h1 className="mt-5 max-w-2xl font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Buy &amp; sell used cars, hassle-free.
          </h1>
          <p className="mt-4 max-w-xl text-blue-100/90">
            Transparent pricing, no haggling, and doorstep delivery. Find
            your next car in minutes &mdash; or get an instant estimate for
            the one you&rsquo;re driving now.
          </p>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl bg-white/5 px-3 py-3 text-center ring-1 ring-white/10">
              <p className="font-[family-name:var(--font-heading)] text-xl font-bold">{cars.length}+</p>
              <p className="mt-0.5 text-xs text-blue-100/70">cars available</p>
            </div>
            <div className="rounded-xl bg-white/5 px-3 py-3 text-center ring-1 ring-white/10">
              <p className="font-[family-name:var(--font-heading)] text-xl font-bold">Free</p>
              <p className="mt-0.5 text-xs text-blue-100/70">RC transfer</p>
            </div>
            <div className="rounded-xl bg-white/5 px-3 py-3 text-center ring-1 ring-white/10">
              <p className="font-[family-name:var(--font-heading)] text-xl font-bold">5-day</p>
              <p className="mt-0.5 text-xs text-blue-100/70">money-back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { step: "01", title: "Search & compare", body: "Filter by budget, fuel and brand across our inspected inventory." },
          { step: "02", title: "Book a test drive", body: "Request a callback and take it for a spin at your convenience." },
          { step: "03", title: "Drive home", body: "Free RC transfer and doorstep delivery once you're ready to buy." },
        ].map((s) => (
          <div key={s.step} className="rounded-xl border border-slate-200 bg-white p-4">
            <span className="font-[family-name:var(--font-heading)] text-sm font-bold text-blue-700">{s.step}</span>
            <h3 className="mt-1 font-[family-name:var(--font-heading)] text-base font-bold text-slate-900">{s.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{s.body}</p>
          </div>
        ))}
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
