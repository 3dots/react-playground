export class UsTask {
  taskId!: number;

  text: string = "";

  public constructor(init?: Partial<UsTask>) {
    Object.assign(this, init);
  }
}
