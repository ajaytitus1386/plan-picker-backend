import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = function (req, res, next) {
  const token = req.header("token");

  if (!token) return res.status(401).json({ message: "No Token Recieved" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(500).send({ message: `Invalid Token: ${error.message}` });
  }
};

export default auth;
