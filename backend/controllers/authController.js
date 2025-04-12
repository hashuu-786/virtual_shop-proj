const db = require("../config/db");
const bcrypt = require("bcryptjs");

// 🚀 Register User
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, password, confirmPassword } = req.body;

        console.log("📥 Register Request:", req.body);

        if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
            console.log("❌ Missing fields");
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password !== confirmPassword) {
            console.log("❌ Passwords do not match");
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const connection = await db.getConnection();
        try {
            console.log("🔍 Checking if email already exists...");
            const [existingUser] = await connection.execute("SELECT id FROM users WHERE email = ?", [email]);

            if (existingUser.length > 0) {
                console.log("❌ Email already exists");
                return res.status(400).json({ error: "Email already exists" });
            }

            console.log("🔒 Hashing password...");
            const hashedPassword = await bcrypt.hash(password, 10);

            console.log("📝 Inserting new user into database...");
            const sql = "INSERT INTO users (first_name, last_name, email, phone_number, password) VALUES (?, ?, ?, ?, ?)";
            const [result] = await connection.execute(sql, [firstName, lastName, email, phoneNumber, hashedPassword]);

            console.log("✅ New User Inserted:", result);
            res.status(201).json({ message: "User registered successfully", userId: result.insertId });

        } finally {
            connection.release();
        }
    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// 🚀 Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("📥 Login Request:", req.body);

        if (!email || !password) {
            console.log("❌ Missing email or password");
            return res.status(400).json({ error: "Email and password are required" });
        }

        const connection = await db.getConnection();
        try {
            console.log("🔍 Checking user credentials...");
            const [users] = await connection.execute("SELECT id, first_name, password FROM users WHERE email = ?", [email]);

            if (users.length === 0) {
                console.log("❌ User not found");
                return res.status(401).json({ error: "Invalid email or password" });
            }

            const user = users[0];
            console.log("🔒 Stored Hashed Password:", user.password);

            console.log("🔄 Comparing passwords...");
            const isMatch = await bcrypt.compare(password, user.password);
            console.log("🔑 Password Match:", isMatch);

            if (!isMatch) {
                console.log("❌ Incorrect password");
                return res.status(401).json({ error: "Invalid email or password" });
            }

            console.log("✅ Login successful");
            res.json({
                message: "Login successful",
                user: {
                    id: user.id,
                    firstName: user.first_name,
                    email: email
                }
            });

        } finally {
            connection.release();
        }
    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { registerUser, loginUser };
