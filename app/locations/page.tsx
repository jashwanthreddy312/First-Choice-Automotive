import { BRANCHES } from "@/lib/locations";

function mapEmbedUrl(address: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

function mapLinkUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export const metadata = {
  title: "Our Locations — First-Choice Automotive",
};

export default function LocationsPage() {
  const flagship = BRANCHES.find((b) => b.flagship) ?? BRANCHES[0];
  const others = BRANCHES.filter((b) => b.id !== flagship.id);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
          Locations
        </span>
        <h1 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Visit a First-Choice Automotive hub
        </h1>
        <p className="mt-3 text-slate-600">
          Every car passes through one of our regional hubs for its
          200-point inspection before it&rsquo;s listed. Walk in for a test
          drive, or drop off your car for a free doorstep evaluation.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-3">
          <iframe
            title={`Map to ${flagship.name}`}
            src={mapEmbedUrl(flagship.address)}
            className="h-72 w-full border-0 sm:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 lg:col-span-2">
          <span className="rounded-full bg-blue-700 px-2.5 py-1 text-xs font-semibold text-white">
            Flagship hub
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-xl font-bold text-slate-900">
            {flagship.name}
          </h2>
          <p className="mt-2 text-sm text-slate-600">{flagship.address}</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-slate-400">Phone</dt>
              <dd className="font-medium text-slate-700">{flagship.phone}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-slate-400">Hours</dt>
              <dd className="font-medium text-slate-700">{flagship.hours}</dd>
            </div>
          </dl>
          <a
            href={mapLinkUrl(flagship.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Get directions
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path d="M7 17 17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      <h2 className="mt-14 font-[family-name:var(--font-heading)] text-xl font-bold text-slate-900">
        More hubs across India
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((b) => (
          <div key={b.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {b.city}
            </span>
            <h3 className="mt-1 font-[family-name:var(--font-heading)] text-base font-bold text-slate-900">
              {b.name}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{b.address}</p>
            <dl className="mt-3 space-y-1 text-xs text-slate-500">
              <div className="flex gap-1.5">
                <dt className="font-medium text-slate-400">Phone:</dt>
                <dd>{b.phone}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="font-medium text-slate-400">Hours:</dt>
                <dd>{b.hours}</dd>
              </div>
            </dl>
            <a
              href={mapLinkUrl(b.address)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline"
            >
              Get directions
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                <path d="M7 17 17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
