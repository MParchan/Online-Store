import { useContext, useEffect, useState } from "react";
import CartContext from "../store/cart-context";
import TransactionService from "../api/transactionService";

function TransactionPage() {
  const cartCtx = useContext(CartContext);
  const [response, setResponse] = useState("");

  useEffect(() => {
    TransactionService.transaction().then((response) => {
      setResponse(response);
    });
    cartCtx.clearTheCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>{response}</div>;
}

export default TransactionPage;
