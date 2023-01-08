import axios from "axios";
import authService from "./authService";

const API_URL = "https://localhost:7297/api/Transaction";

const transaction = async (orderProducts) => {
  if (authService.getCurrentUser() != null) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + authService.getCurrentUser();
  }
  const email = authService.getUserEmail();
  const response = await axios.post(API_URL, orderProducts, {
    params: { email },
  });
  console.log(response);
  if (response.data !== undefined) {
    localStorage.setItem("transactionResponse", response.data);
  }
  return response.data;
};

const transactionService = {
  transaction,
};

export default transactionService;
