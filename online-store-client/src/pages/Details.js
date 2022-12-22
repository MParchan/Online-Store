import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { APIEndpoint, ENDPOINTS } from "../api";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import CartContext from "../store/cart-context";

function DetailsPage() {
  const params = useParams();
  const cartCtx = useContext(CartContext);
  const itemIsInCart = cartCtx.itemIsInCart(Number(params.id));
  const [isLoadnig, setIsLoadin] = useState(true);
  const [product, setProduct] = useState();
  const navigate = useNavigate();

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
    if (itemIsInCart) {
      cartCtx.removeFromCart(Number(params.id));
    } else {
      cartCtx.addToCart({
        productId: params.id,
        name: product.name,
        description: product.description,
        cost: product.cost,
      });
    }
  }

  if (isLoadnig) {
    return (
      <section className="text-center">
        <LoadingSpinner />
      </section>
    );
  }
  return (
    <Card>
      <div className="text-center text-justify p-3">
        <h1 className="m-3">{product.name}</h1>
        <h3 className="m-3">Price: ${parseFloat(product.cost).toFixed(2)}</h3>
        <h5 className="m-3">Producent: {product.brand.name}</h5>
        <h5 className="text-start">Description:</h5>
        <p style={{ textAlign: "justify" }}>{product.description}</p>
        <button onClick={() => navigate(-1)} className="btn btn-dark m-1">
          Back
        </button>
        <button className="btn btn-dark m-1" onClick={toggleCartStatusHandler}>
          {itemIsInCart ? "Remove from shopping cart" : "To shopping cart"}
        </button>
      </div>
    </Card>
  );
}

export default DetailsPage;
