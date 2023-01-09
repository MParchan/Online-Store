import axios from "axios";
import authService from "./authService";

const API_URL = "https://localhost:7297/api/Transaction/";

const transaction = (orderProducts) => {
  localStorage.getItem("transactionResponse", null);
  if (authService.getCurrentUser() != null) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + authService.getCurrentUser();
  }
  const email = authService.getUserEmail();
  const response = axios
    .post(API_URL, orderProducts, {
      params: { email },
    })
    .then((response) => {
      return response.data;
    });
  return response;
};

const getTransactionResponse = () => {
  return localStorage.getItem("transactionResponse");
};

const userOrders = () => {
  if (authService.getCurrentUser() != null) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + authService.getCurrentUser();
  }
  const email = authService.getUserEmail();
  const response = axios
    .get(API_URL + "UserOrders/", {
      params: { email },
    })
    .then((response) => {
      return response.data;
    });
  return response;
};

const getOrders = () => {
  if (authService.getCurrentUser() != null) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + authService.getCurrentUser();
  }
  if (authService.getUserRole() === "Admin") {
    const response = axios.get(API_URL + "Orders/").then((response) => {
      return response.data;
    });
    return response;
  } else {
    return null;
  }
};

const putOrder = (id, updatedOrder) => {
  if (authService.getCurrentUser() != null) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + authService.getCurrentUser();
  }
  if (authService.getUserRole() === "Admin") {
    const response = axios.put(API_URL + id, updatedOrder).then((response) => {
      return response.status;
    });
    return response;
  } else {
    return null;
  }
};

const transactionService = {
  transaction,
  getTransactionResponse,
  userOrders,
  getOrders,
  putOrder,
};

export default transactionService;
