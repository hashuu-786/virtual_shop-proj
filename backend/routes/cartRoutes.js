const express = require("express");
const router = express.Router();
const {
    getCartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity
} = require("../controllers/cartController");
const db = require("../config/db"); // ✅ Required for clearing cart

// ✅ Add Item to Cart
router.post("/add", async (req, res, next) => {
    try {
        await addToCart(req, res);
    } catch (error) {
        console.error("❌ Error in addToCart:", error);
        next(error);
    }
});

// ✅ Get All Cart Items (Requires `userId` query param)
router.get("/", async (req, res, next) => {
    try {
        await getCartItems(req, res);
    } catch (error) {
        console.error("❌ Error in getCartItems:", error);
        next(error);
    }
});

// ✅ Remove Item from Cart
router.delete("/:userId/:productId", async (req, res, next) => {
    try {
        await removeFromCart(req, res);
    } catch (error) {
        console.error("❌ Error in removeFromCart:", error);
        next(error);
    }
});

// ✅ Update Quantity in Cart
router.put("/update", async (req, res, next) => {
    try {
        await updateCartQuantity(req, res);
    } catch (error) {
        console.error("❌ Error in updateCartQuantity:", error);
        next(error);
    }
});

// ✅ Clear Entire Cart (after order placed)
router.delete("/clear/:userId", async (req, res, next) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ success: false, message: "Missing userId" });
    }

    try {
        await db.query("DELETE FROM shopping_cart WHERE user_id = ?", [userId]);
        res.json({ success: true, message: "Cart cleared successfully!" });
    } catch (error) {
        console.error("❌ Error clearing cart:", error);
        next(error);
    }
});

// ✅ Global error handling middleware
router.use((err, req, res, next) => {
    console.error("🔥 Cart Routes Error:", err.stack);

    if (err.code === "ER_BAD_FIELD_ERROR") {
        return res.status(400).json({
            error: "Invalid field in request",
            message: err.message,
        });
    }

    res.status(500).json({
        error: "Internal server error",
        message: err.message || "Something went wrong",
    });
});

module.exports = router;
