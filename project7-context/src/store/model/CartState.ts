import { DUMMY_PRODUCTS } from "@/service/dummy-products";
import { assignArrayDirectlyIfTyped } from "./util/util";
import { CartItem } from "./CartItem";

export class CartState {
  items: CartItem[] = [];

  public constructor(init?: Partial<CartState>) {
    const { items, ...rest } = { ...init };
    Object.assign(this, rest);
    this.items = assignArrayDirectlyIfTyped(items, CartItem);
  }

  static initialState(): CartState {
    return new CartState();
  }

  updateCartItemQuantity(productId: string, amount: number): CartState {
    const updatedItems = [...this.items];
    const updatedItemIndex = updatedItems.findIndex(
      item => item.id === productId,
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return new CartState({
      ...this,
      items: updatedItems,
    });
  }

  addItemToCart(id: string): CartState {
    const updatedItems = [...this.items];

    const existingCartItemIndex = updatedItems.findIndex(
      cartItem => cartItem.id === id,
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(product => product.id === id);
      if (product === undefined) return this;
      updatedItems.push({
        id: id,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return new CartState({
      ...this,
      items: updatedItems,
    });
  }
}
