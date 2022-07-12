const { verifyHash, createHash } = require("../../lib/utils/hash");
const { createAndSignToken } = require("../../lib/utils/jwt");
const { User } = require("../models/User");

const login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log("user");
  const user = await User.findOne({
    username
  });
  
  if (!user) throw new Error("No such user");
  if (!(await verifyHash(password, user.password))) throw new Error("Wrong password");

  console.log(user);

  // Create and sign jwt token and send it    
  const token = await createAndSignToken({
    _id: user._id.toString(),
    username: user.username,
    isAdmin: user.isAdmin
  });
  res.status(200).json({
    token
  });
}

const register = async (req, res, next) => {
  // Body will already be validated
  const { username, password } = req.body;
  const hashPassword = await createHash(password);
  await User.create({
    username,
    password: hashPassword
  });
  res.status(201).json({
    message: "Registration successful"
  });
}

const getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(users);
}

module.exports = {
  login,
  register,
  getAllUsers
};