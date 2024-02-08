import noProj from "@/assets/no-projects.png";
import { useProjectsStore } from "@/store/projectsStore";
import { FormattedMessage, useIntl } from "../Common/Intl/Intl";
import { RButton } from "../Common/RButton/RButton";
import { RH1 } from "../Common/RH/RH";

export function SplashScreen() {
  const addProjectAction = useProjectsStore(sw => sw.beginAddProjectAction);  
  const intl = useIntl();

  return (
    <div className="mx-auto">
      <img
        src={noProj}
        alt={intl.formatMessage({ id: "img.tasks" })}
        className="w-20 mb-2 mx-auto"
      />
      <RH1 className="mb-6" isDefaultMB={false}>
        <FormattedMessage id="ttl.no.project.selected" />
      </RH1>
      <p className="mb-4">
        <FormattedMessage id="txt.select.project.or" />
      </p>
      <RButton onClick={addProjectAction}>
        <FormattedMessage id="btn.add.project" />
      </RButton>
    </div>
  );
}
