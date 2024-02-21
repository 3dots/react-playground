import type { PersistStorage } from "zustand/middleware";
import {
  ManageProjectsState,
  type IManageProjectsStateWrapper,
} from "./model/ManageProjectsState";
import { projectsService } from "@/services/projects/projectsService";

export const persistStorage: PersistStorage<IManageProjectsStateWrapper> = {
  getItem: name => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    const obj = JSON.parse(str);
    if (!obj?.state?.state) return null;
    try {
      let state = new ManageProjectsState(obj.state.state);
      let result = {
        state: {
          state,
        } as IManageProjectsStateWrapper,
        version: obj.version as number,
      };
      projectsService.init(state);
      //console.log(result);
      return result;
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: name => localStorage.removeItem(name),
};
