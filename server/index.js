const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const protectRoute = require("./middleware/protectRoute");
const cookieParser = require("cookie-parser");

const secretKey = "computer12345";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

const users = [];

app.post("/register", (req, res) => {
  try {
    const user = req.body;
    const { username, password } = user;

    if (!username || !password) {
      throw new Error("Please enter username and password");
    }

    const alreadyFind = users.find((value) => value.username === user.username);
    if (alreadyFind) {
      throw new Error("This user already exists");
    }

    users.push(user);

    res.status(201).json({
      message: "User created successfully",
      success: true,
      error: false,
      User: user,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
});

app.post("/login", (req, res) => {
  try {
    const user = req.body;
    const alreadyFind = users.find(
      (value) =>
        value.username === user.username && value.password === user.password
    );
    if (!alreadyFind) {
      throw new Error("Please register first");
    }

    const token = jwt.sign({ user }, secretKey, { expiresIn: "1h" });
    res.cookie("token", token,
       {
      httpOnly: false, 
      secure: true,
      sameSite: "none",
    }
  );

    res.status(200).json({
      success: true,
      error: false,
      message: "User logged in successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
});

app.get("/", protectRoute, (req, res) => {
  res.send(users);
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
