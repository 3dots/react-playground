import { selectAnnualData } from "@/features/inv-calculator/invCalculatorSlice"
import { FormattedMessage } from "../Intl/Intl"
import { useAppSelector } from "@/app/hooks"
import type { IAnnualData } from "@/util/investment"
import { currencyFormatter } from "@/util/investment"
import cssClasses from "./InvResults.module.scss"

export function InvResults() {
  const annualData: IAnnualData[] = useAppSelector(selectAnnualData)
  const formatCurrency = (cur: number) => currencyFormatter.format(cur)

  return (
    <table className={cssClasses.result}>
      <thead>
        <tr>
          <th scope="col">
            <FormattedMessage id="col.year" />
          </th>
          <th scope="col">
            <FormattedMessage id="col.investment.value" />
          </th>
          <th scope="col">
            <FormattedMessage id="col.interest.year" />
          </th>
          <th scope="col">
            <FormattedMessage id="col.total.interest" />
          </th>
          <th scope="col">
            <FormattedMessage id="col.invested.capital" />
          </th>
        </tr>
      </thead>
      <tbody>
        {annualData.map((x: IAnnualData) => (
          <tr key={x.year}>
            <td>{x.year}</td>
            <td>{formatCurrency(x.valueEndOfYear)}</td>
            <td>{formatCurrency(x.interest)}</td>
            <td>{formatCurrency(x.totalInterest)}</td>
            <td>{formatCurrency(x.investedCapital)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
