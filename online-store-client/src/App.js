import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AllProductsPage from "./pages/AllProducts";
import TransactionPage from "./pages/Transaction";
import SignupPage from "./pages/Signup";
import CartPage from "./pages/Cart";
import LoginPage from "./pages/Login";
import DetailsPage from "./pages/Details";
import TransactionPrivateRoute from "./privateRoute/TransactionPrivateRoute";
import LoginPrivateRoute from "./privateRoute/LoginPrivateRoute";
import SignupPrivateRoute from "./privateRoute/SignupPrivateRoute";
import MyOrdersPrivateRoute from "./privateRoute/MyOrdersPrivateRoute";
import MyOrdersPage from "./pages/MyOrders";
import AdminPrivateRoute from "./privateRoute/AdminPrivateRoute";
import AdminPage from "./pages/Admin";

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<AllProductsPage />} />
          <Route
            path="/sign-up"
            element={
              <SignupPrivateRoute>
                <SignupPage />
              </SignupPrivateRoute>
            }
          />
          <Route
            path="/log-in"
            element={
              <LoginPrivateRoute>
                <LoginPage />
              </LoginPrivateRoute>
            }
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<DetailsPage />} />
          <Route
            path="/transaction"
            element={
              <TransactionPrivateRoute>
                <TransactionPage />
              </TransactionPrivateRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <MyOrdersPrivateRoute>
                <MyOrdersPage />
              </MyOrdersPrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminPrivateRoute>
                <AdminPage />
              </AdminPrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
