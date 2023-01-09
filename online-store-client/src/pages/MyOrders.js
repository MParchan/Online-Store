import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import transactionService from "../api/transactionService";
import MyOrderList from "../components/orders/MyOrderList";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import PaginationBar from "../components/ui/Pagination";

function MyOrdersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedOrders, setLoadedOrders] = useState([]);
  const [ordersPerPage, setOrdersPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    transactionService.userOrders().then((response) => {
      const orders = [];
      for (const key in response) {
        const order = {
          id: key,
          ...response[key],
        };
        orders.push(order);
      }
      setLoadedOrders(orders);
      setIsLoading(false);
    });
  }, []);

  const indexOfLastProduct = currentPage * ordersPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ordersPerPage;
  const currentProducts = loadedOrders.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const itemsPerPageHandler = (e) => {
    var input = e.target.value;
    setOrdersPerPage(input);
  };

  if (isLoading) {
    return (
      <section className="text-center">
        <LoadingSpinner />
      </section>
    );
  }
  return (
    <div className="text-center">
      <h1>My orders:</h1>
      <MyOrderList orders={currentProducts} />
      <div className="row">
        <div className="col-10">
          <PaginationBar
            itemsPerPage={ordersPerPage}
            totalItems={loadedOrders.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
        <div className="col-2  text-center">
          <FormControl fullWidth>
            <InputLabel>Items/page</InputLabel>
            <Select
              style={{ height: "40px" }}
              value={ordersPerPage}
              label="Items/page"
              onChange={itemsPerPageHandler}
            >
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default MyOrdersPage;
