const { AppError, catchAsync, sendResponse } = require("../helpers/utils");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const userController = {};

userController.register = catchAsync(async (req, res, next) => {
    let { name, email, phone, password } = req.body;
  
    let user = await User.findOne({ email });
    if (user) throw new AppError(409, "User already exists", "Register Error");
  
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user = await User.create({
      name,
      email,
      phone,
      password,
    });
    const accessToken = await user.generateToken();
  
    return sendResponse(
      res,
      200,
      true,
      { user, accessToken },
      null,
      "Create user successful"
    );
  });

  module.exports = userController