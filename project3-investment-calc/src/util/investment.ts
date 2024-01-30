import type { IInvCalculatorInputs } from "@/features/inv-calculator/invCalculatorSlice"

export interface IAnnualData {
  year: number
  valueEndOfYear: number // investment value at end of year
  interest: number // the amount of interest earned in this year
  totalInterest: number
  investedCapital: number
}

export function calculateInvestmentResults(
  inputs: IInvCalculatorInputs,
): IAnnualData[] {
  const annualData: IAnnualData[] = [];

  let investmentValue = inputs.initialInvestment
  let totalInterest = 0
  let investedCapital = inputs.initialInvestment

  for (let i = 0; i < inputs.duration; i++) {
    const interestEarnedInYear = investmentValue * (inputs.expectedReturn / 100)
    investmentValue += interestEarnedInYear + inputs.annualInvestment
    totalInterest += interestEarnedInYear
    investedCapital += inputs.annualInvestment
    annualData.push({
      year: i + 1,
      valueEndOfYear: investmentValue,
      interest: interestEarnedInYear,
      totalInterest: totalInterest,
      investedCapital: investedCapital,
    })
  }

  return annualData
}

// The browser-provided Intl API is used to prepare a formatter object
// This object offers a "format()" method that can be used to format numbers as currency
// Example Usage: formatter.format(1000) => yields "$1,000"
export const currencyFormatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})
