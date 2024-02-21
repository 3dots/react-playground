import { UsTask } from "./UsTask";
import { assignArrayDirectlyIfTyped } from "../../util/util";

export class UsProject {
  title: string = "";
  description: string = "";
  dueDate: Date = null!;

  static maxLengthTitle: number = 100;
  static maxLengthDescription: number = 500;

  tasks: UsTask[] = [];

  public constructor(init?: Partial<UsProject>) {
    const { tasks, ...rest } = { ...init };
    Object.assign(this, rest);
    this.tasks = assignArrayDirectlyIfTyped(tasks, UsTask);
  }
}
