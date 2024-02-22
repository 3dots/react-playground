import { UsProject } from "./UsProject";
import type { UsTask } from "./UsTask";
import { assignArrayDirectlyIfTyped } from "../../util/util";

export interface IManageProjectsStateWrapper {
  state: ManageProjectsState;
  resetState: () => void;
  beginAddProjectAction: () => void;
  cancelAddEditProjectAction: () => void;
  addProjectAction: (newProject: UsProject) => void;
  beginEditProjectAction: () => void;
  editProjectAction: (
    currentProject: UsProject,
    editedProject: UsProject,
  ) => void;
  deleteProjectAction: (currentProject: UsProject) => void;
  selectProjectAction: (index: number) => void;
  addTask: (project: UsProject, newTask: UsTask) => void;
  deleteTask: (project: UsProject, taskToDelete: UsTask) => void;
  testException: () => void;
}

export class ManageProjectsState {
  selectedIndex: number | null = null;
  isAddingNewProject: boolean = false;
  isEditingProject: boolean = false;
  project: UsProject = new UsProject();
  projects: UsProject[] = [];

  public constructor(init?: Partial<ManageProjectsState>) {
    const { project, projects, ...rest } = { ...init };
    Object.assign(this, rest);

    this.projects = assignArrayDirectlyIfTyped(projects, UsProject);

    if (
      !this.isAddingNewProject &&
      !this.isEditingProject &&
      this.selectedIndex !== null &&
      this.selectedIndex >= 0 &&
      this.selectedIndex < this.projects.length
    ) {
      this.project = this.projects[this.selectedIndex];
    } else if (project instanceof UsProject) {
      this.project = project;
    } else if (project) {
      this.project = new UsProject(project);
    }
  }

  toLocalStorage(): Partial<ManageProjectsState> {
    return {
      ...this,
      isAddingNewProject: undefined,
      isEditingProject: undefined,
      project: undefined,
    };
  }

  static initialState(): ManageProjectsState {
    return new ManageProjectsState();
  }

  beginAddProjectAction(): ManageProjectsState {
    return new ManageProjectsState({
      ...this,
      isAddingNewProject: true,
      project: new UsProject(),
    });
  }

  cancelAddEditProjectAction(): ManageProjectsState {
    return new ManageProjectsState({
      ...this,
      isAddingNewProject: false,
      isEditingProject: false,
    });
  }

  isDuplicate(title: string) {
    title = title.trim();
    if (!title) return false;
    if (this.isAddingNewProject)
      return this.projects.some(x => x.title === title);
    const projectsOtherThanThisOne = this.projects.filter(
      x => x.projectId !== this.project.projectId,
    );
    return projectsOtherThanThisOne.some(x => x.title === title);
  }

  addProjectAction(newProject: UsProject): ManageProjectsState {
    return new ManageProjectsState({
      ...this,
      projects: [...this.projects, newProject],
      isAddingNewProject: false,
      selectedIndex: this.projects.length,
    });
  }

  beginEditProjectAction(): ManageProjectsState {
    return new ManageProjectsState({
      ...this,
      isEditingProject: true,
    });
  }

  editProjectAction(
    currentProject: UsProject,
    editedProject: UsProject,
  ): ManageProjectsState {
    const newArray: UsProject[] = [];
    for (const p of this.projects) {
      if (p.projectId === currentProject.projectId) {
        newArray.push(editedProject);
      } else {
        newArray.push(p);
      }
    }
    return new ManageProjectsState({
      ...this,
      projects: newArray,
      isEditingProject: false,
    });
  }

  deleteProjectAction(currentProject: UsProject): ManageProjectsState {
    const newArray: UsProject[] = [];
    for (const p of this.projects) {
      if (p.projectId !== currentProject.projectId) {
        newArray.push(p);
      }
    }
    return new ManageProjectsState({
      ...this,
      projects: newArray,
      selectedIndex: null,
    });
  }

  selectProjectAction(index: number): ManageProjectsState {
    if (index < 0 || index >= this.projects.length) return this;
    return new ManageProjectsState({
      ...this,
      selectedIndex: index,
      isAddingNewProject: false,
      isEditingProject: false,
    });
  }

  addTask(project: UsProject, newTask: UsTask): ManageProjectsState {
    const projectInList = this.projects.find(
      x => x.projectId === project.projectId,
    );
    if (!projectInList) return this;
    projectInList.tasks = [...projectInList.tasks, newTask];
    return new ManageProjectsState({ ...this });
  }

  deleteTask(project: UsProject, taskToDelete: UsTask): ManageProjectsState {
    const projectInList = this.projects.find(
      x => x.projectId === project.projectId,
    );
    if (!projectInList) return this;
    projectInList.tasks = projectInList.tasks.filter(
      x => x.taskId !== taskToDelete.taskId,
    );
    return new ManageProjectsState({ ...this });
  }
}
