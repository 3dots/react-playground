import type { ManageProjectsState } from "@/store/projects/model/ManageProjectsState";
import type { UsTask } from "@/store/projects/model/UsTask";

class ProjectsService {
  private nextProjectId: number = -1;
  private nextTaskId: number = -1;

  private nextId(prevId: number) {
    return prevId - 1;
  }

  init(state: ManageProjectsState) {
    const minProjectId = state.projects.length
      ? Math.min(...state.projects.map(x => x.projectId))
      : 0;
    //console.log(minProjectId);
    this.nextProjectId = this.nextId(minProjectId);

    const allTasks: UsTask[] = [];
    state.projects.reduce((acc, x) => [...acc, ...x.tasks], allTasks);

    const minTaskId = allTasks.length
      ? Math.min(...allTasks.map(x => x.taskId))
      : 0;
    this.nextTaskId = this.nextId(minTaskId);
  }

  getNextProjectId(): number {
    const nextId = this.nextProjectId;
    this.nextProjectId = this.nextId(nextId);
    return nextId;
  }

  getNextTaskId(): number {
    const nextId = this.nextTaskId;
    this.nextTaskId = this.nextId(nextId);
    return nextId;
  }
}

export const projectsService = new ProjectsService();
