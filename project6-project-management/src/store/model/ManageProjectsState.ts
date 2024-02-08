import { UsProject } from "./UsProject";

export interface IManageProjectsStateWrapper {
  state: ManageProjectsState;
  resetState: () => void;
  beginAddProjectAction: () => void;
  cancelAddProjectAction: () => void;
}

export class ManageProjectsState {
  isSplashScreen: boolean = true;
  isAddingProject: boolean = false;
  project: UsProject = new UsProject();
  projects: UsProject[] = [];

  public constructor(init?: Partial<ManageProjectsState>) {
    Object.assign(this, init);
  }

  static initialState(): ManageProjectsState {
    return new ManageProjectsState();
  }

  beginAddProjectAction(): ManageProjectsState {
    return new ManageProjectsState({ ...this, isAddingProject: true });
  }

  cancelAddProjectAction(): ManageProjectsState {
    return new ManageProjectsState({ ...this, isAddingProject: false });
  }

  isDuplicate(newProject: UsProject): boolean {
    return this.projects.some(x => x.title === newProject.title);
  }

  addProjectAction(newProject: UsProject): ManageProjectsState {
    return new ManageProjectsState({
      ...this,
      projects: [...this.projects, newProject],
      project: newProject,
      isAddingProject: false,
    });
  }
}
