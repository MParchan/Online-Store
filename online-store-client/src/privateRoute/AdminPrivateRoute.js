import { Navigate } from "react-router-dom";
import AuthService from "../api/authService";

const AdminPrivateRoute = ({ children }) => {
  const jwt = AuthService.getCurrentUser();
  const role = AuthService.getUserRole();
  return jwt ? (
    role === "Admin" ? (
      children
    ) : (
      <Navigate to={"/"} />
    )
  ) : (
    <Navigate to={"/log-in"} />
  );
};

export default AdminPrivateRoute;
