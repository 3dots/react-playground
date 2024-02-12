import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IManageProjectsStateWrapper } from "./model/ManageProjectsState";
import { ManageProjectsState } from "./model/ManageProjectsState";
import { persistStorage } from "./persistStorage";

export const useProjectsStore = create<IManageProjectsStateWrapper>()(
  persist(
    set => ({
      state: ManageProjectsState.initialState(),
      resetState: () =>
        set(() => ({ state: ManageProjectsState.initialState() })),
      beginAddProjectAction: () =>
        set(sw => ({ state: sw.state.beginAddProjectAction() })),
      cancelAddEditProjectAction: () =>
        set(sw => ({ state: sw.state.cancelAddEditProjectAction() })),
      addProjectAction: newProject =>
        set(sw => ({ state: sw.state.addProjectAction(newProject) })),
      beginEditProjectAction: () =>
        set(sw => ({ state: sw.state.beginEditProjectAction() })),
      editProjectAction: (currentProject, editedProject) =>
        set(sw => ({
          state: sw.state.editProjectAction(currentProject, editedProject),
        })),
      deleteProjectAction: currentProject =>
        set(sw => ({ state: sw.state.deleteProjectAction(currentProject) })),
      selectProjectAction: index =>
        set(sw => ({ state: sw.state.selectProjectAction(index) })),
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
