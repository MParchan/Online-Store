import axios from "axios";

export const BASE_URL = "https://localhost:7297";

export const ENDPOINTS = {
  products: "Products",
  brands: "Brands",
};

export const APIEndpoint = (endpoint) => {
  let url = BASE_URL + "/api/" + endpoint + "/";
  return {
    getAll: (type) => axios.get(url + type),
    getById: (id) => axios.get(url + id),
    post: (newRecord) => axios.post(url, newRecord),
    put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    delete: (id) => axios.delete(url + id),
  };
};
