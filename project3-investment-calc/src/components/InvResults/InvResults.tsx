import { FormattedCurrency, FormattedMessage } from "../Intl/Intl";
import type { IAnnualData } from "@/util/investment";
import cssClasses from "./InvResults.module.scss";
import { useInvCalculatorStore } from "@/store/invCalculatorStore";

export function InvResults() {
  const annualData: IAnnualData[] = useInvCalculatorStore(
    sw => sw.state.annualData,
  );

  const FormatCurrencyInvoke = function (props: { currValue: number }) {
    return (
      <FormattedCurrency
        currValue={props.currValue}
        minimumFractionDigits={0}
        maximumFractionDigits={0}
      />
    );
  };

  return (
    <section>
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
              <td>
                <FormatCurrencyInvoke currValue={x.valueEndOfYear} />
              </td>
              <td>
                <FormatCurrencyInvoke currValue={x.interest} />
              </td>
              <td>
                <FormatCurrencyInvoke currValue={x.totalInterest} />
              </td>
              <td>
                <FormatCurrencyInvoke currValue={x.investedCapital} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
