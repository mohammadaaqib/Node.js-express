const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const regester = async (req, res) => {
    try {
        const user = await User.create({ ...req.body });
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({ user:user.name, token});
    } catch (error) {
        console.log(error);
    }

};
const login = async (req, res) => {
  res.send("login route");
};

module.exports = { login, regester };
