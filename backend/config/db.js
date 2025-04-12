const mysql = require("mysql2/promise"); // Import mysql2 with promise support
const dotenv = require("dotenv");

dotenv.config();

// ✅ Create a MySQL connection pool with Promises
const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "shopping_db",
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// ✅ Test database connection with retry mechanism
const connectDB = async (retries = 5, delay = 3000) => {
    for (let i = 0; i < retries; i++) {
        try {
            const connection = await pool.getConnection();
            console.log("✅ Connected to MySQL Database");
            connection.release(); // Ensure we release the connection back to the pool
            return;
        } catch (err) {
            console.error(`❌ Database connection failed (Attempt ${i + 1}/${retries}):`, err.message);
            if (i < retries - 1) {
                console.log(`🔄 Retrying in ${delay / 1000} seconds...`);
                await new Promise(res => setTimeout(res, delay));
            } else {
                console.error("🚨 Max retries reached. Exiting...");
                process.exit(1);
            }
        }
    }
};

// 🔄 Start DB connection check
connectDB();

// Export the pool for use in the application
module.exports = pool;
