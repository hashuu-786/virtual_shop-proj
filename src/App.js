import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./pages/Checkout";
import ChatAssistant from "./components/ChatAssistant";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./components/UserProfile"; // ✅ Import UserProfile Component

function App() {
  return (
    <div style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      <Navbar />
      <div style={{ paddingTop: "60px" }}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/assistant" element={<ChatAssistant />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} /> {/* ✅ Added User Profile Route */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
