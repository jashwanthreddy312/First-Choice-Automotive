import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-700 to-blue-900 text-sm font-bold text-white shadow-sm">
            FA
          </span>
          <span className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight text-slate-900">
            First-Choice Automotive
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            Inventory
          </Link>
          <Link
            href="/locations"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            Locations
          </Link>
          <Link
            href="/admin"
            className="ml-1 rounded-md bg-blue-700 px-3.5 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
