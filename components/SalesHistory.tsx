import { Car } from "@/lib/types";
import { formatPrice } from "@/lib/data";

export default function SalesHistory({ cars }: { cars: Car[] }) {
  const sold = cars
    .filter((c) => c.status === "Sold")
    .slice()
    .sort((a, b) => (b.soldAt ?? "").localeCompare(a.soldAt ?? ""));

  const totalRevenue = sold.reduce((sum, c) => sum + (c.soldPrice ?? c.price), 0);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-slate-900">
          Sales history
        </h2>
        <p className="text-sm text-slate-500">
          {sold.length} car{sold.length !== 1 ? "s" : ""} sold &middot;{" "}
          {formatPrice(totalRevenue)} total
        </p>
      </div>

      {sold.length === 0 ? (
        <p className="mt-3 text-sm text-slate-400">
          No cars marked as sold yet. Use &ldquo;Mark Sold&rdquo; on a listing
          below to record a sale.
        </p>
      ) : (
        <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Car</th>
                <th className="px-4 py-3">Listed price</th>
                <th className="px-4 py-3">Sold price</th>
                <th className="px-4 py-3">Difference</th>
                <th className="px-4 py-3">Sold on</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sold.map((car) => {
                const soldPrice = car.soldPrice ?? car.price;
                const diff = soldPrice - car.price;
                return (
                  <tr key={car.id}>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {car.year} {car.brand} {car.model}
                    </td>
                    <td className="px-4 py-3 text-slate-500">{formatPrice(car.price)}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">
                      {formatPrice(soldPrice)}
                    </td>
                    <td
                      className={`px-4 py-3 font-medium ${
                        diff > 0 ? "text-green-600" : diff < 0 ? "text-red-600" : "text-slate-400"
                      }`}
                    >
                      {diff === 0
                        ? "—"
                        : `${diff > 0 ? "+" : "-"}${formatPrice(Math.abs(diff))}`}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {car.soldAt
                        ? new Date(car.soldAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
