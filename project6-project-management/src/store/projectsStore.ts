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
      cancelAddProjectAction: () =>
        set(sw => ({ state: sw.state.cancelAddProjectAction() })),
    }),
    {
      name: "projects-storage",
      storage: persistStorage,
    },
  ),
);
