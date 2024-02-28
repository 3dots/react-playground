export interface IAppStateWrapper {
  state: AppState;
  resetState: () => void;
  errorTriggered: (msg?: string) => void;
  testException: () => void;
  setIsLoading: (isLoading: boolean) => void;
  login: (isAuthenticated: boolean) => void;
}

export class AppState {
  isError: boolean = false;
  errorMsg: string = "";
  timeStamp: string = "";

  isLoading: boolean = false;

  isAuthenticated: boolean = false;

  public constructor(init?: Partial<AppState>) {
    Object.assign(this, init);
  }

  static initialState(): AppState {
    return new AppState();
  }

  error(msg?: string): AppState {
    return new AppState({
      ...this,
      isError: true,
      isLoading: false,
      errorMsg: msg ?? "",
      timeStamp: new Date().toString(),
    });
  }

  setIsLoading(isLoading: boolean): AppState {
    return new AppState({ ...this, isLoading });
  }

  login(isAuthenticated: boolean) {
    return new AppState({ ...this, isAuthenticated });
  }
}
