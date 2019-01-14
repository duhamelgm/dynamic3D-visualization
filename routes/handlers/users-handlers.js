const User = require("../../models/User");

const isEmpty = require("../../validation/isEmpty");

exports.registerUser = async (req, res) => {
  const errors = {};

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!isEmpty(user)) {
      errors.email = "A user with that email already exists";
      return res.status(400).json(errors);
    }

    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password
    });

    return res.json(newUser);
  } catch (err) {
    console.log(err);
  }
};

exports.loginUser = async (req, res) => {
  const errors = {};
  try {
    const user = await User.findOne({ email: req.body.email });

    if (isEmpty(user)) {
      errors.email = "User not found";
      return res.status(400).json(errors);
    }

    const isMatch = await user.isValidPassword(req.body.password);

    if (!isMatch) {
      errors.password = "Incorrect Password";
      return res.status(400).json(errors);
    }

    const token = await user.signJwtPayload();
    res.json({
      success: true,
      token: "Bearer " + token
    });
  } catch (err) {
    throw err;
  }
};
