"use client";

import { Car } from "./types";
import { SEED_CARS } from "./data";

const CUSTOM_KEY = "fcm_custom_cars";
const HIDDEN_KEY = "fcm_hidden_seed_ids";
const EDITS_KEY = "fcm_seed_edits";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export class StorageFullError extends Error {
  constructor() {
    super(
      "Your browser's storage is full. Try removing a photo or two, or delete an older listing, then try again."
    );
    this.name = "StorageFullError";
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    if (err instanceof DOMException && err.name === "QuotaExceededError") {
      throw new StorageFullError();
    }
    throw err;
  }
}

// ---------------------------------------------------------------------
// Browser-local fallback. Used whenever there's no shared database
// configured (or it's briefly unreachable) — every device stores its own
// copy, same limitation this app has always had. See getAllCars() below
// for how this is layered with the real /api/cars database.
// ---------------------------------------------------------------------

function getCustomCarsLocal(): Car[] {
  return read<Car[]>(CUSTOM_KEY, []);
}

function getHiddenSeedIdsLocal(): string[] {
  return read<string[]>(HIDDEN_KEY, []);
}

function getSeedEditsLocal(): Record<string, Partial<Car>> {
  return read<Record<string, Partial<Car>>>(EDITS_KEY, {});
}

function getAllCarsLocal(): Car[] {
  const hidden = new Set(getHiddenSeedIdsLocal());
  const edits = getSeedEditsLocal();
  const seed = SEED_CARS.filter((c) => !hidden.has(c.id)).map((c) => ({
    ...c,
    ...(edits[c.id] || {}),
  }));
  return [...getCustomCarsLocal(), ...seed];
}

function addCarLocal(car: Car) {
  write(CUSTOM_KEY, [car, ...getCustomCarsLocal()]);
}

function updateCarLocal(id: string, patch: Partial<Car>) {
  const custom = getCustomCarsLocal();
  if (custom.some((c) => c.id === id)) {
    write(
      CUSTOM_KEY,
      custom.map((c) => (c.id === id ? { ...c, ...patch } : c))
    );
    return;
  }
  const edits = getSeedEditsLocal();
  write(EDITS_KEY, { ...edits, [id]: { ...(edits[id] || {}), ...patch } });
}

function deleteCarLocal(id: string) {
  const custom = getCustomCarsLocal();
  if (custom.some((c) => c.id === id)) {
    write(
      CUSTOM_KEY,
      custom.filter((c) => c.id !== id)
    );
    return;
  }
  const hidden = getHiddenSeedIdsLocal();
  if (!hidden.includes(id)) write(HIDDEN_KEY, [...hidden, id]);
}

// ---------------------------------------------------------------------
// Public API — talks to /api/cars (backed by Azure Cosmos DB) when it's
// configured, and transparently falls back to the localStorage functions
// above when it isn't. A 501 from the API means "not configured" (expected,
// fall back silently); any other failure means the database IS configured
// but something actually broke — reads still fall back so the page doesn't
// crash, but writes throw instead of silently saving to the wrong place.
// ---------------------------------------------------------------------

type ApiOutcome<T> =
  | { ok: true; data: T }
  | { ok: false; reason: "not-configured" | "error" };

async function callApi<T>(path: string, init?: RequestInit): Promise<ApiOutcome<T>> {
  let res: Response;
  try {
    res = await fetch(path, init);
  } catch {
    // Network failure (offline, no dev server, etc.) — treat the same as
    // "not configured" so the app degrades gracefully instead of crashing.
    return { ok: false, reason: "not-configured" };
  }
  if (res.status === 501) return { ok: false, reason: "not-configured" };
  if (!res.ok) return { ok: false, reason: "error" };
  const data = (await res.json().catch(() => null)) as T;
  return { ok: true, data };
}

export async function getAllCars(): Promise<Car[]> {
  const result = await callApi<Car[]>("/api/cars");
  if (result.ok) return result.data;
  if (result.reason === "error") {
    console.error(
      "Could not reach the shared database — showing this browser's local data instead."
    );
  }
  return getAllCarsLocal();
}

export async function getCarById(id: string): Promise<Car | undefined> {
  const cars = await getAllCars();
  return cars.find((c) => c.id === id);
}

export async function addCar(car: Car): Promise<void> {
  const result = await callApi("/api/cars", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  });
  if (result.ok) return;
  if (result.reason === "error") {
    throw new Error("Could not save this listing to the shared database. Please try again.");
  }
  addCarLocal(car);
}

export async function updateCar(id: string, patch: Partial<Car>): Promise<void> {
  const result = await callApi(`/api/cars/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  if (result.ok) return;
  if (result.reason === "error") {
    throw new Error("Could not save this change to the shared database. Please try again.");
  }
  updateCarLocal(id, patch);
}

export async function deleteCar(id: string): Promise<void> {
  const result = await callApi(`/api/cars/${id}`, { method: "DELETE" });
  if (result.ok) return;
  if (result.reason === "error") {
    throw new Error("Could not delete this listing from the shared database. Please try again.");
  }
  deleteCarLocal(id);
}

export function nextCustomId(): string {
  return `custom-${Date.now()}`;
}
