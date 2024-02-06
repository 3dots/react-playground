import { create } from "zustand";

export class InvCalculatorState {
  initialInvestment: number = 0;
  annualInvestment: number = 0;
  expectedReturn: number = 0;
  duration: number = 0;

  public constructor(init?: Partial<InvCalculatorState>) {
    Object.assign(this, init);
  }

  //can later extend this if have nested classes to use constructors for those
  copy() {
    return { ...this }; 
  }

  setInitialInvestmentAction(x: number): InvCalculatorState {
    return new InvCalculatorState({ ...this.copy(), initialInvestment: x });
  }
  
}

interface ITestStateWrapper {
  state: TestState;
  increaseCountAction: (by: number) => void;
}

export const useTestStore = create<ITestStateWrapper>()(set => ({
  state: new TestState(),
  increaseCountAction: by =>
    set(sw => ({ state: sw.state.increaseCountAction(by) })),
}));
