import { useProjectsStore } from "@/store/projectsStore";
import { FormattedMessage } from "../Common/Intl/Intl";
import { RButton } from "../Common/RButton/RButton";
import type { UsProject } from "@/store/model/UsProject";
import { RA } from "../Common/RA/RA";
import { RH2 } from "../Common/RH/RH";

export function SideBarContent() {
  const [
    isAddingProject,
    projects,
    selectedIndex,
    addProjectAction,
    selectProjectAction,
  ] = useProjectsStore(sw => [
    sw.state.isAddingNewProject,
    sw.state.projects,
    sw.state.selectedIndex,
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
      <ul className="flex flex-col gap-1">
        {projects.map((x: UsProject, index: number) => (
          <li>
            <RA
              key={x.title}
              onClick={e => handleLinkClick(e, index)}
              className={`w-full inline-block ${
                index === selectedIndex
                  ? "bg-stone-400 cursor-default pointer-events-none"
                  : ""
              }`}
            >
              {x.title}
            </RA>
          </li>
        ))}
      </ul>
    </section>
  );
}
