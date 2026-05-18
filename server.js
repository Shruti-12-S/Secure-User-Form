const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const xss = require("xss");

dotenv.config();

const db = require("./db");

const app = express();

/* =========================
   SECURITY MIDDLEWARE
========================= */

// Secure HTTP headers
app.use(helmet());

// Prevent abuse/brute force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* =========================
   VALIDATION FUNCTION
========================= */

const validateInput = (username, comment) => {
  if (!username || !comment) {
    return "All fields are required";
  }

  if (username.length > 50) {
    return "Username too long";
  }

  if (comment.length > 500) {
    return "Comment too long";
  }

  return null;
};

/* =========================
   SECURE API
========================= */

app.post("/submit", async (req, res) => {
  try {
    let { username, comment } = req.body;

    // Input Validation
    const error = validateInput(username, comment);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    /* =========================
       XSS PREVENTION
       Sanitizing user input
    ========================= */

    username = xss(username);
    comment = xss(comment);

    /* =========================
       SQL INJECTION PREVENTION
       Using Parameterized Queries
    ========================= */

    const query =
      "INSERT INTO users (username, comment) VALUES (?, ?)";

    await db.execute(query, [username, comment]);

    res.status(201).json({
      success: true,
      message: "Data submitted securely",
      data: {
        username,
        comment,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* =========================
   FETCH USERS
========================= */

app.get("/users", async (req, res) => {
  try {
    const [users] = await db.execute(
      "SELECT * FROM users ORDER BY id DESC"
    );

    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching users",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Secure Server running on port ${PORT}`);
});