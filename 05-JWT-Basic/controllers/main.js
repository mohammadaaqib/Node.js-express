const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  //mongooes validation
  //Joi
  //check error
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError("Please provide userName and password", 400);
  }
  // usually form db

  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  }); //payload
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `${req.user.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
   
};
module.exports = {
  login,
  dashboard,
};
