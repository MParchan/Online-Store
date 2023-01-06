import { useContext } from "react";
import { Link } from "react-router-dom";
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
          <Link
            to={`/product/${props.id}`}
            className="display-6 text-decoration-none text-dark"
          >
            {props.name}
          </Link>
          <h5>${parseFloat(props.cost).toFixed(2)}</h5>
        </div>
        <div className="text-center p-2">
          <button
            className="btn btn-dark m-1"
            onClick={toggleCartStatusHandler}
          >
            {itemIsInCart
              ? "Remove from shopping cart"
              : "Add to shopping cart"}
          </button>
        </div>
      </Card>
    </li>
  );
}

export default ProductItem;
