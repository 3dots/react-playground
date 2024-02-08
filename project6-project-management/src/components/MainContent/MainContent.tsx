import { useProjectsStore } from "@/store/testStore";
import { AddProject } from "../AddProject/AddProject";
import { SplashScreen } from "../SplashScreen/SplashScreen";

export function MainContent() {
  const { state } = useProjectsStore();

  if (state.isAddingProject) return <AddProject />;
  else if (state.isSplashScreen) return <SplashScreen />;
  else return <></>;
}
