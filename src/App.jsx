import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ProductPage from "./pages/ProductPage";
import ProductViewPage from "./pages/ProductViewPage";
import CartPage from "./pages/CartPage";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import SellerProducts from "./pages/SellerProducts";

function App() {
  return (
    <Routes>
      <Route path="/admin/products" element={<SellerProducts />} />
      <Route path="/" element={<Navigate to="/products" replace={true} />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/:product_id" element={<ProductViewPage />} />
      <Route path="/:product_id" element={<ProductViewPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default App;
