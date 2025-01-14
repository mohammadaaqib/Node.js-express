const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

authenticationmiddleware = (req, res, next) => {
  const authheader = req.headers.authorization;
  if (!authheader || !authheader.startsWith("Bearer")) {
    throw new CustomAPIError("Please provide a valid token", 401);
  }

  const token = authheader.split(" ")[1];

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const { id, username } = decoded;
    //send some data
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomAPIError("Not authorized, token failed", 401);
  }
};

module.exports = authenticationmiddleware;
