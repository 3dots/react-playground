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
import { UsTask } from "@/store/model/UsTask";

export function ViewProject() {
  const [
    project,
    tasks,
    beginEditProjectAction,
    deleteProjectAction,
    addTask,
    deleteTask,
  ] = useProjectsStore(sw => [
    sw.state.project,
    sw.state.project.tasks,
    sw.beginEditProjectAction,
    sw.deleteProjectAction,
    sw.addTask,
    sw.deleteTask,
  ]);
  const confirmDialogRef = useRef<IConfirmDialogHandle>(null);
  const intl = useIntl();

  const [newTaskText, setNewTaskText] = useState("");

  useEffect(() => {
    setNewTaskText("");
  }, [project]);

  return (
    <div className="pl-5 flex flex-col gap-2 min-w-0">
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
      <div className="whitespace-pre pb-2 border-stone-200 border-b-2">
        {project.description}
      </div>
      <RH2>
        <FormattedMessage id="ttl.tasks" />
      </RH2>
      <div className="flex gap-2 items-center mb-2 flex-wrap min-w-0">
        <RInput
          value={newTaskText}
          labelClassName="w-[300px]"
          isValid={true}
          onChange={e => setNewTaskText(e.target.value)}
        />
        <RButton
          disabled={newTaskText.trim() ? undefined : true}
          buttonType={EnButtonType.Secondary}
          onClick={() =>
            addTask(project, new UsTask({ text: newTaskText.trim() }))
          }
        >
          <FormattedMessage id="btn.add.task" />
        </RButton>
      </div>
      <div className="flex flex-col gap-1 bg-stone-200">
        {tasks.map((x: UsTask) => (
          <div className="flex px-2 items-center">
            <div>{x.text}</div>
            <div className="ml-auto">
              <RButton buttonType={EnButtonType.Secondary} onClick={() => deleteTask(project, x)}>
                <FormattedMessage id="btn.delete" />
              </RButton>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        ref={confirmDialogRef}
        onConfirm={() => deleteProjectAction(project)}
      />
    </div>
  );
}
