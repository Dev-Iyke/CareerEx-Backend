// const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Auth } = require("../models/authModel");
const { validateEmail } = require("../validators/email");
const { sendForgotPasswordEmail } = require("../helpers/sendMail");

const handleGetAllUsers = async (request, response) => {
  const users = await Auth.find()

  return response.status(200).json({
    success: true,
    message: 'success',
    users
  })
}

const handleUserSignup = async (request, response) => {
  try {
    const { email, password, firstName, lastName, role } = request.body;
    if (!email) {
      return response.status(409).json({
        success: false,
        message: `missing required field: email`,
      });
    }

    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email format" });
    }

    if (!password || password.length < 6) {
      return response.status(409).json({
        success: false,
        message: `missing required field or invalid format: password`,
      });
    }

    const user = await Auth.findOne({ email });
    if (user) {
      return response.status(400).json({
        success: false,
        message: `User with email: ${email} already exists. Sign in`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const data = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
    };
    const newUser = new Auth(data);
    await newUser.save();
    return response.status(201).json({
      success: true,
      message: `User registered successfully`,
      newUser,
    });
  } catch (e) {
    return response.status(500).json({
      success: false,
      message: `Error: ${e.message}`,
    });
  }
}

const handleLogin = async (request, response) => {
  const { email, password } = request.body;
  const existingUser = await Auth.findOne({ email });
  if (!existingUser) {
    return response.status(404).json({
      success: false,
      message: `User with this email address does not exist`,
    });
  }

  const isMatch = await bcrypt.compare(password, existingUser?.password);
  if (!isMatch) {
    return response.status(400).json({
      success: false,
      message: `Invalid email or password`,
    });
  }

  //You can check if user is verified

  // generate token

  const accessToken = jwt.sign(
    { id: existingUser?._id },
    process.env.ACCESS_TOKEN,
    { expiresIn: "3h" }
  );

  const refreshToken = jwt.sign(
    { id: existingUser?._id },
    process.env.REFRESH_TOKEN,
    { expiresIn: "10d" }
  );

  response.status(200).json({
    success: true,
    message: "Login successful",
    accessToken,
    refreshToken,
    existingUser,
  });
}

const handleForgotPassword = async (request, response) => {
  // const { email } = request.body;
  const email = request.user.email
  const existingUser = await Auth.findOne({ email });
  if (!existingUser) {
    return response.status(404).json({
      success: false,
      message: `User with this email address does not exist`,
    });
  }

  const user = await Auth.findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }

  //Reset token
  const accessToken = jwt.sign(
    { id: existingUser?._id },
    process.env.ACCESS_TOKEN,
    { expiresIn: "10m" }
  );

  //SEND MAIL TO RESET PASSWORD
  await sendForgotPasswordEmail(email, accessToken);

  response.status(200).json({
    success: true,
    message: "email sent successfully",
  });
}

const handleResetPassword =  async (request, response) => {
  const { email, password } = request.body;

  const user = await Auth.findOne({ email });

  if (!user) {
    return response
      .status(404)
      .json({ success: false, message: "User account not found!" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  user.password = hashedPassword;

  await user.save();

  return response
    .status(200)
    .json({ success: true, message: "Password reset successful." });
}

module.exports = {
  handleGetAllUsers,
  handleUserSignup,
  handleLogin,
  handleForgotPassword,
  handleResetPassword,
}