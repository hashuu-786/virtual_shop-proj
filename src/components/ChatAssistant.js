import React, { useState } from "react";
import { Box, TextField, IconButton, Typography, Paper, CircularProgress, Avatar, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

// Web Speech API for Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Start Speech Recognition
  const startSpeechRecognition = () => {
    recognition.start();
  };

  // Handle speech recognition result
  recognition.onresult = (event) => {
    const userMessage = event.results[0][0].transcript;
    console.log("User said:", userMessage);  // Log the recognized speech
    setInput(userMessage);
    handleSendMessage(); // Automatically send the message once it's recognized
  };

  // Handle sending the user's message
  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = input;
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3030/api/assistant/query", {  // Updated API endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      console.log("Response data:", data);  // Add this line for diagnostics

      const botReply = data.reply || "🤖 Sorry, I didn't understand that.";
      const product = data.products && data.products[0]; // Only handling the first product

      if (product) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            product: {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            },
          },
        ]);
      } else {
        setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
      }
    } catch (error) {
      console.error("Assistant error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "❌ Failed to get response.", sender: "bot" },
      ]);
    }

    setLoading(false);
  };

  // Add product to cart and navigate to the cart page
  const handleAddToCart = (product) => {
    // Retrieve the existing cart from localStorage or initialize an empty array
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add the product to the cart
    cart.push(product);

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Navigate to the cart page
    navigate("/cart");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "500px",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
        overflow: "hidden",
        zIndex: 1000,
      }}
    >
      {/* Header */}
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "#6200ea",
          color: "white",
        }}
      >
        <Typography variant="h6">Virtual Assistant</Typography>
        <IconButton onClick={() => navigate("/home")} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Paper>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          padding: "10px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent:
                msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            {msg.sender === "bot" && (
              <Avatar sx={{ bgcolor: "#6200ea", marginRight: "10px" }}>
                🤖
              </Avatar>
            )}
            {msg.product ? (
              <Paper
                sx={{
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: "#f1f1f1",
                  maxWidth: "75%",
                }}
              >
                <img
                  src={msg.product.image}
                  alt={msg.product.name}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}
                />
                <Typography variant="subtitle1" fontWeight="bold">
                  {msg.product.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  ₹{msg.product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(msg.product)}
                >
                  Add to Cart
                </Button>
              </Paper>
            ) : (
              <Paper
                sx={{
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor:
                    msg.sender === "user" ? "#6200ea" : "#e0e0e0",
                  color: msg.sender === "user" ? "white" : "black",
                  maxWidth: "70%",
                }}
              >
                {msg.text}
              </Paper>
            )}
          </Box>
        ))}

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>

      {/* Input */}
      <Box
        sx={{
          display: "flex",
          padding: "10px",
          borderTop: "1px solid #ddd",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={startSpeechRecognition}
          sx={{ ml: 1 }}
        >
          🎤
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatAssistant;
