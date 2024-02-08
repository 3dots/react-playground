export class UsProject {
  title: string = "";
  description: string = "";

  public constructor(init?: Partial<UsProject>) {
    Object.assign(this, init);
  }
}