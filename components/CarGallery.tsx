"use client";

import { useState } from "react";
import CarImage, { CarAngle } from "./CarImage";

const ANGLES: { key: CarAngle; label: string }[] = [
  { key: "front", label: "Front" },
  { key: "side", label: "Side" },
  { key: "rear", label: "Rear" },
];

export default function CarGallery({ color }: { color: string }) {
  const [active, setActive] = useState<CarAngle>("front");
  const [lightbox, setLightbox] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightbox(true)}
        className="group relative block w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        aria-label="Open full-size image"
      >
        <CarImage
          color={color}
          angle={active}
          className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
          Click to zoom
        </span>
      </button>

      <div className="mt-3 flex gap-3">
        {ANGLES.map((a) => (
          <button
            key={a.key}
            type="button"
            onClick={() => setActive(a.key)}
            className={`flex-1 overflow-hidden rounded-lg border-2 transition ${
              active === a.key
                ? "border-blue-600"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <CarImage color={color} angle={a.key} className="w-full" />
            <span className="block bg-slate-50 py-1 text-center text-xs font-medium text-slate-500">
              {a.label}
            </span>
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setLightbox(false)}
        >
          <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <CarImage color={color} angle={active} className="w-full rounded-xl" />
            <button
              type="button"
              onClick={() => setLightbox(false)}
              className="mx-auto mt-4 block rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white hover:bg-white/20"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
