import axios from "axios";

const API_URL = "https://localhost:7297/api/Transaction";

const bodyParameters = {
  key: "value",
};

const transaction = async () => {
  const response = await axios.post(API_URL, bodyParameters);
  return response.data;
};

const transactionService = {
  transaction,
};

export default transactionService;
