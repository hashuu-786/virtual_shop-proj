import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUserId = localStorage.getItem("userId");
  const userId = storedUserId && !isNaN(storedUserId) ? parseInt(storedUserId) : null;

  useEffect(() => {
    if (!userId) {
      alert("You must be logged in to view products.");
      navigate("/login");
      return;
    }

    fetch("http://localhost:3030/api/products/all")
      .then((response) => response.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching products:", error);
        setLoading(false);
      });
  }, [userId, navigate]);

  const addToCart = async (productId) => {
    if (!userId) {
      alert("User not logged in!");
      navigate("/login");
      return;
    }

    try {
      console.log(`🛒 Adding product ID: ${productId} to cart for userId: ${userId}`);

      const response = await fetch("http://localhost:3030/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Add to Cart Error:", data);
        throw new Error(data.message || "Failed to add product to cart");
      }

      console.log("✅ Product added to cart:", data);
      alert("🛒 Product added to cart!");
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      alert("Failed to add product to cart! Reason: " + error.message);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Featured Products
      </Typography>
      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(4)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card>
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    sx={{ width: "100%" }}
                  />
                  <CardContent>
                    <Skeleton width="60%" />
                    <Skeleton width="40%" />
                    <Skeleton width="80%" />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : products.length > 0
          ? products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      product.image ? product.image : "/default-image.jpg"
                    }
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {product.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      ₹{product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => addToCart(product.id)}
                      sx={{ marginRight: "8px", marginTop: "8px" }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => navigate(`/product/${product.id}`)}
                      sx={{ marginTop: "8px" }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : (
            <Typography variant="h6" color="text.secondary">
              No products available.
            </Typography>
          )}
      </Grid>
    </>
  );
}

export default ProductList;
