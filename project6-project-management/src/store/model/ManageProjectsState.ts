import { UsProject } from "./UsProject";

export interface IManageProjectsStateWrapper {
  state: ManageProjectsState;
  resetState: () => void;
  beginAddProjectAction: () => void;
  cancelAddProjectAction: () => void;
  addProjectAction: (newProject: UsProject) => void;
}

export class ManageProjectsState {
  isSplashScreen: boolean = true;
  isAddingNewProject: boolean = false;
  project: UsProject = new UsProject();
  projects: UsProject[] = [];

  public constructor(init?: Partial<ManageProjectsState>) {
    Object.assign(this, init);
  }

  static initialState(): ManageProjectsState {
    return new ManageProjectsState();
  }

  beginAddProjectAction(): ManageProjectsState {
    return new ManageProjectsState({ ...this, isAddingNewProject: true, project: new UsProject() });
  }

  cancelAddProjectAction(): ManageProjectsState {
    return new ManageProjectsState({ ...this, isAddingNewProject: false });
  }

  isDuplicate: (title: string) => boolean = (title: string) => {
    title = title.trim();
    if (!title) return false;
    if (this.isAddingNewProject) return this.projects.some(x => x.title === title);
    const projectsOtherThanThisOne = this.projects.filter(x => x.title !== this.project.title);
    return projectsOtherThanThisOne.some(x => x.title === title);
  }

  addProjectAction(newProject: UsProject): ManageProjectsState {
    return new ManageProjectsState({
      ...this,
      projects: [...this.projects, newProject],
      project: newProject,
      isAddingNewProject: false,
    });
  }
}
