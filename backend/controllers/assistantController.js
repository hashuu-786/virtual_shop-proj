const db = require("../config/db");

// 🧠 Enhanced AI logic for keyword-based product search
const processUserMessage = async (message) => {
    const lower = message.toLowerCase();
    const connection = await db.getConnection();

    // Predefined keywords for product categories
    const productKeywords = {
        shirt: ["t-shirt", "shirt", "tee"],
        jeans: ["jeans", "denim", "pants"],
        jacket: ["jacket", "coat", "hoodie"],
        dress: ["dress", "gown", "frock"],
        kurta: ["kurta", "ethnic"],
        top: ["top", "blouse", "crop"],
        skirt: ["skirt"],
    };

    try {
        let matchedKeyword = null;
        let matchedCategory = null;

        // Detect the keyword in the user message
        for (const [category, keywords] of Object.entries(productKeywords)) {
            for (const keyword of keywords) {
                if (lower.includes(keyword)) {
                    matchedKeyword = keyword;
                    matchedCategory = category;
                    break;
                }
            }
            if (matchedKeyword) break;
        }

        if (matchedKeyword) {
            const [products] = await connection.query(
                "SELECT * FROM products WHERE name LIKE ?",
                [`%${matchedKeyword}%`]
            );

            if (products.length) {
                return products
                    .map(p => `🛍️ ${p.name} - ₹${p.price}`)
                    .join("\n");
            } else {
                return `❌ No ${matchedCategory}s found for your search. Try something else.`;
            }
        }

        // Default fallback response
        return "🤖 I'm not sure what you're looking for. Try asking about shirts, jeans, jackets, or dresses.";
    } catch (error) {
        console.error("❌ Error in AI:", error);
        throw error;
    } finally {
        connection.release();
    }
};

// 🎯 Route handler for chat message
const handleChatQuery = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required." });
    }

    try {
        const reply = await processUserMessage(message);
        res.json({ reply });
    } catch (error) {
        res.status(500).json({ error: "Failed to process the message." });
    }
};

module.exports = { handleChatQuery };
