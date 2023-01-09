import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function TransactionPage() {
  const [response, setResponse] = useState(
    "Oops something went wrong. Try again."
  );
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.state.response !== "") {
      setResponse(location.state.response);
    }
    setIsLoading(false);
  }, [location.state.response]);

  if (isLoading) {
    return (
      <section className="text-center">
        <LoadingSpinner />
      </section>
    );
  }
  return <div className="text-center">{response}</div>;
}

export default TransactionPage;
