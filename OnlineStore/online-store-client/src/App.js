import { Route, Routes } from "react-router-dom";
import AllProductsPage from "./pages/AllProducts";
import Layout from "./components/layout/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<AllProductsPage />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
