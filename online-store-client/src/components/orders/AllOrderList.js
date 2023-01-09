import classes from "../products/ProductList.module.css";
import AllOrderItem from "./AllOrderItem";

function AllOrderList(props) {
  return (
    <ul className={classes.list}>
      {props.orders.map((order) => (
        <AllOrderItem
          key={order.orderId}
          id={order.orderId}
          userId={order.userId}
          status={order.status}
          date={order.date}
          products={order.products}
          order={order}
        />
      ))}
    </ul>
  );
}

export default AllOrderList;
