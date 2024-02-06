import { IAnnualData, calculateInvestmentResults } from "@/util/investment";
import { create } from "zustand";

export class InvCalculatorState {
  initialInvestment: number = 0;
  annualInvestment: number = 0;
  expectedReturn: number = 0;
  duration: number = 0;

  annualData: IAnnualData[] = [];

  public constructor(init?: Partial<InvCalculatorState>) {
    //const { annualData, ...rest } = { ...init };
    Object.assign(this, init);
  }

  //can later extend this if have nested classes to use constructors for those
  copy() {
    return { ...this };
  }

  static initialState(): InvCalculatorState {
    const state = new InvCalculatorState({
      initialInvestment: 10000,
      annualInvestment: 1000,
      expectedReturn: 5,
      duration: 10,
    });
    state.computeAnnualData();
    return state;
  }

  computeAnnualData() {
    this.annualData = calculateInvestmentResults(this);
  }

  setInitialInvestmentAction(x: number): InvCalculatorState {
    const state = new InvCalculatorState({
      ...this.copy(),
      initialInvestment: x,
    });
    state.computeAnnualData();
    return state;
  }

  setAnnualInvestmentAction(x: number): InvCalculatorState {
    const state = new InvCalculatorState({
      ...this.copy(),
      annualInvestment: x,
    });
    state.computeAnnualData();
    return state;
  }

  setExpectedReturnAction(x: number): InvCalculatorState {
    const state = new InvCalculatorState({ ...this.copy(), expectedReturn: x });
    state.computeAnnualData();
    return state;
  }

  setDurationAction(x: number): InvCalculatorState {
    const state = new InvCalculatorState({ ...this.copy(), duration: x });
    state.computeAnnualData();
    return state;
  }
}

interface IInvCalculatorStateWrapper {
  state: InvCalculatorState;
  setInitialInvestmentAction: (x: number) => void;
  setAnnualInvestmentAction: (x: number) => void;
  setExpectedReturnAction: (x: number) => void;
  setDurationAction: (x: number) => void;
}

export const useInvCalculatorStore = create<IInvCalculatorStateWrapper>()(
  set => ({
    state: InvCalculatorState.initialState(),
    setInitialInvestmentAction: x =>
      set(sw => ({ state: sw.state.setInitialInvestmentAction(x) })),
    setAnnualInvestmentAction: x =>
      set(sw => ({ state: sw.state.setAnnualInvestmentAction(x) })),
    setExpectedReturnAction: x =>
      set(sw => ({ state: sw.state.setExpectedReturnAction(x) })),
    setDurationAction: x =>
      set(sw => ({ state: sw.state.setDurationAction(x) })),
  }),
);
