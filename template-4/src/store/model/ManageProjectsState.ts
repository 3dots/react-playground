export interface IManageProjectsStateWrapper {
  state: ManageProjectsState;
  resetState: () => void;
  beginAddProjectAction: () => void;
}

export class ManageProjectsState {
  selectedIndex: number | null = null;

  public constructor(init?: Partial<ManageProjectsState>) {
    //const { project, projects, ...rest } = { ...init };
    Object.assign(this, init);

    //this.projects = assignArrayDirectlyIfTyped(projects, UsProject);
  }

  toLocalStorage(): Partial<ManageProjectsState> {
    return {
      ...this,
    };
  }

  static initialState(): ManageProjectsState {
    return new ManageProjectsState();
  }

  beginAddProjectAction(): ManageProjectsState {
    return new ManageProjectsState({
      ...this,
    });
  }

}
