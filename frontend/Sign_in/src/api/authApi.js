const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = "your_jwt_secret_key_here"; 
app.use(cors());
app.use(express.json());
const mockUsers = [
  {
    id: 12,
    user_type: "student",
    username: "john123",
    password: "MyPassword123",
  },
  {
    id: 101,
    user_type: "mentor",
    username: "mentor001",
    password: "SecretPass456",
  },
];
app.post("/api/login", (req, res) => {
  const { user_type, username, password } = req.body;
  if (!user_type || !username || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide user_type, username, and password",
    });
  }
  const user = mockUsers.find(
    (u) =>
      u.user_type === user_type &&
      u.username === username &&
      u.password === password
  );
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }
  const token = jwt.sign(
    { id: user.id, username: user.username, user_type: user.user_type },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
  return res.status(200).json({
    success: true,
    message: "Login successful",
    token: token,
    user: {
      id: user.id,
      username: user.username,
      user_type: user.user_type,
    },
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});