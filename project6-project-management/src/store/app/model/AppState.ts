export interface IAppStateWrapper {
  state: AppState;
  resetState: () => void;
  errorTriggered: (msg?: string) => void;
  testException: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

export class AppState {
  isError: boolean = false;
  errorMsg: string = "";
  isLoading: boolean = false;

  public constructor(init?: Partial<AppState>) {
    Object.assign(this, init);
  }

  static initialState(): AppState {
    return new AppState();
  }

  error(msg?: string): AppState {
    return new AppState({...this, isError: true, isLoading: false, errorMsg: msg ?? ""});
  }

  setIsLoading(isLoading: boolean): AppState {
    return new AppState({...this, isLoading});
  }
}