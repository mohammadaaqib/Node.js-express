const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { unauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new unauthenticatedError("Authentication invalid");
  }
  try {
    const token = authHeader.split(" ")[1];
console.log("token",token)
    const payLoad = jwt.verify(token, process.env.JWT_SECRET);
    console.log("payLoad",payLoad)
    req.user = { userId: payLoad.id, userName: payLoad.name };
    next();
  } catch (error) {
    throw new unauthenticatedError("Authentication invalid");
  }
};

module.exports = auth
