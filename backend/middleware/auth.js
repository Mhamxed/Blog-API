const jwt = require("jsonwebtoken");
require('dotenv').config({path: '../prisma/.env'})
const SECRET_KEY = process.env.SECRET_KEY

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
  
  if (!token) {
    return res.status(403).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyJWT;
