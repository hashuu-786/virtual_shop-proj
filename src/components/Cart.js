import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const fetchCart = useCallback(async () => {
    if (!userId) {
      console.warn("⚠️ User ID missing! Cannot fetch cart.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3030/api/cart?userId=${userId}`);
      if (!response.ok) throw new Error("Failed to fetch cart items");

      const data = await response.json();
      console.log("✅ Cart API response:", data);

      if (Array.isArray(data)) {
        setCartItems(data);
      } else {
        console.error("❌ Invalid data format:", data);
        setCartItems([]);
      }
    } catch (error) {
      console.error("❌ Error fetching cart items:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const removeFromCart = async (productId) => {
    if (!userId || !productId) {
      alert("⚠️ Missing userId or productId!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3030/api/cart/${userId}/${productId}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to remove item");

      setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== productId));
      alert("🛒 Item removed from cart!");
    } catch (error) {
      console.error("❌ Error removing item:", error);
      alert("Failed to remove item! Reason: " + error.message);
      fetchCart();
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

  return (
    <div>
      <h2>🛒 Shopping Cart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <CartList cartItems={cartItems} removeFromCart={removeFromCart} setCartItems={setCartItems} refreshCart={fetchCart} />
      )}
      <CartTotal totalPrice={totalPrice} onCheckout={() => navigate("/checkout")} />
    </div>
  );
};

// 🛍 Cart List Component
const CartList = ({ cartItems, removeFromCart, setCartItems, refreshCart }) => (
  <div>
    {cartItems.map((item) => (
      <CartItem key={item.product_id} item={item} removeFromCart={removeFromCart} setCartItems={setCartItems} refreshCart={refreshCart} />
    ))}
  </div>
);

// 🛍 Individual Cart Item Component with Quantity Selector
const CartItem = ({ item, removeFromCart, setCartItems, refreshCart }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  useEffect(() => {
    setQuantity(item.quantity || 1);
  }, [item.quantity]);

  const updateQuantity = async (newQty) => {
    if (newQty < 1) return;

    const userId = localStorage.getItem("userId");

    console.log("🔍 Sending updateQuantity request with:", {
      userId,
      productId: item.product_id,
      quantity: newQty,
    });

    try {
      const response = await fetch(`http://localhost:3030/api/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId: item.product_id,
          quantity: newQty,
        }),
      });

      if (!response.ok) {
        const errorResult = await response.text();
        throw new Error(errorResult || "Failed to update quantity");
      }

      const result = await response.json();
      console.log("✅ Quantity updated:", result);

      setCartItems((prevItems) => prevItems.map((item) => 
        item.product_id === result.product_id ? { ...item, quantity: result.quantity } : item
      ));
    } catch (error) {
      console.error("❌ Error updating quantity:", error);
      alert("Failed to update quantity! Reason: " + error.message);
    }
  };

  const handleDecrease = () => updateQuantity(quantity - 1);
  const handleIncrease = () => updateQuantity(quantity + 1);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #ccc" }}>
      <img src={item.image} alt={item.name} width="80" height="80" />
      <div>
        <h4>{item.name}</h4>
        <p>₹{item.price}</p>
        <div>
          <button onClick={handleDecrease} style={{ padding: "2px 8px" }}>-</button>
          <span style={{ margin: "0 10px" }}>{quantity}</span>
          <button onClick={handleIncrease} style={{ padding: "2px 8px" }}>+</button>
        </div>
      </div>
      <button
        onClick={() => removeFromCart(item.product_id)}
        style={{
          backgroundColor: "red",
          color: "white",
          border: "none",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        ❌ Remove
      </button>
    </div>
  );
};

// 🏷 Cart Total Component
const CartTotal = ({ totalPrice, onCheckout }) => (
  <div style={{ marginTop: "20px", textAlign: "center" }}>
    <h3>Total: ₹{totalPrice}</h3>
    <button
      onClick={onCheckout}
      style={{
        padding: "10px 20px",
        backgroundColor: "blue",
        color: "white",
        cursor: "pointer",
      }}
    >
      Proceed to Checkout
    </button>
  </div>
);

export default Cart;
