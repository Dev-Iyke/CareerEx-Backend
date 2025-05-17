const express = require("express")

//Initialize an express app
const app = express()

//Beating the middleware - making request body accessible
app.use(express.json())

// Dynamically creating a port
const port = process.env.PORT || 5000
const MONGODB_URL = "mongodb+srv://dev-iyke:dev-iyke@cluster0.kstejkd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// Running the server, listening on specified port
app.listen(port, (e) => {
  if(e){
    console.log('Error message: ', e)
  } else {
    console.log(`Server running on port ${port}`)
  }
})

// APIs
//HOMEPAGE
app.get("/", (request, response) => {
  response.send("Welcome to my first server with CareerEx!")
})

//GET USERS
app.get("/users", (request, response) => {
  const users = [
    {
      firstName: "James",
      role: 'Admin'
    },
    {
      firstName: "Thompson",
      role: "learner"
    }
  ]
  response.json(users)
})

//CREATE A USER
app.post("/create-user", (request, response) => {
  const newUser = request.body
  console.log(newUser)
    
  response.json({
    success: true,
    message: "User received successfully!",
    newUser
  })
})