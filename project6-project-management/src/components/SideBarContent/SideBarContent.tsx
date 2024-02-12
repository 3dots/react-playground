import { useProjectsStore } from "@/store/projectsStore";
import { FormattedMessage } from "../Common/Intl/Intl";
import { RButton } from "../Common/RButton/RButton";
import type { UsProject } from "@/store/model/UsProject";

export function SideBarContent() {
  const [isAddingProject, projects, addProjectAction] = useProjectsStore(sw => [
    sw.state.isAddingNewProject,
    sw.state.projects,
    sw.beginAddProjectAction,
  ]);

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
      {projects.map((x: UsProject) => <div>{x.title}</div>)}
    </section>
  );
}
