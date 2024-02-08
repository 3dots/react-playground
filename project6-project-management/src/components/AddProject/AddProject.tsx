import { useProjectsStore } from "@/store/projectsStore";
import cssClasses from "./AddProject.module.css";
import { EnButtonType, RButton } from "../Common/RButton/RButton";
import { FormattedMessage, useIntl } from "../Common/Intl/Intl";
import { RInput } from "../Common/RInput/RInput";
import { RTextArea } from "../Common/RTextArea/RTextArea";
import { RH1 } from "../Common/RH/RH";
import { useEffect, useRef, useState } from "react";
import { UsProject } from "@/store/model/UsProject";

export function AddProject() {
  const cancelAddProjectAction = useProjectsStore(
    sw => sw.cancelAddProjectAction,
  );
  const project = useProjectsStore(sw => sw.state.project);

  const intl = useIntl();
  const [validationMessage, setValidationMessage] = useState("");

  const titleInputElRef = useRef<HTMLInputElement>(null);
  const descTextAreaElRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!titleInputElRef.current || !descTextAreaElRef.current) return;
    titleInputElRef.current.value = project.title;
    descTextAreaElRef.current.value = project.description;
    setValidationMessage("");
  }, [project]);

  const handleSave = () => {
    if (!titleInputElRef.current || !descTextAreaElRef.current) return;

    const newProject = new UsProject({
      title: titleInputElRef.current.value,
      description: descTextAreaElRef.current.value,
    });

    // if (newProject.title.trim() === "") {

    // }

  };

  return (
    <div className={`${cssClasses.container} mx-auto flex flex-col gap-2`}>
      <div className="flex">
        <RH1 isDefaultMB={false}>
          <FormattedMessage id="ttl.adding.new.project" />
        </RH1>
        <div className="ml-auto flex gap-2">
          <RButton
            buttonType={EnButtonType.Secondary}
            onClick={cancelAddProjectAction}
          >
            <FormattedMessage id="btn.cancel" />
          </RButton>
          <RButton onClick={handleSave}>
            <FormattedMessage id="btn.save" />
          </RButton>
        </div>
      </div>
      {validationMessage !== "" && <div>{validationMessage}</div>}
      <RInput ref={titleInputElRef} required>
        <FormattedMessage id="lbl.title" />
      </RInput>
      <RTextArea ref={descTextAreaElRef} required>
        <FormattedMessage id="lbl.description" />
      </RTextArea>
    </div>
  );
}
