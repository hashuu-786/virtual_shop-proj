import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Button, Container, Skeleton } from "@mui/material";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3030/api/products/${id}`);
        const data = await res.json();
        if (res.ok) {
          setProduct(data);
        } else {
          console.error("Product fetch failed:", data.message);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Skeleton variant="rectangular" width={500} height={400} />
      </Container>
    );
  }

  if (!product) {
    return <Typography variant="h5">Product not found.</Typography>;
  }

  return (
    <Container sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <Card sx={{ maxWidth: 500, padding: "20px" }}>
        <CardMedia component="img" height="300" image={product.image} alt={product.name} />
        <CardContent>
          <Typography variant="h5" fontWeight="bold">{product.name}</Typography>
          <Typography variant="h6" color="primary" sx={{ marginTop: "10px" }}>₹{product.price}</Typography>
          <Typography variant="body1" sx={{ marginTop: "10px" }}>{product.description || "No description available."}</Typography>
          <Button variant="contained" color="primary" sx={{ marginTop: "20px", width: "100%" }}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductDetails;
