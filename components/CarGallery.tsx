"use client";

import { useState } from "react";
import CarImage, { CarAngle } from "./CarImage";

const ANGLES: { key: CarAngle; label: string }[] = [
  { key: "front", label: "Front" },
  { key: "side", label: "Side" },
  { key: "rear", label: "Rear" },
];

export default function CarGallery({
  color,
  images,
}: {
  color: string;
  images?: string[];
}) {
  const hasPhotos = !!images && images.length > 0;

  const [angle, setAngle] = useState<CarAngle>("front");
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const mainPhoto = hasPhotos ? images![photoIndex] : null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightbox(true)}
        className="group relative block w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        aria-label="Open full-size image"
      >
        {mainPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element -- data URLs from localStorage, not a servable asset
          <img
            src={mainPhoto}
            alt="Car photo"
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <CarImage
            color={color}
            angle={angle}
            className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
          Click to zoom
        </span>
      </button>

      <div className="mt-3 flex gap-3">
        {hasPhotos
          ? images!.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPhotoIndex(i)}
                className={`flex-1 overflow-hidden rounded-lg border-2 transition ${
                  photoIndex === i
                    ? "border-blue-600"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- data URLs from localStorage */}
                <img src={src} alt={`Thumbnail ${i + 1}`} className="aspect-[4/3] w-full object-cover" />
              </button>
            ))
          : ANGLES.map((a) => (
              <button
                key={a.key}
                type="button"
                onClick={() => setAngle(a.key)}
                className={`flex-1 overflow-hidden rounded-lg border-2 transition ${
                  angle === a.key
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
            {mainPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element -- data URLs from localStorage
              <img src={mainPhoto} alt="Car photo, full size" className="w-full rounded-xl" />
            ) : (
              <CarImage color={color} angle={angle} className="w-full rounded-xl" />
            )}
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
