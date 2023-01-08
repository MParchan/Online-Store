import { useEffect, useState } from "react";

function TransactionPage() {
  const [response, setResponse] = useState();

  useEffect(() => {
    if (localStorage.getItem("transactionResponse") !== null) {
      setResponse(localStorage.getItem("transactionResponse"));
      localStorage.removeItem("transactionResponse");
    } else {
      setResponse("Oops something went wrong. Try again.");
    }
  }, []);
  return <div className="text-center">{response}</div>;
}

export default TransactionPage;
