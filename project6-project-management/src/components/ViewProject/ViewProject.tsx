import { useProjectsStore } from "@/store/projectsStore";
import { RH1, RH2 } from "../Common/RH/RH";
import { EnButtonType, RButton } from "../Common/RButton/RButton";
import { FormattedMessage, useIntl } from "../Common/Intl/Intl";
import {
  ConfirmDialog,
  type IConfirmDialogHandle,
} from "../Common/ConfirmDialog/ConfirmDialog";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "../Common/RDatePicker/RDatePicker";
import { RInput } from "../Common/RInput/RInput";
import cssClasses from "./ViewProject.module.css"

export function ViewProject() {
  const [project, beginEditProjectAction, deleteProjectAction] =
    useProjectsStore(sw => [
      sw.state.project,
      sw.beginEditProjectAction,
      sw.deleteProjectAction,
    ]);
  const confirmDialogRef = useRef<IConfirmDialogHandle>(null);
  const intl = useIntl();

  const [newTaskText, setNewTaskText] = useState("");

  useEffect(() => {
    setNewTaskText("");
  }, [project]);

  return (
    <div className="pl-5 flex flex-col gap-2">
      <div className="flex">
        <RH1 isDefaultMB={false}>{project.title}</RH1>
        <div className="ml-auto flex gap-2">
          <RButton
            buttonType={EnButtonType.Secondary}
            onClick={() => confirmDialogRef.current?.open()}
          >
            <FormattedMessage id="btn.delete" />
          </RButton>
          <RButton onClick={beginEditProjectAction}>
            <FormattedMessage id="btn.edit" />
          </RButton>
        </div>
      </div>
      <div className="text-stone-500 mb-2">
        <FormattedMessage id="lbl.due.date.colon" />{" "}
        {formatDate(project.dueDate, intl.formatMessage)}
      </div>
      <div className="whitespace-pre pb-2 border-stone-200 border-b-2">{project.description}</div>
      <RH2><FormattedMessage id="ttl.tasks" /></RH2>
      <div className="flex gap-2 items-center mb-2">
        <RInput value={newTaskText} className={cssClasses["tasks-input"]} isValid={true} onChange={(e) => setNewTaskText(e.target.value)} />
        <RButton disabled={newTaskText.trim() ? undefined : true} buttonType={EnButtonType.Secondary}><FormattedMessage id="btn.add.task" /></RButton>
      </div>
      <div>
        
      </div>
      <ConfirmDialog
        ref={confirmDialogRef}
        onConfirm={() => deleteProjectAction(project)}
      />
    </div>
  );
}
