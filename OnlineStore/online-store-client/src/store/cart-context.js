import { createContext, useState } from "react";

const CartContext = createContext({
  items: [],
  totalItems: 0,
  addToCart: (addedProduct) => {},
  removeFromCart: (productId) => {},
  itemIsInCart: (productId) => {},
  clearTheCart: () => {},
});

export function CartContextProvider(props) {
  const [cart, setCart] = useState([]);

  function addToCartHandler(addedProduct) {
    setCart((prevCart) => {
      return prevCart.concat(addedProduct);
    });
  }

  function removeFromCartHandler(productId) {
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
