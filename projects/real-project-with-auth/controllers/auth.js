// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Auth } = require("../models/authModel");
const { validateEmail } = require("../validators/email");

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

module.exports = {
  handleGetAllUsers,
  handleUserSignup
}