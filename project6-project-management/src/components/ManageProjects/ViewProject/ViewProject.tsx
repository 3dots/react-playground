import { useProjectsStore } from "@/store/projects/projectsStore";
import { RH1 } from "../../Common/RH/RH";
import { EnButtonType, RButton } from "../../Common/RButton/RButton";
import { FormattedMessage, useIntl } from "../../Common/Intl/Intl";
import {
  ConfirmDialog,
  type IConfirmDialogHandle,
} from "../../Common/ConfirmDialog/ConfirmDialog";
import { useRef } from "react";
import { formatDate } from "../../Common/RDatePicker/RDatePicker";
import { EditTasks } from "../EditTasks/EditTasks";

export function ViewProject() {
  const [
    project,
    beginEditProjectAction,
    deleteProjectAction,
  ] = useProjectsStore(sw => [
    sw.state.project,
    sw.beginEditProjectAction,
    sw.deleteProjectAction,
  ]);
  const confirmDialogRef = useRef<IConfirmDialogHandle>(null);
  const intl = useIntl();

  const sectionClassName = "flex flex-col gap-2 min-w-0 mb-2";

  return (
    <div className="pl-5 ">
      <section className={sectionClassName}>
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
      </section>
      <section className={sectionClassName}>
        <EditTasks />
      </section>

      <ConfirmDialog
        ref={confirmDialogRef}
        onConfirm={() => deleteProjectAction(project)}
      />
    </div>
  );
}
