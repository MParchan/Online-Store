import axios from "axios";
import AuthService from "./authService";

const API_URL = "https://localhost:7297/api/Transaction";

const config = {
  headers: { Authorization: `bearer ${AuthService.getCurrentUser()}` },
};

const bodyParameters = {
  key: "value",
};

const transaction = () => {
  return axios.post(API_URL, bodyParameters, config).then((response) => {
    return response.data;
  });
};

const transactionService = {
  transaction,
};

export default transactionService;
