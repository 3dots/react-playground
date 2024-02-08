import { useProjectsStore } from "@/store/projectsStore";
import { FormattedMessage } from "../Common/Intl/Intl";
import { RButton } from "../Common/RButton/RButton";

export function SideBarContent() {
  const isAddingProject = useProjectsStore(sw => sw.state.isAddingProject);
  const addProjectAction = useProjectsStore(sw => sw.beginAddProjectAction);

  return (
    <section className="mt-5">
      <h2 className="text-2xl mb-6">
        <FormattedMessage id="ttl.your.projects" />
      </h2>
      {!isAddingProject && (
        <RButton isDarkBackground={true} onClick={addProjectAction}>
          <FormattedMessage id="btn.add.project" />
        </RButton>
      )}
    </section>
  );
}
