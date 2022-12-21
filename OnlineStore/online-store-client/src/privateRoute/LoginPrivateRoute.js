import { Navigate } from "react-router-dom";
import AuthService from "../api/authService";

const LoginPrivateRoute = ({ children }) => {
  const jwt = AuthService.getCurrentUser();
  return jwt ? <Navigate to={"/"} /> : children;
};

export default LoginPrivateRoute;
