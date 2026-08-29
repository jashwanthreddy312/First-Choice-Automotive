import Link from "next/link";
import { BRANCH, SALES_PHONE } from "@/lib/locations";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-500 sm:px-6">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
          <div>
            <p className="font-[family-name:var(--font-heading)] font-bold text-slate-800">
              First-Choice Automotive
            </p>
            <p className="mt-1 max-w-xl">
              Your neighbourhood used car dealership in Madgulapally &mdash;
              every car on our floor is personally inspected and priced
              transparently, no middlemen involved.
            </p>
          </div>
          <div className="flex gap-8 text-slate-500">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Explore
              </p>
              <ul className="space-y-1.5">
                <li><Link href="/" className="hover:text-slate-700">Inventory</Link></li>
                <li><Link href="/locations" className="hover:text-slate-700">Our locations</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Contact
              </p>
              <ul className="space-y-1.5">
                <li>
                  <a href={`tel:${SALES_PHONE}`} className="hover:text-slate-700">
                    {SALES_PHONE}
                  </a>
                </li>
                <li>{BRANCH.address}</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} First-Choice Automotive. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
