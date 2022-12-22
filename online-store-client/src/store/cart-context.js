import { createContext, useState } from "react";

const CartContext = createContext({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  addToCart: (addedProduct) => {},
  removeFromCart: (productId) => {},
  itemIsInCart: (productId) => {},
  clearTheCart: () => {},
});

export function CartContextProvider(props) {
  const [cart, setCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  function addToCartHandler(addedProduct) {
    setTotalCost(
      (parseFloat(totalCost) + parseFloat(addedProduct.cost)).toFixed(2)
    );
    setCart((prevCart) => {
      return prevCart.concat(addedProduct);
    });
  }

  function removeFromCartHandler(productId) {
    for (let p in cart) {
      if (cart[p].productId === productId) {
        setTotalCost(
          (parseFloat(totalCost) - parseFloat(cart[p].cost)).toFixed(2)
        );
      }
    }
    setCart((prevCart) => {
      return prevCart.filter((product) => product.productId !== productId);
    });
  }

  function itemIsInCartHandler(productId) {
    return cart.some((product) => product.productId === productId);
  }

  function clearTheCartHandler() {
    setCart([]);
  }

  const context = {
    items: cart,
    totalItems: cart.length,
    totalPrice: totalCost,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    itemIsInCart: itemIsInCartHandler,
    clearTheCart: clearTheCartHandler,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContext;
