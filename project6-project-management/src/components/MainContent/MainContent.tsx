import { useProjectsStore } from "@/store/projectsStore";
import { AddProject } from "../AddProject/AddProject";
import { SplashScreen } from "../SplashScreen/SplashScreen";
import { RButton } from "../Common/RButton/RButton";
import { FormattedMessage } from "../Common/Intl/Intl";

export function MainContent() {
  const [isAddingProject, isSplashScreen, resetState] = useProjectsStore(sw => [
    sw.state.isAddingNewProject,
    sw.state.isSplashScreen,
    sw.resetState,
  ]);

  const MainRender = function () {
    if (isAddingProject) return <AddProject />;
    else if (isSplashScreen) return <SplashScreen />;
    else return <></>;
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