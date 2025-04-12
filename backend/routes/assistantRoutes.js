const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Make sure this is the promise-based connection

// Helper function to convert query to SQL
const processQuery = (query) => {
  query = query.toLowerCase();
  let sql = "SELECT * FROM products WHERE 1=1";
  let params = [];

  // Keyword-based search
  const keywords = ["shirt", "t-shirt", "jeans", "dress", "jacket"];
  let keywordMatchFound = false;
  keywords.forEach(word => {
    if (query.includes(word)) {
      sql += ` AND name LIKE ?`;
      params.push(`%${word}%`);
      keywordMatchFound = true;
    }
  });

  if (!keywordMatchFound) {
    sql += ` AND name LIKE ?`; // Default fallback if no match
    params.push(`%${query}%`);
  }

  // Price filter (e.g., "under 1000" or "below 1000")
  const priceMatch = query.match(/(under|below) (\d+)/);
  if (priceMatch) {
    const price = parseInt(priceMatch[2]);
    sql += ` AND price <= ?`;
    params.push(price);
  }

  // Optionally filter by stock if you want to exclude out-of-stock items
  if (query.includes("in stock")) {
    sql += " AND stock > 0";
  }

  return { sql, params };
};

// POST /api/assistant/query
router.post('/query', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  console.log("Received message:", message); // Log the received message

  try {
    const { sql, params } = processQuery(message);
    console.log("SQL Query:", sql); // Log the SQL query

    const [results] = await db.query(sql, params);

    // Log the results to see what the backend returns
    console.log("Query results:", results);

    const botReply = results.length > 0 ? "Here are some products based on your query:" : "🤖 Sorry, I didn't understand that.";
    const products = results.length > 0 ? results : null; // Return all matching products

    res.json({ reply: botReply, products: products });
  } catch (err) {
    console.error('🛑 AI Query Error:', err);
    res.status(500).json({
      error: 'Internal server error',
      message: err.message || 'Something went wrong',
    });
  }
});

module.exports = router;
