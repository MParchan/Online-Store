import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CartContext = createContext({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  addToCart: (addedProduct) => {},
  increaseQuantity: (productId) => {},
  decreaseQuantity: (productId) => {},
  removeFromCart: (productId) => {},
  itemIsInCart: (productId) => {},
  clearTheCart: () => {},
});

export function CartContextProvider(props) {
  const [cart, setCart] = useLocalStorage("shopping-cart", []);
  const [totalCost, setTotalCost] = useLocalStorage(
    "shopping-cart-totalCost",
    0.0
  );

  function addToCartHandler(addedProduct) {
    setTotalCost(
      parseFloat(totalCost) +
        parseFloat(addedProduct.cost) * addedProduct.quantity
    );
    setCart((currItems) => {
      if (
        currItems.find((item) => item.productId === addedProduct.productId) ==
        null
      ) {
        return currItems.concat(addedProduct);
      } else {
        return currItems.map((item) => {
          if (item.productId === addedProduct.productId) {
            item.quantity += addedProduct.quantity;
            setTotalCost(
              parseFloat(
                parseFloat(totalCost) + item.cost * addedProduct.quantity
              )
            );
            return item;
          } else {
            return item;
          }
        });
      }
    });
  }

  function increaseQuantityHandler(productId) {
    setCart((currItems) => {
      if (currItems.find((item) => item.productId === productId) == null) {
        return [...currItems, { productId, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.productId === productId) {
            item.quantity += 1;
            setTotalCost(parseFloat(parseFloat(totalCost) + item.cost));
            return item;
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseQuantityHandler(productId) {
    setCart((currItems) => {
      if (currItems.find((item) => item.productId === productId) == null) {
        return [...currItems, { productId, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.productId === productId) {
            item.quantity -= 1;
            setTotalCost(parseFloat(parseFloat(totalCost) - item.cost));
            return item;
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCartHandler(productId) {
    for (let p in cart) {
      if (cart[p].productId === productId) {
        setTotalCost(
          parseFloat(totalCost) - parseFloat(cart[p].cost * cart[p].quantity)
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
    setTotalCost(0);
  }

  const context = {
    items: cart,
    totalItems: cart.length,
    totalPrice: totalCost.toFixed(2),
    addToCart: addToCartHandler,
    increaseQuantity: increaseQuantityHandler,
    decreaseQuantity: decreaseQuantityHandler,
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
