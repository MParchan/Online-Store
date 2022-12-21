import { useContext } from "react";
import CartContext from "../store/cart-context";
import ProductList from "../components/products/ProductList";

function CartPage() {
  const cartCtx = useContext(CartContext);
  let content;
  let checkout;
  if (cartCtx.totalItems === 0) {
    content = <p>Shopping cart is empty.</p>;
  } else {
    content = <ProductList products={cartCtx.items} />;
    checkout = <button>Checkout</button>;
  }

  return (
    <section>
      <h1>Shopping cart:</h1>
      {content}
      {checkout}
    </section>
  );
}

export default CartPage;
