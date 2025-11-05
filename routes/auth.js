
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.get("/auth/get-token", (req, res) => {
  const token = jwt.sign(
    { user: "prakash-demo", role: "tester" },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ token });
});

module.exports = router;
