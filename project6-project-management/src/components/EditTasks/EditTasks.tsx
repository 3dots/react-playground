import { useEffect, useState } from "react";
import { FormattedMessage } from "../Common/Intl/Intl";
import { RH2 } from "../Common/RH/RH";
import { RInput } from "../Common/RInput/RInput";
import { useProjectsStore } from "@/store/projectsStore";
import { EnButtonType, RButton } from "../Common/RButton/RButton";
import { UsTask } from "@/store/model/UsTask";

export function EditTasks() {
  const [
    project,
    tasks,
    addTask,
    deleteTask
  ] = useProjectsStore(sw => [
    sw.state.project,
    sw.state.project.tasks,
    sw.addTask,
    sw.deleteTask
  ]);

  const [newTaskText, setNewTaskText] = useState("");

  useEffect(() => {
    setNewTaskText("");
  }, [project]);

  return (
    <>
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
      <ul className="flex flex-col gap-1 bg-stone-200">
        {tasks.map((x: UsTask) => (
          <li className="flex px-2 items-center" key={x.text}>
            <div>{x.text}</div>
            <div className="ml-auto">
              <RButton
                buttonType={EnButtonType.Secondary}
                onClick={() => deleteTask(project, x)}
              >
                <FormattedMessage id="btn.delete" />
              </RButton>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
