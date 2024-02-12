import { useProjectsStore } from "@/store/projectsStore";
import { AddProject } from "../AddProject/AddProject";
import { SplashScreen } from "../SplashScreen/SplashScreen";
import { RButton } from "../Common/RButton/RButton";
import { FormattedMessage } from "../Common/Intl/Intl";
import { ViewProject } from "../ViewProject/ViewProject";

export function MainContent() {
  const [isAddingProject, isEditingProject, isSplashScreen, resetState] =
    useProjectsStore(sw => [
      sw.state.isAddingNewProject,
      sw.state.isEditingProject,
      sw.state.selectedIndex === null,
      sw.resetState,
    ]);

  const MainRender = function () {
    if (isAddingProject || isEditingProject) return <AddProject />;
    else if (isSplashScreen) return <SplashScreen />;
    else return <ViewProject />;
  };

  return (
    <>
      <MainRender />
      <div className="mt-auto">
        <RButton onClick={resetState}>
          <FormattedMessage id="btn.reset" />
        </RButton>
      </div>
    </>
  );
}
