import axios from "axios";

const API_URL = "https://localhost:7297/api/Auth";

const signup = (email, password, confirmPassword) => {
  return axios.post(API_URL + "/Register", {
    email,
    password,
    confirmPassword,
  });
};

const login = async (email, password) => {
  const response = await axios.post(API_URL + "/Login", {
    email,
    password,
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
  delete axios.defaults.headers.common["Authorization"];
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
