// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productProvider as ProductProvider } from "./context/productStore";
import { AuthProvider } from "./context/authStore";
import { orderProvider as OrderProvider } from "./context/orderStore";
import { cartProvider as CartProvider } from "./context/cartStore";
import { reviewProvider as ReviewProvider } from "./context/reviewStore";
import { favouriteProvider as FavouriteProvider } from "./context/favouriteStore";

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
import ChatPage from "./pages/ChatPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SettingsPage from "./pages/Settings";
// import ReviewPage from "./pages/Review";

function App() {
  return (
    // <StoreProvider>
    <AuthProvider>
      <CartProvider>
        <FavouriteProvider>
          <OrderProvider>
            <ReviewProvider>
              <ProductProvider>
                <BrowserRouter>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Routes with Layout */}
                    <Route path="/" element={<ProtectedRoute />}>
                      <Route element={<Layout />}>
                        <Route path="/dashboard" index element={<Home />} />
                        <Route
                          path="products/:productId"
                          element={<ProductPage />}
                        />
                        <Route
                          path="category/:categoryName"
                          element={<CategoryPage />}
                        />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="favourites" element={<Favourite />} />
                        <Route path="checkout" element={<CheckoutPage />} />
                        {/* <Route path="chat" element={<ChatPage />} /> */}
                      </Route>
                    </Route>

                    {/* 404 Route */}
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                  <ToastContainer
                    position="bottom-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                </BrowserRouter>
              </ProductProvider>
            </ReviewProvider>
          </OrderProvider>
        </FavouriteProvider>
      </CartProvider>
    </AuthProvider>
    // </StoreProvider>
  );
}

export default App;
