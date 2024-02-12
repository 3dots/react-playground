export class UsProject {
  title: string = "";
  description: string = "";
  dueDate: Date = null!;

  static maxLengthTitle: number = 100;
  static maxLengthDescription: number = 500;

  public constructor(init?: Partial<UsProject>) {
    Object.assign(this, init);
  }
}
