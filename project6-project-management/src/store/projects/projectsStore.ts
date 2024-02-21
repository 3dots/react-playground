import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IManageProjectsStateWrapper } from "./model/ManageProjectsState";
import { ManageProjectsState } from "./model/ManageProjectsState";
import { persistStorage } from "./persistStorage";
import { useAppStore } from "../app/appStore";
import type {
  GenericFunction,
  TryCatchWrapper,
} from "@/components/Common/common";
import type { UsProject } from "./model/UsProject";
import type { UsTask } from "./model/UsTask";

function tryCatchWrapper<F extends GenericFunction>(
  func: F,
): TryCatchWrapper<F> {
  return (...args) => {
    try {
      return func(...args);
    } catch (error) {
      console.error(error);
      useAppStore.getState().errorTriggered();
    }
  };
}

export const useProjectsStore = create<IManageProjectsStateWrapper>()(
  persist(
    set => ({
      state: ManageProjectsState.initialState(),
      resetState: tryCatchWrapper(() =>
        set(() => ({ state: ManageProjectsState.initialState() })),
      ),
      beginAddProjectAction: tryCatchWrapper(() =>
        set(sw => ({ state: sw.state.beginAddProjectAction() })),
      ),
      cancelAddEditProjectAction: tryCatchWrapper(() =>
        set(sw => ({ state: sw.state.cancelAddEditProjectAction() })),
      ),
      addProjectAction: tryCatchWrapper((newProject: UsProject) =>
        set(sw => ({ state: sw.state.addProjectAction(newProject) })),
      ),
      beginEditProjectAction: tryCatchWrapper(() =>
        set(sw => ({ state: sw.state.beginEditProjectAction() })),
      ),
      editProjectAction: tryCatchWrapper((currentProject: UsProject, editedProject: UsProject) =>
        set(sw => ({
          state: sw.state.editProjectAction(currentProject, editedProject),
        })),
      ),
      deleteProjectAction: tryCatchWrapper((currentProject: UsProject) =>
        set(sw => ({ state: sw.state.deleteProjectAction(currentProject) })),
      ),
      selectProjectAction: tryCatchWrapper((index: number) =>
        set(sw => ({ state: sw.state.selectProjectAction(index) })),
      ),
      addTask: tryCatchWrapper((project: UsProject, newTask: UsTask) =>
        set(sw => ({ state: sw.state.addTask(project, newTask) })),
      ),
      deleteTask: tryCatchWrapper((project: UsProject, taskToDelete: UsTask) =>
        set(sw => ({ state: sw.state.deleteTask(project, taskToDelete) })),
      ),
      testException: tryCatchWrapper(() =>
        set(() => {
          throw new Error("reducer exception");
        }),
      ),
    }),
    {
      name: "projects-storage",
      storage: persistStorage,
      partialize: sw =>
        ({
          state: { ...sw.state.toLocalStorage() },
        }) as unknown as IManageProjectsStateWrapper,
    },
  ),
);
