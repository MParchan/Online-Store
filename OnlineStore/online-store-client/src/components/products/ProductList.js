import ProductItem from "./ProductItem";
import classes from "./ProductList.module.css";

function ProductList(props) {
  return (
    <ul className={classes.list}>
      {props.products.map((product) => (
        <ProductItem
          key={product.productId}
          id={product.productId}
          name={product.name}
          description={product.description}
          cost={product.cost}
        />
      ))}
    </ul>
  );
}

export default ProductList;
