import CartProductItem from "./CartProductItem";
import classes from "./ProductList.module.css";

function CartProductList(props) {
  return (
    <ul className={classes.list}>
      {props.products.map((product) => (
        <CartProductItem
          key={product.productId}
          id={product.productId}
          name={product.name}
          description={product.description}
          cost={product.cost}
          quantity={product.quantity}
        />
      ))}
    </ul>
  );
}

export default CartProductList;
