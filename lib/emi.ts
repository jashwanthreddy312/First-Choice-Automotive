export function calculateEmi(principal: number, annualRatePercent: number, months: number) {
  if (principal <= 0 || months <= 0) return 0;
  const monthlyRate = annualRatePercent / 12 / 100;
  if (monthlyRate === 0) return principal / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

// Assumptions used for the "EMI starts at" teaser shown on listing cards —
// longest tenure gives the lowest possible monthly figure, matching how
// dealerships typically advertise a starting EMI.
const STARTING_EMI_DOWN_PAYMENT_PCT = 20;
const STARTING_EMI_TENURE_MONTHS = 72;
const STARTING_EMI_RATE_PERCENT = 9.5;

export function getStartingEmi(price: number): number {
  const loanAmount = price * (1 - STARTING_EMI_DOWN_PAYMENT_PCT / 100);
  return Math.round(
    calculateEmi(loanAmount, STARTING_EMI_RATE_PERCENT, STARTING_EMI_TENURE_MONTHS)
  );
}
