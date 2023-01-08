import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import CartContext from "../../store/cart-context";
import classes from "./ProductItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, ButtonGroup } from "@mui/material";

function ProductItem(props) {
  const cartCtx = useContext(CartContext);
  const [quantity, setQuantity] = useState(props.quantity);

  const itemIsInCart = cartCtx.itemIsInCart(props.id);

  function toggleCartStatusHandler() {
    if (itemIsInCart) {
      cartCtx.removeFromCart(props.id);
    }
  }

  function handleIncrement() {
    if (itemIsInCart) {
      cartCtx.increaseQuantity(props.id);
      setQuantity(quantity + 1);
    }
  }

  function handleDecrement() {
    if (itemIsInCart) {
      cartCtx.decreaseQuantity(props.id);
      setQuantity(quantity - 1);
    }
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className="row p-3">
          <div className="col">
            <Link
              to={`/product/${props.id}`}
              className="display-6 text-decoration-none text-dark"
            >
              {props.name}
            </Link>
          </div>
          <div className="col">
            <ul className="list-group list-group-horizontal d-flex flex-row-reverse">
              <li className="list-group-item border-0">
                <button className="btn btn-link p-0">
                  <DeleteIcon
                    className="text-dark"
                    onClick={toggleCartStatusHandler}
                  />
                </button>
              </li>

              <li className="list-group-item border-0">
                <ButtonGroup>
                  {quantity === 1 ? (
                    <Button onClick={handleDecrement} disabled>
                      -
                    </Button>
                  ) : (
                    <Button
                      className="text-dark border-dark"
                      onClick={handleDecrement}
                    >
                      -
                    </Button>
                  )}

                  <Button className="text-dark" disabled>
                    {quantity}
                  </Button>
                  <Button
                    className="text-dark border-dark"
                    onClick={handleIncrement}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </li>
              <li className="list-group-item border-0">
                <h4>${parseFloat(props.cost).toFixed(2)}</h4>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </li>
  );
}

export default ProductItem;
