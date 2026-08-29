import { Car } from "@/lib/types";
import { getInspectionReport, getOverallScore, InspectionStatus } from "@/lib/inspection";

const STATUS_STYLE: Record<InspectionStatus, string> = {
  Good: "bg-green-100 text-green-700",
  Fair: "bg-amber-100 text-amber-700",
  "Needs Attention": "bg-red-100 text-red-700",
};

const STATUS_DOT: Record<InspectionStatus, string> = {
  Good: "bg-green-500",
  Fair: "bg-amber-500",
  "Needs Attention": "bg-red-500",
};

export default function QualityReport({ car }: { car: Car }) {
  const report = getInspectionReport(car);
  const score = getOverallScore(report);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-slate-900">
            Quality report
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Generated as part of our 200-point inspection.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-2.5">
          <span className="font-[family-name:var(--font-heading)] text-2xl font-extrabold text-blue-700">
            {score}
          </span>
          <span className="text-xs leading-tight text-blue-700/80">
            out of 100
            <br />
            condition score
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {report.map((item) => (
          <div
            key={item.category}
            className="rounded-xl border border-slate-100 bg-slate-50 p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span className={`h-2 w-2 rounded-full ${STATUS_DOT[item.status]}`} />
                {item.category}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLE[item.status]}`}
              >
                {item.status}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">{item.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
