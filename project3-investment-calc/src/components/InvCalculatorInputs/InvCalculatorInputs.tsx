import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { IInvCalculatorInputs } from "@/features/inv-calculator/invCalculatorSlice";
import {
  selectInput,
  setAnnualInvestment,
  setDuration,
  setExpectedReturn,
  setInitialInvestment,
} from "@/features/inv-calculator/invCalculatorSlice";
import cssClasses from "./InvCalculatorInputs.module.scss";
import type { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { FormattedMessage } from "../Intl/Intl";

export function InvCalculatorInputs() {
  const dispatch = useAppDispatch();
  const inputs: IInvCalculatorInputs = useAppSelector(selectInput);

  const changeHandler = function (
    e: React.ChangeEvent<HTMLInputElement>,
    action: ActionCreatorWithPayload<number>,
  ) {
    dispatch(action(e.target.valueAsNumber));
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
          value={inputs.initialInvestment}
          onChange={e => changeHandler(e, setInitialInvestment)}
        />
      </label>
      <label>
        <div>
          <FormattedMessage id="lbl.annual.investment" />
        </div>
        <input
          type="number"
          required
          value={inputs.annualInvestment}
          onChange={e => changeHandler(e, setAnnualInvestment)}
        />
      </label>
      <label>
        <div>
          <FormattedMessage id="lbl.expected.return" />
        </div>
        <input
          type="number"
          required
          value={inputs.expectedReturn}
          onChange={e => changeHandler(e, setExpectedReturn)}
        />
      </label>
      <label>
        <div>
          <FormattedMessage id="lbl.duration" />
        </div>
        <input
          type="number"
          required
          value={inputs.duration}
          onChange={e => changeHandler(e, setDuration)}
        />
      </label>
    </section>
  );
}
