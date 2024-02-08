import type { PersistStorage } from "zustand/middleware";
import { ManageProjectsState, type IManageProjectsStateWrapper } from "./model/ManageProjectsState";

export const persistStorage: PersistStorage<IManageProjectsStateWrapper> = {
  getItem: name => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    const obj = JSON.parse(str);
    if (!obj?.state?.state) return null;
    try {
      let result = {
        state: {
          state: new ManageProjectsState(obj.state.state),
        } as IManageProjectsStateWrapper,
        version: obj.version as number,
      };
      //console.log(result);
      return result;
    }
    catch {
      return null;
    }
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: name => localStorage.removeItem(name),
};