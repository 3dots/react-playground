import { useProjectsStore } from "@/store/testStore";
import cssClasses from "./AddProject.module.css";
import { EnButtonType, RButton } from "../Common/RButton/RButton";
import { FormattedMessage } from "../Common/Intl/Intl";
import { RInput } from "../Common/RInput/RInput";
import { RTextArea } from "../Common/RTextArea/RTextArea";

export function AddProject() {
  const { cancelAddProjectAction } = useProjectsStore();

  return (
    <div className={`${cssClasses.container} mx-auto flex flex-col gap-2`}>
      <div className="flex">
        <div className="ml-auto flex gap-2">
          <RButton
            buttonType={EnButtonType.Secondary}
            onClick={cancelAddProjectAction}
          >
            <FormattedMessage id="btn.cancel" />
          </RButton>
          <RButton>
            <FormattedMessage id="btn.save" />
          </RButton>
        </div>
      </div>
      <RInput>
        <FormattedMessage id="lbl.title" />
      </RInput>
      <RTextArea>
        <FormattedMessage id="lbl.description" />
      </RTextArea>
    </div>
  );
}
