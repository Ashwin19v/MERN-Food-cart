// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context/store";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoutes";
import Settings from "./pages/Settings";
import Cart from "./pages/Cart";
import Favourite from "./pages/Favourite";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/Checkout";
import Layout from "./components/Layout";
import PageNotFound from "./pages/PageNotFound";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes with Layout */}
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products/:productId" element={<ProductPage />} />
              <Route path="category/:categoryName" element={<CategoryPage />} />
              <Route path="settings" element={<Settings />} />
              <Route path="cart" element={<Cart />} />
              <Route path="favourites" element={<Favourite />} />
              <Route path="checkout" element={<CheckoutPage />} />
            </Route>
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
