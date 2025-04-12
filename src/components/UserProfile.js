import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  const userId = localStorage.getItem("userId");

  // ✅ Fetch user from backend on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3030/api/users/${userId}`);
        setUser(res.data);
        setUpdatedUser(res.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  // ✅ Handle form input change
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // ✅ Save updated data to backend
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3030/api/users/${userId}`, updatedUser);
      setUser(updatedUser);
      setIsEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("❌ Failed to update profile.");
    }
  };

  const handleEdit = () => setIsEditing(true);

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, px: 2 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          User Profile
        </Typography>

        {isEditing ? (
          <>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={updatedUser.firstName || ""}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={updatedUser.lastName || ""}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={updatedUser.email || ""}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={updatedUser.phone || ""}
              onChange={handleChange}
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6">
              Name: {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">Phone: {user.phone}</Typography>
            <Button variant="contained" color="primary" onClick={handleEdit} sx={{ mt: 2 }}>
              Edit Profile
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default UserProfile;
