import { BRANCH } from "@/lib/locations";

function mapEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

function mapLinkUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export const metadata = {
  title: "Our Location — First-Choice Automotive",
};

export default function LocationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
          Location
        </span>
        <h1 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Visit our showroom
        </h1>
        <p className="mt-3 text-slate-600">
          Every car passes through a 200-point inspection before it&rsquo;s
          listed. Walk in for a test drive, or call ahead to check
          availability.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-3">
          <iframe
            title={`Map to ${BRANCH.name}`}
            src={mapEmbedUrl(BRANCH.plusCode)}
            className="h-72 w-full border-0 sm:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 lg:col-span-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-amber-600 ring-1 ring-amber-200">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6-5.9-3.3-5.9 3.3 1.3-6.6-4.9-4.5 6.6-.8L12 2.5z" />
            </svg>
            {BRANCH.rating} rated
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-xl font-bold text-slate-900">
            {BRANCH.name}
          </h2>
          <p className="mt-2 text-sm text-slate-600">{BRANCH.address}</p>
          <p className="mt-0.5 text-xs text-slate-400">{BRANCH.plusCode}</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-slate-400">Phone</dt>
              <dd className="font-medium text-slate-700">{BRANCH.phone}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-slate-400">Hours</dt>
              <dd className="font-medium text-slate-700">{BRANCH.hours}</dd>
            </div>
          </dl>
          <a
            href={mapLinkUrl(BRANCH.plusCode)}
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
    </div>
  );
}
