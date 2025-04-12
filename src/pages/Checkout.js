import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:3030/api/cart?userId=${userId}`);
        const data = await response.json();
        setCartItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch(`http://localhost:3030/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          items: cartItems.map((item) => ({
            productId: item.product_id,
            quantity: item.quantity,
          })),
          totalPrice,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to place order");

      console.log("✅ Order placed:", result);

      // Clear cart after successful order
      await fetch(`http://localhost:3030/api/cart/clear/${userId}`, {
        method: "DELETE",
      });

      setOrderPlaced(true);
    } catch (error) {
      console.error("❌ Order error:", error);
      alert("Failed to place order. Reason: " + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (orderPlaced) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>🎉 Thank you for your order!</h2>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  return (
    <div>
      <h2>🧾 Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.product_id}>
              <p><strong>{item.name}</strong></p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
              <hr />
            </div>
          ))}
          <h3>Total: ₹{totalPrice}</h3>
          <button onClick={handlePlaceOrder}>
            ✅ Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
