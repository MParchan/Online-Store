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
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
