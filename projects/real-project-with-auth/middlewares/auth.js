const jwt = require("jsonwebtoken");
const { Auth } = require("../models/authModel");

const validateSignup = (request, response, next) => {
  const { email, password, firstName, lastName, role } = request.body

  const errors = []

  if(!email) {
    errors.push('Please enter your email')
  }

  if(!password) {
    errors.push('Please enter your password')
  }

  if(errors.length > 0) {
    return response.status(409).json({message: errors})
  }

  next()
}

const authorization = async (request, response, next) => {
  //Get token passes in header
  const token = request.header('authorization')

  //Check if token is available
  if(!token){
    return response.status(401).json({
      success: false,
      message: 'Please Login'
    })
  }

  //token comes with 'Bearer', so we split
  const splitToken = token.split(" ")
  //select the actual token
  const actualToken = splitToken[1]

  //Verify that the token is mine
  const decoded = jwt.verify(actualToken, `${process.env.ACCESS_TOKEN}`)

  // Check if token has my signature
  if(!decoded) {
    return response.status(401).json({
      success: false,
      message: 'Invalid token. please login'
    })
  }

  // Use the id in the token to fetch the user
  const user = await Auth.findById(decoded.id)

  //Check if user exists
  if(!user) {
    return response.status(404).json({
      success: false,
      message: 'User not found'
    })
  }

//for admin role checks or we export the above logic in a function and import it a separate middleware function that works for admin
  // if(user?.role !== 'Admin') {
  //   return response.status(404).json({
  //     success: false,
  //     message: 'Unauthorized user. please signin as an admin'
  //   })
  // }

  
  // Now we can use this user value in our controller as request.user
  request.user = user

  //Proceed to next function
  next()
}

module.exports = {
  validateSignup,
  authorization
}