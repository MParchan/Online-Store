import { useContext } from "react";
import CartContext from "../store/cart-context";
import CartProductList from "../components/products/CartProductList";
import { useNavigate } from "react-router-dom";
import transactionService from "../api/transactionService";

function CartPage() {
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();
  let content;
  let checkout;

  function transactionHandler() {
    const products = [];

    for (let i = 0; i < cartCtx.totalItems; i++) {
      products.push({
        productId: cartCtx.items[i].productId,
        count: cartCtx.items[i].quantity,
      });
    }
    transactionService.transaction(products).then((response) => {
      navigate("/transaction", { state: { response: response } });
    });
    cartCtx.clearTheCart();
  }

  if (cartCtx.totalItems === 0) {
    content = <p>Shopping cart is empty.</p>;
  } else {
    content = <CartProductList products={cartCtx.items} />;
    checkout = (
      <button onClick={transactionHandler} className="btn btn-dark w-25">
        Checkout
      </button>
    );
  }

  return (
    <section className="text-center">
      <h1>Shopping cart:</h1>
      {content}
      <h5>Total price: ${cartCtx.totalPrice}</h5>
      {checkout}
    </section>
  );
}

export default CartPage;
