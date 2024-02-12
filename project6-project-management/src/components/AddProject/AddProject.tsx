import { useProjectsStore } from "@/store/projectsStore";
import cssClasses from "./AddProject.module.css";
import { EnButtonType, RButton } from "../Common/RButton/RButton";
import { FormattedMessage, useIntl } from "../Common/Intl/Intl";
import { RInput } from "../Common/RInput/RInput";
import { RTextArea } from "../Common/RTextArea/RTextArea";
import { RH1 } from "../Common/RH/RH";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { UsProject } from "@/store/model/UsProject";
import {
  RDatePicker,
  formatDate,
  parseDate,
  validateDatePicker,
} from "../Common/RDatePicker/RDatePicker";
import { validateRequired } from "../Common/common";
type ProjectFormInputs = {
  title: string;
  description: string;
  dueDate: string;
};

export function AddProject() {
  const [
    project,
    isAddingNewProject,
    cancelAddProjectAction,
    addProjectAction,
    editProjectAction,
    state,
  ] = useProjectsStore(sw => [
    sw.state.project,
    sw.state.isAddingNewProject,
    sw.cancelAddEditProjectAction,
    sw.addProjectAction,
    sw.editProjectAction,
    sw.state
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormInputs>();

  const intl = useIntl();

  useEffect(() => {
    reset({
      title: project.title,
      description: project.description,
      dueDate: formatDate(project.dueDate, intl.formatMessage),
    });
  }, [project, reset, intl]);

  const handleSave: SubmitHandler<ProjectFormInputs> = data => {
    const newProject = new UsProject({
      title: data.title.trim(),
      description: data.description.trim(),
      dueDate: parseDate(data.dueDate, intl.formatMessage),
    });

    if (isAddingNewProject) addProjectAction(newProject);
    else editProjectAction(project, newProject);
  };

  const titleErrorId = "title-error";
  const titleLabelResourceId = "lbl.title";

  const descriptionErrorId = "description-error";
  const descriptionLabelResourceId = "lbl.description";

  const dueDateErrorId = "due-date-error";
  const dueDateLabelResourceId = "lbl.due.date";

  const HeadingText = function () {
    if (isAddingNewProject)
      return <FormattedMessage id="ttl.adding.new.project" />;
    else
      return (
        <FormattedMessage
          id="ttl.editing.project"
          values={{ title: project.title }}
        />
      );
  };

  return (
    <div className="flex w-100">
      <form
        className={`${cssClasses.form} flex mx-auto flex-col gap-2`}
        onSubmit={handleSubmit(handleSave)}
        noValidate
        autoComplete="off"
      >
        <div className="flex">
          <RH1 isDefaultMB={false}>
            <HeadingText />
          </RH1>
          <div className="ml-auto flex gap-2">
            <RButton
              buttonType={EnButtonType.Secondary}
              onClick={cancelAddProjectAction}
            >
              <FormattedMessage id="btn.cancel" />
            </RButton>
            <RButton type="submit">
              <FormattedMessage id="btn.save" />
            </RButton>
          </div>
        </div>
        <RInput
          type="text"
          {...register("title", {
            validate: {
              required: s =>
                validateRequired(s, intl.formatMessage, titleLabelResourceId),
              isNotDuplicate: s =>
                state.isDuplicate(s)
                  ? intl.formatMessage({ id: "txt.project.exists" })
                  : true,
            },
          })}
          isValid={errors.title === undefined}
          required
          aria-describedby={
            errors.title === undefined ? undefined : titleErrorId
          }
          maxLength={UsProject.maxLengthTitle}
        >
          <FormattedMessage id={titleLabelResourceId} />
        </RInput>
        {errors.title?.message && (
          <div id={titleErrorId}>{errors.title.message}</div>
        )}

        <RTextArea
          {...register("description", {
            validate: {
              required: s =>
                validateRequired(
                  s,
                  intl.formatMessage,
                  descriptionLabelResourceId,
                ),
            },
          })}
          isValid={errors.description === undefined}
          required
          aria-describedby={
            errors.description === undefined ? undefined : descriptionErrorId
          }
          maxLength={UsProject.maxLengthDescription}
        >
          <FormattedMessage id={descriptionLabelResourceId} />
        </RTextArea>
        {errors.description?.message && (
          <div id={descriptionErrorId}>{errors.description.message}</div>
        )}

        <RDatePicker
          {...register("dueDate", {
            validate: {
              required: s =>
                validateRequired(s, intl.formatMessage, dueDateLabelResourceId),
              validateFormat: s => validateDatePicker(s, intl.formatMessage),
            },
          })}
          isValid={errors.dueDate === undefined}
          required
          aria-describedby={
            errors.dueDate === undefined ? undefined : dueDateErrorId
          }
        >
          <FormattedMessage id={dueDateLabelResourceId} />
        </RDatePicker>
        {errors.dueDate?.message && (
          <div id={descriptionErrorId}>{errors.dueDate.message}</div>
        )}
      </form>
    </div>
  );
}
