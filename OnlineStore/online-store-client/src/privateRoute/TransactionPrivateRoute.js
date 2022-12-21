import { Navigate } from "react-router-dom";
import AuthService from "../api/authService";

const TransactionPrivateRoute = ({ children }) => {
  const jwt = AuthService.getCurrentUser();
  return jwt ? children : <Navigate to={"/log-in"} />;
};

export default TransactionPrivateRoute;
