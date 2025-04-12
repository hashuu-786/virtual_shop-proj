const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db"); // Import database pool

// ✅ Import route files
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes"); // ✅ Add this line
const assistantRoutes = require("./routes/assistantRoutes");

dotenv.config(); // Load environment variables

// ✅ Check if .env is loaded and critical environment variables
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    console.error("❌ Missing critical environment variables!");
    process.exit(1);
}

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Log incoming requests for debugging
app.use((req, res, next) => {
    console.log(`📥 Incoming request: ${req.method} ${req.url}`);
    next();
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes); // ✅ Register order routes
app.use("/api/assistant", assistantRoutes);

// ✅ Database Connection Check & Server Start
const PORT = process.env.PORT || 3030;

const startServer = async () => {
    try {
        await db.query("SELECT 1");
        console.log("✅ Database connected successfully!");

        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

        process.on("SIGINT", async () => {
            console.log("\n🛑 Shutting down server...");
            await db.end();
            console.log("✅ Database connection closed.");
            server.close(() => {
                console.log("🔴 Server stopped.");
                process.exit(0);
            });
        });

    } catch (err) {
        console.error("❌ Database connection failed:", err.message || err);
        process.exit(1);
    }
};

// ✅ Start the server
startServer();

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err.stack);
    res.status(500).json({
        error: "Internal server error",
        message: err.message || "Something went wrong",
    });
});
