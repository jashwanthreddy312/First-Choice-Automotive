"use client";

export type Filters = {
  query: string;
  brand: string;
  fuel: string;
  transmission: string;
  maxPrice: number;
  sort: string;
};

export const DEFAULT_FILTERS: Filters = {
  query: "",
  brand: "All",
  fuel: "All",
  transmission: "All",
  maxPrice: 2500000,
  sort: "featured",
};

export default function FilterBar({
  filters,
  onChange,
  brands,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  brands: string[];
}) {
  function update<K extends keyof Filters>(key: K, value: Filters[K]) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <input
          type="text"
          placeholder="Search brand or model..."
          value={filters.query}
          onChange={(e) => update("query", e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm lg:col-span-2"
        />
        <select
          value={filters.brand}
          onChange={(e) => update("brand", e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option>All</option>
          {brands.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
        <select
          value={filters.fuel}
          onChange={(e) => update("fuel", e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          {["All", "Petrol", "Diesel", "CNG", "Electric"].map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
        <select
          value={filters.transmission}
          onChange={(e) => update("transmission", e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          {["All", "Manual", "Automatic"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select
          value={filters.sort}
          onChange={(e) => update("sort", e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="featured">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="year-desc">Year: Newest First</option>
          <option value="km-asc">Mileage: Lowest First</option>
        </select>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <label className="text-xs font-medium text-slate-500">
          Max budget: ₹{(filters.maxPrice / 100000).toFixed(1)} Lakh
        </label>
        <input
          type="range"
          min={200000}
          max={2500000}
          step={50000}
          value={filters.maxPrice}
          onChange={(e) => update("maxPrice", Number(e.target.value))}
          className="w-full max-w-xs accent-blue-700"
        />
      </div>
    </div>
  );
}
