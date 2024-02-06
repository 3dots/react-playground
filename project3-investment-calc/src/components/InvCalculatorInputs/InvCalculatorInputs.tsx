import cssClasses from "./InvCalculatorInputs.module.scss";
import { FormattedMessage } from "../Intl/Intl";
import { useInvCalculatorStore } from "@/store/invCalculatorStore";

export function InvCalculatorInputs() {
  const sw = useInvCalculatorStore();
  const state = sw.state;

  const changeHandler = function (
    e: React.ChangeEvent<HTMLInputElement>,
    action: (x: number) => void,
  ) {
    action(e.target.valueAsNumber);
  };

  return (
    <section className={cssClasses["user-input"]}>
      <label>
        <div>
          <FormattedMessage id="lbl.initial.investment" />
        </div>
        <input
          type="number"
          required
          value={state.initialInvestment}
          onChange={e => changeHandler(e, sw.setInitialInvestmentAction)}
        />
      </label>
      <label>
        <div>
          <FormattedMessage id="lbl.annual.investment" />
        </div>
        <input
          type="number"
          required
          value={state.annualInvestment}
          onChange={e => changeHandler(e, sw.setAnnualInvestmentAction)}
        />
      </label>
      <label>
        <div>
          <FormattedMessage id="lbl.expected.return" />
        </div>
        <input
          type="number"
          required
          value={state.expectedReturn}
          onChange={e => changeHandler(e, sw.setExpectedReturnAction)}
        />
      </label>
      <label>
        <div>
          <FormattedMessage id="lbl.duration" />
        </div>
        <input
          type="number"
          required
          value={state.duration}
          onChange={e => changeHandler(e, sw.setDurationAction)}
        />
      </label>
    </section>
  );
}
