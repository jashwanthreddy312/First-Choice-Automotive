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
      <section className="mt-8 rounded-2xl bg-gradient-to-br from-blue-800 to-blue-600 px-6 py-12 text-white sm:px-10">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Buy &amp; sell used cars, hassle-free
        </h1>
        <p className="mt-3 max-w-xl text-blue-100">
          200-point inspected cars, transparent pricing, and doorstep
          delivery. Find your next car in minutes.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-blue-100">
          <span className="rounded-full bg-white/10 px-4 py-1.5">
            {cars.length}+ cars available
          </span>
          <span className="rounded-full bg-white/10 px-4 py-1.5">
            Free RC transfer
          </span>
          <span className="rounded-full bg-white/10 px-4 py-1.5">
            5-day money-back guarantee
          </span>
        </div>
      </section>

      <section className="mt-6">
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
