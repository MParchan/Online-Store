import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APIEndpoint, ENDPOINTS } from "../api";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import CartContext from "../store/cart-context";

function DetailsPage() {
  const params = useParams();
  const cartCtx = useContext(CartContext);
  const [isLoadnig, setIsLoadin] = useState(true);
  const [product, setProduct] = useState();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsLoadin(true);
    APIEndpoint(ENDPOINTS.products)
      .getById(params.id)
      .then((response) => {
        setProduct(response.data);
        setIsLoadin(false);
        return response.data;
      });
  }, [params]);

  function toggleCartStatusHandler() {
    cartCtx.addToCart({
      productId: Number(params.id),
      name: product.name,
      description: product.description,
      cost: product.cost,
      quantity: quantity,
    });
    if (cartCtx.itemIsInCart(Number(params.id))) {
      setOpen(true);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };
  if (isLoadnig) {
    return (
      <section className="text-center">
        <LoadingSpinner />
      </section>
    );
  }

  function handleIncrement() {
    setQuantity(quantity + 1);
  }

  function handleDecrement() {
    setQuantity(quantity - 1);
  }

  return (
    <div className="text-center text-justify p-3">
      <h1 className="m-3">{product.name}</h1>
      <h5 className="m-3">Producent: {product.brand.name}</h5>
      <h3 className="m-3">Price: ${parseFloat(product.cost).toFixed(2)}</h3>
      <ButtonGroup>
        {quantity === 1 ? (
          <Button onClick={handleDecrement} disabled>
            -
          </Button>
        ) : (
          <Button className="text-dark border-dark" onClick={handleDecrement}>
            -
          </Button>
        )}

        <Button className="text-dark" disabled>
          {quantity}
        </Button>
        <Button className="text-dark border-dark" onClick={handleIncrement}>
          +
        </Button>
      </ButtonGroup>
      <button className="btn btn-dark mx-3" onClick={toggleCartStatusHandler}>
        Add to cart
      </button>
      <h5 className="text-start ">Description:</h5>
      <p style={{ textAlign: "justify" }}>{product.description}</p>
      <button onClick={() => navigate(-1)} className="btn btn-dark m-1">
        Back
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
  );
}

export default DetailsPage;
