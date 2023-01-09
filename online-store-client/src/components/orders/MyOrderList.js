import MyOrderItem from "./MyOrderItem";
import classes from "../products/ProductList.module.css";

function MyOrderList(props) {
  return (
    <ul className={classes.list}>
      {props.orders.map((order) => (
        <MyOrderItem
          key={order.orderId}
          id={order.orderId}
          userId={order.userId}
          status={order.status}
          date={order.date}
          products={order.products}
        />
      ))}
    </ul>
  );
}

export default MyOrderList;
