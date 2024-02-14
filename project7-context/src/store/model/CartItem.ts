export class CartItem {
  id: string = "";
  name: string = "";
  price: number = 0;
  quantity: number = 0;

  public constructor(init?: Partial<CartItem>) {
    Object.assign(this, init);
  }
}