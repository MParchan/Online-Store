import { createContext, useState } from "react";

const CartContext = createContext({
  items: [],
  totalItems: 0,
  addToCart: (addedProduct) => {},
  removeFromCart: (productId) => {},
  itemIsInCart: (productId) => {},
});

export function CartContextProvider(props) {
  const [cart, setCart] = useState([]);

  function addToCartHandler(addedProduct) {
    console.log("sdaasdasd");
    setCart((prevCart) => {
      return prevCart.concat(addedProduct);
    });
  }

  function removeFromCartHandler(productId) {
    setCart((prevCart) => {
      return prevCart.filter((product) => product.productId !== productId);
    });
  }

  function itemIsInCart(productId) {
    return cart.some((product) => product.productId === productId);
  }

  const context = {
    items: cart,
    totalItems: cart.length,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    itemIsInCart: itemIsInCart,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContext;
