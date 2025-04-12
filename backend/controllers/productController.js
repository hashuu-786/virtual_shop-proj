const db = require("../config/db");

// 📌 Add Product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, image, stock } = req.body;

        if (!name || !price || !stock) {
            return res.status(400).json({ error: "Name, price, and stock are required" });
        }

        const sql = "INSERT INTO products (name, description, price, image, stock) VALUES (?, ?, ?, ?, ?)";
        await db.query(sql, [name, description || "", price, image || "", stock]);

        res.status(201).json({ message: "Product added successfully" });

    } catch (error) {
        console.error("❌ Database Error:", error);
        res.status(500).json({ error: error.sqlMessage || "Internal server error" });
    }
};

// 📌 Get All Products
const getAllProducts = async (req, res) => {
    try {
        const [products] = await db.query("SELECT * FROM products");
        res.json(products);
    } catch (error) {
        console.error("❌ Database Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// 📌 Get Product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const [product] = await db.query("SELECT * FROM products WHERE id = ?", [id]);

        if (product.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(product[0]);

    } catch (error) {
        console.error("❌ Database Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// 📌 Update Product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, image, stock } = req.body;

        // Check if the product exists
        const [existingProduct] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
        if (existingProduct.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        const sql = "UPDATE products SET name=?, description=?, price=?, image=?, stock=? WHERE id=?";
        await db.query(sql, [name, description || "", price, image || "", stock, id]);

        res.json({ message: "Product updated successfully" });

    } catch (error) {
        console.error("❌ Database Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// 📌 Delete Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the product exists
        const [existingProduct] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
        if (existingProduct.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        const sql = "DELETE FROM products WHERE id=?";
        await db.query(sql, [id]);

        res.json({ message: "Product deleted successfully" });

    } catch (error) {
        console.error("❌ Database Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
