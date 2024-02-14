import { useProjectsStore } from "@/store/projectsStore";
import { RButton } from "../Common/RButton/RButton";
import { FormattedMessage } from "../Common/Intl/Intl";

export function MainContent() {
  const [resetState] =
    useProjectsStore(sw => [
      sw.resetState,
    ]);

  const MainRender = function () {
    return <>Main content</>;
  }

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
