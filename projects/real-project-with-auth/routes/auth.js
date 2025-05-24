const express = require("express");
const { validateSignup, authorization } = require("../middlewares/auth");
const { handleGetAllUsers, handleUserSignup, handleLogin, handleForgotPassword, handleResetPassword } = require("../controllers/auth");

const authRouter = express.Router()

// AUTH
//Signup
authRouter.post("/auth/signup", validateSignup, handleUserSignup);

//Login
authRouter.post("/auth/login", handleLogin);

// forgot password
authRouter.post("/auth/forgot-password", authorization, handleForgotPassword);

//reset password
authRouter.patch("/reset-password", handleResetPassword);

//all users
authRouter.get('/all-users', authorization, handleGetAllUsers)



module.exports = authRouter