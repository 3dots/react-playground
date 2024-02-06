import { create } from "zustand";

export class TestState {
  count: number = 0;

  public constructor(init?: Partial<TestState>) {
    Object.assign(this, init);
  }

  increaseCountAction(by: number): TestState {
    return new TestState({ ...this, count: this.count + by });
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
