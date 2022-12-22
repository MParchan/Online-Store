import { useState, useEffect } from "react";
import { APIEndpoint, ENDPOINTS } from "../api";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ProductList from "../components/products/ProductList";

import "bootstrap/dist/css/bootstrap.css";

function AllProductsPage() {
  const [isLoadnig, setIsLoadin] = useState(true);
  const [loadedProducts, setLoadedProducts] = useState([]);

  useEffect(() => {
    setIsLoadin(true);
    APIEndpoint(ENDPOINTS.products)
      .getAll("")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const products = [];
        for (const key in data) {
          const product = {
            id: key,
            ...data[key],
          };
          products.push(product);
        }
        setIsLoadin(false);
        setLoadedProducts(products);
      });
  }, []);

  if (isLoadnig) {
    return (
      <section className="text-center">
        <LoadingSpinner />
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-center">List of products:</h1>
      <ProductList products={loadedProducts} />
    </section>
  );
}

export default AllProductsPage;
