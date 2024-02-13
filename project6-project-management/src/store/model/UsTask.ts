export class UsTask {
  text: string = "";

  public constructor(init?: Partial<UsTask>) {
    Object.assign(this, init);
  }
}