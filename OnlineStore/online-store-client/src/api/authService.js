import axios from "axios";

const API_URL = "https://localhost:7297/api/Auth";

const signup = (email, password) => {
  return axios
    .post(API_URL + "/Register", {
      email,
      password,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/Login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
