import noProj from "@/assets/no-projects.png";
import { useProjectsStore } from "@/store/testStore";
import { FormattedMessage, useIntl } from "../Common/Intl/Intl";
import { RButton } from "../Common/RButton/RButton";

export function SplashScreen() {
  const addProjectAction = useProjectsStore(sw => sw.addProjectAction);
  const intl = useIntl();

  return (
    <div className="mx-auto">
      <img
        src={noProj}
        alt={intl.formatMessage({ id: "img.tasks" })}
        className="w-20 mb-2 mx-auto"
      />
      <h1 className="text-2xl mb-6 font-bold">
        <FormattedMessage id="ttl.no.project.selected" />
      </h1>
      <p className="mb-4">
        <FormattedMessage id="txt.select.project.or" />
      </p>
      <RButton onClick={addProjectAction}>
        <FormattedMessage id="btn.add.project" />
      </RButton>
    </div>
  );
}
