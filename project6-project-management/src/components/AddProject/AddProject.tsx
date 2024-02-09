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

type ProjectFormInputs = {
  title: string;
  description: string;
};

export function AddProject() {
  const cancelAddProjectAction = useProjectsStore(
    sw => sw.cancelAddProjectAction,
  );
  const project = useProjectsStore(sw => sw.state.project);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormInputs>();

  const intl = useIntl();

  useEffect(() => {
    console.log("effect ran");
    reset(project);
  }, [project, reset]);

  const handleSave: SubmitHandler<ProjectFormInputs> = data => {
    console.log(data);
    //const newProject = new UsProject(data);
  };

  const titleErrorId = "title-error";
  const descriptionErrorId = "description-error";

  return (
    <form
      className={`${cssClasses.container} mx-auto flex flex-col gap-2`}
      onSubmit={handleSubmit(handleSave)}
      noValidate
    >
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
          <RButton type="submit">
            <FormattedMessage id="btn.save" />
          </RButton>
        </div>
      </div>
      <RInput
        {...register("title", {
          required: intl.formatMessage(
            { id: "txt.is.empty" },
            { label: intl.formatMessage({ id: "lbl.title" }) },
          )
        })}
        isValid={errors.title === undefined}
        required
        aria-describedby={errors.title === undefined ? undefined : titleErrorId}
        maxLength={UsProject.maxLengthTitle}
      >
        <FormattedMessage id="lbl.title" />
      </RInput>
      {errors.title?.message && <div id={titleErrorId}>{errors.title.message}</div>}
      <RTextArea
        {...register("description", {
          required: intl.formatMessage(
            { id: "txt.is.empty" },
            { label: intl.formatMessage({ id: "lbl.description" }) },
          )
        })}
        isValid={errors.description === undefined}
        aria-describedby={errors.description === undefined ? undefined : descriptionErrorId}
        required
      >
        <FormattedMessage id="lbl.description" />
      </RTextArea>
      {errors.description?.message && <div id={descriptionErrorId}>{errors.description.message}</div>}
    </form>
  );
}
