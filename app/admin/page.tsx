"use client";

import { useEffect, useState } from "react";
import { Car, FuelType, Transmission } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import {
  addCar,
  deleteCar,
  getAllCars,
  nextCustomId,
  updateCar,
} from "@/lib/store";
import PhotoUploader from "@/components/PhotoUploader";

// Demo-only gate. This is NOT real authentication — anyone can read this
// password from the source code. Replace with real auth (e.g. Supabase
// Auth) before putting an admin panel like this in production.
const ADMIN_PASSWORD = "admin123";

const EMPTY_FORM = {
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  price: "",
  km: "",
  fuel: "Petrol" as FuelType,
  transmission: "Manual" as Transmission,
  owners: 1,
  location: "",
  color: "#2b6cb0",
  images: [] as string[],
  description: "",
  status: "Live" as Car["status"],
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    // sessionStorage isn't available during SSR, so the login check has
    // to happen client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (sessionStorage.getItem("fcm_admin") === "1") setAuthed(true);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (authed) setCars(getAllCars());
  }, [authed]);

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("fcm_admin", "1");
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password.");
    }
  }

  function refresh() {
    setCars(getAllCars());
  }

  function startEdit(car: Car) {
    setEditingId(car.id);
    setForm({
      brand: car.brand,
      model: car.model,
      year: car.year,
      price: String(car.price),
      km: String(car.km),
      fuel: car.fuel,
      transmission: car.transmission,
      owners: car.owners,
      location: car.location,
      color: car.color,
      images: car.images ?? [],
      description: car.description,
      status: car.status ?? "Live",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: Partial<Car> = {
      brand: form.brand.trim(),
      model: form.model.trim(),
      year: Number(form.year),
      price: Number(form.price),
      km: Number(form.km),
      fuel: form.fuel,
      transmission: form.transmission,
      owners: Number(form.owners),
      location: form.location.trim(),
      color: form.color,
      images: form.images,
      description: form.description.trim(),
      status: form.status,
    };

    if (editingId) {
      updateCar(editingId, payload);
    } else {
      addCar({ id: nextCustomId(), ...payload } as Car);
    }
    cancelEdit();
    refresh();
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this listing? This cannot be undone.")) return;
    deleteCar(id);
    refresh();
  }

  function toggleSold(car: Car) {
    updateCar(car.id, { status: car.status === "Sold" ? "Live" : "Sold" });
    refresh();
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm px-4 py-20">
        <h1 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-slate-900">Admin login</h1>
        <p className="mt-1 text-sm text-slate-500">
          Demo password: <code className="rounded bg-slate-100 px-1">admin123</code>
        </p>
        <form onSubmit={login} className="mt-4 space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Log in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-slate-900">Admin panel</h1>
      <p className="mt-1 text-sm text-slate-500">
        Add, edit, or remove listings. Changes are saved to this browser only
        (see the deployment guide to connect a real database).
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-4"
      >
        <input required placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="input" />
        <input required placeholder="Model" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className="input" />
        <input required type="number" placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} className="input" />
        <input required type="number" placeholder="Price (₹)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input" />
        <input required type="number" placeholder="KM driven" value={form.km} onChange={(e) => setForm({ ...form, km: e.target.value })} className="input" />
        <select value={form.fuel} onChange={(e) => setForm({ ...form, fuel: e.target.value as FuelType })} className="input">
          {["Petrol", "Diesel", "CNG", "Electric"].map((f) => <option key={f}>{f}</option>)}
        </select>
        <select value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value as Transmission })} className="input">
          {["Manual", "Automatic"].map((t) => <option key={t}>{t}</option>)}
        </select>
        <input required placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input" />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input col-span-2 sm:col-span-3" />
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-500">Fallback color</span>
          <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="h-10 w-full rounded-lg border border-slate-300" />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-500">Status</span>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Car["status"] })} className="input">
            {["Live", "Sold", "Pending Inspection"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>

        <div className="col-span-2 sm:col-span-4">
          <span className="mb-1.5 block text-xs font-medium text-slate-500">Photos</span>
          <PhotoUploader images={form.images} onChange={(images) => setForm({ ...form, images })} />
        </div>

        <div className="col-span-2 flex gap-2 sm:col-span-4">
          <button type="submit" className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
            {editingId ? "Save changes" : "Add listing"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Car</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cars.map((car) => (
              <tr key={car.id}>
                <td className="flex items-center gap-3 px-4 py-3 font-medium text-slate-800">
                  {car.images && car.images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element -- data URLs from localStorage
                    <img src={car.images[0]} alt="" className="h-9 w-12 rounded object-cover" />
                  ) : (
                    <span
                      className="h-9 w-12 shrink-0 rounded"
                      style={{ backgroundColor: car.color }}
                      title="Using generated illustration, no photos uploaded"
                    />
                  )}
                  {car.year} {car.brand} {car.model}
                </td>
                <td className="px-4 py-3">{formatPrice(car.price)}</td>
                <td className="px-4 py-3">{car.location}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      car.status === "Sold"
                        ? "bg-slate-800 text-white"
                        : car.status === "Pending Inspection"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {car.status ?? "Live"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => toggleSold(car)} className="mr-3 text-slate-600 hover:underline">
                    {car.status === "Sold" ? "Mark Live" : "Mark Sold"}
                  </button>
                  <button onClick={() => startEdit(car)} className="mr-3 text-blue-700 hover:underline">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(car.id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
