import { create } from 'zustand'

export class TestState {
  count: number = 0;

  public constructor(init?: Partial<TestState>) {
    Object.assign(this, init);
  }

  static increaseCount(prev: TestState, by: number) : TestState {
    return new TestState({ ...prev, count: prev.count + by });
  }
}

interface ITestStateWrapper {
  state: TestState
  increaseCount: (by: number) => void
}

export const useBearStore = create<ITestStateWrapper>()((set) => ({
  state: new TestState(),
  increaseCount: (by) => set((sw) => {
    return { state: TestState.increaseCount(sw.state, by) };
  }, true),
}))