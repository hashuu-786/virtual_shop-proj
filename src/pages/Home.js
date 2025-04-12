import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Skeleton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:3030/api/products/all")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {/* Hero Section */}
      <div
        style={{
          padding: "50px",
          background: "#f8f9fa",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={150} />
        ) : (
          <>
            <h1>Welcome to Your Virtual Shopping Assistant 🛍️</h1>
            <p>Find the best products with the power of AI!</p>
            <Link to="/products">
              <button
                style={{
                  padding: "10px 20px",
                  fontSize: "18px",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Shop Now
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Featured Products Section */}
      <h2>Featured Products</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {loading
          ? [1, 2, 3, 4].map((_, index) => (
              <Skeleton key={index} variant="rectangular" width="100%" height={100} />
            ))
          : products.length > 0
          ? products.map((product) => (
              <div
                key={product.id}
                style={{
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              >
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p><b>Price: ${product.price}</b></p>
                <button
                  style={{
                    padding: "5px 10px",
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))
          : <p>No products available.</p>}
      </div>

      {/* Floating Chat Assistant Button */}
      <Box sx={{ position: "fixed", bottom: 20, right: 20 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ChatIcon />}
          sx={{ bgcolor: "#6200ea", color: "white", padding: "10px 20px" }}
          onClick={() => navigate("/assistant")}
        >
          Chat with Assistant
        </Button>
      </Box>
    </div>
  );
}

export default Home;
