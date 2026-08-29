import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-500 sm:px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div>
            <p className="font-[family-name:var(--font-heading)] font-bold text-slate-800">
              First-Choice Automotive
            </p>
            <p className="mt-1 max-w-xl">
              A demo used-car marketplace built to learn how platforms like
              Cars24 and Spinny work &mdash; browse listings, filter by
              budget, and submit your own car for sale.
            </p>
          </div>
          <div className="flex gap-8 text-slate-500">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Explore
              </p>
              <ul className="space-y-1.5">
                <li><Link href="/" className="hover:text-slate-700">Buy a car</Link></li>
                <li><Link href="/sell" className="hover:text-slate-700">Sell your car</Link></li>
                <li><Link href="/locations" className="hover:text-slate-700">Our locations</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} First-Choice Automotive. Demo
          project &mdash; not a real dealership.
        </p>
      </div>
    </footer>
  );
}
