const bcrypt = require("bcryptjs");

const enteredPassword = "hashu";  // Replace with the password you're testing
const storedHash = "$2b$10$w/aDyhqjZTZ/J6MZl3Vvf.MBCxsfY919ssuHIHRBpgQGsDxjEwIRq"; // Replace with actual DB hash

bcrypt.compare(enteredPassword, storedHash)
    .then(match => console.log("✅ Password Match:", match))
    .catch(err => console.error("❌ Error:", err));
