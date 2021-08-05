const express = require("express");
const bcrypt = require("bcrypt");
const { getUserByEmailAsync } = require("../db/repositories/authRepo");
const { generateJwtToken } = require("../helpers/auth-helpers");

const router = express.Router();

// POST /api/auth/login
// Returns JWT on successful login.
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    // Return unauthorized if either email or password are undefined, null, or empty
    return res.status(401).json({ error: "Invalid email or password" });
  }

  try {
    // Retrieve user from database
    const { rows } = await getUserByEmailAsync(email);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // compare passwords
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      //set session
      req.session.userId = user.id;

      // Return token if match is true.
      const token = generateJwtToken(
        user.id,
        user.name,
        user.email,
        user.image,
        user.hosts
      );
      return res.json(token);
    } else {
      // Return unauthorized if match is false
      return res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error on login", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
