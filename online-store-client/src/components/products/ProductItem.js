import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import CartContext from "../../store/cart-context";
import classes from "./ProductItem.module.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

function ProductItem(props) {
  const cartCtx = useContext(CartContext);
  const [open, setOpen] = useState(false);

  function toggleCartStatusHandler() {
    cartCtx.addToCart({
      productId: props.id,
      name: props.name,
      description: props.description,
      cost: props.cost,
      quantity: 1,
    });
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <li className={classes.item}>
      <Card>
        <div className="row">
          <div className="col-10">
            <div className={classes.content}>
              <Link
                to={`/product/${props.id}`}
                className="display-6 text-decoration-none text-dark"
              >
                {props.name}
              </Link>
              <h5 className="mt-3">${parseFloat(props.cost).toFixed(2)}</h5>
            </div>
          </div>
          <div className="text-center my-2 p-2 col-2">
            <button
              className="btn btn-dark m-1 rounded-circle"
              style={{ height: "50px" }}
              onClick={toggleCartStatusHandler}
            >
              <AddShoppingCartIcon />
            </button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Product added to shopping cart successfully."}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </Card>
    </li>
  );
}

export default ProductItem;
