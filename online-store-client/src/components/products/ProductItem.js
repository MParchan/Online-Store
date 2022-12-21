import { useContext } from "react";
import Card from "../ui/Card";
import CartContext from "../../store/cart-context";
import classes from "./ProductItem.module.css";

function ProductItem(props) {
  const cartCtx = useContext(CartContext);

  const itemIsInCart = cartCtx.itemIsInCart(props.id);

  function toggleCartStatusHandler() {
    if (itemIsInCart) {
      cartCtx.removeFromCart(props.id);
    } else {
      cartCtx.addToCart({
        productId: props.id,
        name: props.name,
        description: props.description,
        cost: props.cost,
      });
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <h5>${props.cost}</h5>
        </div>
        <div className="text-center p-2">
          <button className="btn btn-dark" onClick={toggleCartStatusHandler}>
            {itemIsInCart ? "Remove from shopping cart" : "To shopping cart"}
          </button>
        </div>
      </Card>
    </li>
  );
}

export default ProductItem;
