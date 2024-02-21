import type { GenericFunction, TryCatchWrapper } from "@/components/Common/common";

export interface IAppStateWrapper {
  state: AppState;
  resetState: () => void;
  errorTriggered: () => void;
  eventWrapper<F extends GenericFunction>(func: F): TryCatchWrapper<F>;
  testException: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

export class AppState {
  isError: boolean = false;
  isLoading: boolean = false;

  public constructor(init?: Partial<AppState>) {
    Object.assign(this, init);
  }

  static initialState(): AppState {
    return new AppState();
  }

  error(): AppState {
    return new AppState({...this, isError: true, isLoading: false});
  }

  setIsLoading(isLoading: boolean): AppState {
    return new AppState({...this, isLoading});
  }
}