import { useProjectsStore } from "@/store/projectsStore";
import { FormattedMessage } from "../Common/Intl/Intl";
import { RButton } from "../Common/RButton/RButton";
import type { UsProject } from "@/store/model/UsProject";
import { RA } from "../Common/RA/RA";
import { RH2 } from "../Common/RH/RH";

export function SideBarContent() {
  const [isAddingProject, projects, addProjectAction, selectProjectAction] =
    useProjectsStore(sw => [
      sw.state.isAddingNewProject,
      sw.state.projects,
      sw.beginAddProjectAction,
      sw.selectProjectAction,
    ]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    e.preventDefault(); //don't mess with URL.
    selectProjectAction(index);
  };

  return (
    <section className="mt-5">
      <RH2 isDefaultMB={false} className="mb-4">
        <FormattedMessage id="ttl.your.projects" />
      </RH2>
      {!isAddingProject && (
        <RButton
          isDarkBackground={true}
          onClick={addProjectAction}
          className="mb-2"
        >
          <FormattedMessage id="btn.add.project" />
        </RButton>
      )}
      <div className="flex flex-col">
        {projects.map((x: UsProject, index: number) => (
          <RA key={x.title} onClick={e => handleLinkClick(e, index)}>
            {x.title}
          </RA>
        ))}
      </div>
    </section>
  );
}
