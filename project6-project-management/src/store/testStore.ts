import { create } from "zustand";

export class ManageProjectsState {
  isSplashScreen: boolean = true;
  isAddingProject: boolean = false;

  public constructor(init?: Partial<ManageProjectsState>) {
    Object.assign(this, init);
  }

  static initialState(): ManageProjectsState {
    return new ManageProjectsState();
  }

  addProjectAction(): ManageProjectsState {
    return new ManageProjectsState({ ...this, isAddingProject: true });
  }

  cancelAddProjectAction(): ManageProjectsState {
    return new ManageProjectsState({ ...this, isAddingProject: false });
  }
}

interface IManageProjectsStateWrapper {
  state: ManageProjectsState;
  addProjectAction: () => void;
  cancelAddProjectAction: () => void;
}

export const useProjectsStore = create<IManageProjectsStateWrapper>()(set => ({
  state: ManageProjectsState.initialState(),
  addProjectAction: () => set(sw => ({ state: sw.state.addProjectAction() })),
  cancelAddProjectAction: () =>
    set(sw => ({ state: sw.state.cancelAddProjectAction() })),
}));
