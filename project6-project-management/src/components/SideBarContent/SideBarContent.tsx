import { useProjectsStore } from "@/store/testStore";
import { FormattedMessage } from "../Common/Intl/Intl";
import { RButton } from "../Common/RButton/RButton";

export function SideBarContent() {
  const { state, addProjectAction } = useProjectsStore();

  return (
    <section className="mt-5">
      <h2 className="text-2xl mb-6">
        <FormattedMessage id="ttl.your.projects" />
      </h2>
      {!state.isAddingProject && (
        <RButton isDarkBackground={true} onClick={addProjectAction}>
          <FormattedMessage id="btn.add.project" />
        </RButton>
      )}
    </section>
  );
}
