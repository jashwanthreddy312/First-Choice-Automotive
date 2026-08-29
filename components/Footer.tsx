export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-500 sm:px-6">
        <p className="font-semibold text-slate-700">First Choice Motors</p>
        <p className="mt-1 max-w-xl">
          A demo used-car marketplace built to learn how platforms like
          Cars24 and Spinny work &mdash; browse listings, filter by budget,
          and submit your own car for sale.
        </p>
        <p className="mt-4 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} First Choice Motors. Demo project
          &mdash; not a real dealership.
        </p>
      </div>
    </footer>
  );
}
