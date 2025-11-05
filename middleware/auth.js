
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const publicRoutes = [
      "/",                
      "/auth/login",      
      "/auth/register",  
      "/cron/trigger",   
    ];

    if (publicRoutes.includes(req.path)) {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Missing Authorization header" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ error: "Malformed Authorization header" });
    }

    const token = parts[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

  } catch (err) {
    console.error("JWT Auth Error:", err);
    return res.status(500).json({ error: "Server auth error" });
  }
};
