// backend/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../config/db"); // make sure db connection is correct

// 📦 Place a new order
router.post("/", async (req, res) => {
  const { userId, items, totalPrice } = req.body;

  if (!userId || !items || !Array.isArray(items) || items.length === 0 || !totalPrice) {
    return res.status(400).json({ success: false, message: "Missing userId, items, or totalPrice" });
  }

  try {
    // 1. Insert into orders table
    const [orderResult] = await db.execute(
      "INSERT INTO orders (user_id, total_price) VALUES (?, ?)",
      [userId, totalPrice]
    );

    const orderId = orderResult.insertId;

    // 2. Insert items into order_items table
    const insertPromises = items.map((item) => {
      return db.execute(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
        [orderId, item.productId, item.quantity]
      );
    });

    await Promise.all(insertPromises);

    res.status(201).json({ success: true, message: "Order placed successfully", orderId });
  } catch (error) {
    console.error("❌ Failed to place order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
