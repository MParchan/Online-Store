import { Navigate } from "react-router-dom";
import AuthService from "../api/authService";

const MyOrdersPrivateRoute = ({ children }) => {
  const jwt = AuthService.getCurrentUser();
  return jwt ? children : <Navigate to={"/log-in"} />;
};

export default MyOrdersPrivateRoute;
