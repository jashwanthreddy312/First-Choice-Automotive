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

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getCustomCars(): Car[] {
  return read<Car[]>(CUSTOM_KEY, []);
}

export function getHiddenSeedIds(): string[] {
  return read<string[]>(HIDDEN_KEY, []);
}

export function getSeedEdits(): Record<string, Partial<Car>> {
  return read<Record<string, Partial<Car>>>(EDITS_KEY, {});
}

export function getAllCars(): Car[] {
  const hidden = new Set(getHiddenSeedIds());
  const edits = getSeedEdits();
  const seed = SEED_CARS.filter((c) => !hidden.has(c.id)).map((c) => ({
    ...c,
    ...(edits[c.id] || {}),
  }));
  return [...getCustomCars(), ...seed];
}

export function getCarById(id: string): Car | undefined {
  return getAllCars().find((c) => c.id === id);
}

export function addCar(car: Car) {
  const custom = getCustomCars();
  write(CUSTOM_KEY, [car, ...custom]);
}

export function updateCar(id: string, patch: Partial<Car>) {
  const custom = getCustomCars();
  if (custom.some((c) => c.id === id)) {
    write(
      CUSTOM_KEY,
      custom.map((c) => (c.id === id ? { ...c, ...patch } : c))
    );
    return;
  }
  const edits = getSeedEdits();
  write(EDITS_KEY, { ...edits, [id]: { ...(edits[id] || {}), ...patch } });
}

export function deleteCar(id: string) {
  const custom = getCustomCars();
  if (custom.some((c) => c.id === id)) {
    write(
      CUSTOM_KEY,
      custom.filter((c) => c.id !== id)
    );
    return;
  }
  const hidden = getHiddenSeedIds();
  if (!hidden.includes(id)) write(HIDDEN_KEY, [...hidden, id]);
}

export function nextCustomId(): string {
  return `custom-${Date.now()}`;
}
