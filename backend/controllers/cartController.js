const db = require("../config/db"); // Import database pool

// ✅ Utility function to handle async DB queries
const queryAsync = async (query, params) => {
  try {
    console.log(`Executing query: ${query} with params: ${JSON.stringify(params)}`);
    const [results] = await db.query(query, params);
    console.log(`Query results: ${JSON.stringify(results)}`);
    return results;
  } catch (err) {
    console.error("❌ Database Query Error:", err);
    throw err; // Re-throw error after logging
  }
};

// ✅ Get Cart Items (Fetches product details)
exports.getCartItems = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ success: false, message: "Missing userId" });

    console.log(`🔍 Fetching cart items for userId: ${userId}`);

    const sql = `
      SELECT sc.product_id, sc.quantity, p.name, p.price, p.image
      FROM shopping_cart sc
      JOIN products p ON sc.product_id = p.id
      WHERE sc.user_id = ?
    `;

    const results = await queryAsync(sql, [userId]);

    if (results.length === 0) {
      console.log("⚠️ No items found for this user.");
      return res.status(200).json([]); // Return an empty array if no items are found
    }

    console.log("✅ Cart items fetched:", results);
    res.status(200).json(results);
  } catch (error) {
    console.error("❌ Unexpected Error (getCartItems):", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Add Item to Cart (Optimized with Transactions)
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || !quantity) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  console.log(`🛒 Adding to cart -> userId: ${userId}, productId: ${productId}, quantity: ${quantity}`);

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction(); // Start transaction

    // ✅ Check if user exists
    const [userExists] = await connection.query("SELECT id FROM users WHERE id = ?", [userId]);
    console.log(`User existence check for userId: ${userId} => ${JSON.stringify(userExists)}`);
    if (userExists.length === 0) throw new Error("User not found");

    // ✅ Check if product exists
    const [productExists] = await connection.query("SELECT id FROM products WHERE id = ?", [productId]);
    console.log(`Product existence check for productId: ${productId} => ${JSON.stringify(productExists)}`);
    if (productExists.length === 0) throw new Error("Product not found");

    // ✅ Check if item is already in cart
    const [existingCartItem] = await connection.query(
      "SELECT quantity FROM shopping_cart WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );
    console.log(`Existing cart item check: ${JSON.stringify(existingCartItem)}`);

    if (existingCartItem.length > 0) {
      // ✅ Update existing quantity
      await connection.query(
        "UPDATE shopping_cart SET quantity = quantity + ?, added_at = NOW() WHERE user_id = ? AND product_id = ?",
        [quantity, userId, productId]
      );
    } else {
      // ✅ Insert new cart item
      await connection.query(
        "INSERT INTO shopping_cart (user_id, product_id, quantity, added_at) VALUES (?, ?, ?, NOW())",
        [userId, productId, quantity]
      );
    }

    await connection.commit();
    console.log("✅ Item added to cart successfully!");
    res.status(200).json({ success: true, message: "Item added to cart successfully!" });
  } catch (error) {
    await connection.rollback(); // Rollback the transaction on error
    console.error("❌ Database Error (Add to Cart):", error);
    res.status(500).json({ success: false, message: "Database error", error: error.message });
  } finally {
    connection.release(); // Always release the connection after the operation
  }
};

// ✅ Remove Item from Cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({ success: false, message: "Missing userId or productId" });
    }

    console.log(`🗑️ Removing from cart -> userId: ${userId}, productId: ${productId}`);

    const [cartItem] = await db.query(
      "SELECT * FROM shopping_cart WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );
    console.log(`Cart item check: ${JSON.stringify(cartItem)}`);

    if (cartItem.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    await db.query("DELETE FROM shopping_cart WHERE user_id = ? AND product_id = ?", [userId, productId]);

    console.log("✅ Item removed from cart successfully!");
    res.status(200).json({ success: true, message: "Item removed successfully" });
  } catch (error) {
    console.error("❌ Unexpected Error (removeFromCart):", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Update Quantity in Cart
exports.updateCartQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity === undefined) {
      return res.status(400).json({ success: false, message: "Missing userId, productId, or quantity" });
    }

    console.log(`🔄 Updating quantity -> userId: ${userId}, productId: ${productId}, quantity: ${quantity}`);

    const [cartItem] = await db.query(
      "SELECT * FROM shopping_cart WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );
    console.log(`Cart item check for update: ${JSON.stringify(cartItem)}`);

    if (cartItem.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    await db.query(
      "UPDATE shopping_cart SET quantity = ?, added_at = NOW() WHERE user_id = ? AND product_id = ?",
      [quantity, userId, productId]
    );

    console.log("✅ Quantity updated successfully!");
    res.status(200).json({ success: true, message: "Quantity updated successfully!" });
  } catch (error) {
    console.error("❌ Unexpected Error (updateCartQuantity):", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
