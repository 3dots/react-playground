import type { IProductDto } from "@/service/dummy-products";
import { CartCtx } from "@/store/CartCtx";
import { useContext } from "react";

export interface IProductProps {
  product: IProductDto
}

export function Product(props: IProductProps) {
  const { cart, setCart } = useContext(CartCtx);
  const p = props.product;

  return (
    <article className="product">
      <img src={p.image} alt={p.title} />
      <div className="product-content">
        <div>
          <h3>{p.title}</h3>
          <p className='product-price'>${p.price}</p>
          <p>{p.description}</p>
        </div>
        <p className='product-actions'>
          <button onClick={() => setCart(cart.addItemToCart(p.id))}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}