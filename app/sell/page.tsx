"use client";

import { useState } from "react";
import Link from "next/link";
import { addCar, nextCustomId } from "@/lib/store";
import { Car, FuelType, Transmission } from "@/lib/types";

const PALETTE = ["#e2504b", "#2b6cb0", "#38761d", "#b45309", "#7c3aed", "#0f766e"];

export default function SellPage() {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: "",
    km: "",
    fuel: "Petrol" as FuelType,
    transmission: "Manual" as Transmission,
    owners: 1,
    location: "",
    description: "",
  });
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const car: Car = {
      id: nextCustomId(),
      brand: form.brand.trim(),
      model: form.model.trim(),
      year: Number(form.year),
      price: Number(form.price),
      km: Number(form.km),
      fuel: form.fuel,
      transmission: form.transmission,
      owners: Number(form.owners),
      location: form.location.trim(),
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      description: form.description.trim() || "Seller-submitted listing.",
      status: "Pending Inspection",
    };
    addCar(car);
    setDone(true);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-slate-900">
          Thanks for submitting your car!
        </h1>
        <p className="mt-3 text-slate-600">
          Your listing has been added as{" "}
          <span className="font-semibold">Pending Inspection</span>. Our team
          will reach out to schedule a free doorstep inspection before it
          goes live.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Browse other cars
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-slate-900">Sell your car</h1>
      <p className="mt-2 text-sm text-slate-500">
        Tell us about your car and get an instant estimated price. A team
        member will schedule a free inspection.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Brand">
            <input
              required
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="input"
              placeholder="e.g. Maruti Suzuki"
            />
          </Field>
          <Field label="Model">
            <input
              required
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              className="input"
              placeholder="e.g. Swift VXI"
            />
          </Field>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Year">
            <input
              required
              type="number"
              min={1990}
              max={new Date().getFullYear()}
              value={form.year}
              onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
              className="input"
            />
          </Field>
          <Field label="KM driven">
            <input
              required
              type="number"
              min={0}
              value={form.km}
              onChange={(e) => setForm({ ...form, km: e.target.value })}
              className="input"
            />
          </Field>
          <Field label="Owners">
            <input
              required
              type="number"
              min={1}
              max={5}
              value={form.owners}
              onChange={(e) => setForm({ ...form, owners: Number(e.target.value) })}
              className="input"
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Fuel type">
            <select
              value={form.fuel}
              onChange={(e) => setForm({ ...form, fuel: e.target.value as FuelType })}
              className="input"
            >
              {["Petrol", "Diesel", "CNG", "Electric"].map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </Field>
          <Field label="Transmission">
            <select
              value={form.transmission}
              onChange={(e) =>
                setForm({ ...form, transmission: e.target.value as Transmission })
              }
              className="input"
            >
              {["Manual", "Automatic"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Expected price (₹)">
            <input
              required
              type="number"
              min={0}
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="input"
              placeholder="e.g. 650000"
            />
          </Field>
          <Field label="Location / City">
            <input
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="input"
              placeholder="e.g. Bengaluru"
            />
          </Field>
        </div>

        <Field label="Description (optional)">
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="input min-h-24"
            placeholder="Any notable features, service history, accidents..."
          />
        </Field>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Submit my car
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-500">{label}</span>
      {children}
    </label>
  );
}
