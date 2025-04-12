const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ GET user profile by ID
router.get("/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const [result] = await db.query(
            "SELECT id, first_name AS firstName, last_name AS lastName, email, phone_number AS phone FROM users WHERE id = ?",
            [userId]
        );

        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(result[0]);
    } catch (err) {
        console.error("❌ Error fetching user:", err);
        res.status(500).json({ error: "Failed to fetch user" });
    }
});

// ✅ PUT (update) user profile by ID
router.put("/:id", async (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, email, phone } = req.body;

    try {
        const [result] = await db.query(
            "UPDATE users SET first_name = ?, last_name = ?, email = ?, phone_number = ? WHERE id = ?",
            [firstName, lastName, email, phone, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found or no changes made" });
        }

        res.json({ message: "User updated successfully" });
    } catch (err) {
        console.error("❌ Error updating user:", err);
        res.status(500).json({ error: "Failed to update user" });
    }
});

module.exports = router;
