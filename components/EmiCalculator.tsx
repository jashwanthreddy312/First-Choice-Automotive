"use client";

import { useMemo, useState } from "react";
import { formatPrice } from "@/lib/data";
import { calculateEmi } from "@/lib/emi";

const TENURE_OPTIONS = [12, 24, 36, 48, 60, 72];

export default function EmiCalculator({ price }: { price: number }) {
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [tenure, setTenure] = useState(48);
  const [rate, setRate] = useState(9.5);

  const { downPayment, loanAmount, emi, totalPayment, totalInterest } = useMemo(() => {
    const downPayment = Math.round((price * downPaymentPct) / 100);
    const loanAmount = price - downPayment;
    const emi = Math.round(calculateEmi(loanAmount, rate, tenure));
    const totalPayment = emi * tenure;
    const totalInterest = Math.max(0, totalPayment - loanAmount);
    return { downPayment, loanAmount, emi, totalPayment, totalInterest };
  }, [price, downPaymentPct, tenure, rate]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-slate-900">
        EMI calculator
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Estimate your monthly installment. Actual offers depend on your
        lender and credit profile.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="downpayment" className="font-medium text-slate-700">
                Down payment
              </label>
              <span className="text-slate-500">
                {downPaymentPct}% &middot; {formatPrice(downPayment)}
              </span>
            </div>
            <input
              id="downpayment"
              type="range"
              min={0}
              max={80}
              step={5}
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(Number(e.target.value))}
              className="mt-2 w-full accent-blue-700"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="tenure" className="font-medium text-slate-700">
                Loan tenure
              </label>
              <span className="text-slate-500">{tenure} months</span>
            </div>
            <select
              id="tenure"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="input mt-2"
            >
              {TENURE_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m} months ({Math.round(m / 12)} yr{m > 12 ? "s" : ""})
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="rate" className="font-medium text-slate-700">
                Interest rate (p.a.)
              </label>
              <span className="text-slate-500">{rate}%</span>
            </div>
            <input
              id="rate"
              type="range"
              min={7}
              max={16}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="mt-2 w-full accent-blue-700"
            />
          </div>
        </div>

        <div className="rounded-xl bg-blue-50 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-blue-700/80">
            Estimated monthly EMI
          </p>
          <p className="mt-1 font-[family-name:var(--font-heading)] text-3xl font-extrabold text-blue-700">
            {formatPrice(emi)}<span className="text-base font-semibold">/mo</span>
          </p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Loan amount</dt>
              <dd className="font-medium text-slate-800">{formatPrice(loanAmount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Total interest</dt>
              <dd className="font-medium text-slate-800">{formatPrice(totalInterest)}</dd>
            </div>
            <div className="flex justify-between border-t border-blue-100 pt-2">
              <dt className="text-slate-500">Total payable</dt>
              <dd className="font-semibold text-slate-800">{formatPrice(totalPayment)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
