const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const { Product } = require("./models/productModel")

const app = express()
dotenv.config()
app.use(express.json())
const port = process.env.PORT

const url = process.env.MONGODB_URL
mongoose.connect(url)
.then(() => {
  console.log("Mongoose connected...")
  app.listen(port, (e) => {
    if(e){
      console.log('Error occurred: ', e)
    } else {
      console.log(`Server is running at port ${port}`)
    }
  }) 
})
.catch(() => {
  console.log('Failed to connect to mongoose')
})


//APIs
//Home
app.get("/", (request, response) => {
  response.send("You are connected")
})

//CRUD
//CREATE: A product
app.post("/create-product", async(request, response) => {
  if (!request.body){
    return response.status(400).json({
      success: false,
      message: "missing request body"
    })
  }
  const {name, price, quantity} = request.body
  if (!name || !price){
    return response.status(400).json({
      success: false,
      message: "missing required fields - name or price"
    })
  }

  // const createdProduct = Product.create({name, price, quantity})
  const newProduct = new Product({name, price, quantity})
  await newProduct.save()
  return response.status(201).json({
    success: true,
    // createdProduct
    newProduct
  })
})

//READ: All products
app.get("/all-products", async (request, response) => {
  const allProducts = await Product.find()
  response.status(200).json({
    success: true,
    allProducts
  })
})
//READ: A single product
app.get("/one-product/:id", async (request, response) => {
  // if(!request.params || !request.params.id){
  //   return response.status(400).json({
  //     success: false,
  //     message: "Missing request params or parameters"
  //   })
  // }
  const {id} = request.params
  const filteredProduct = await Product.findById(id)
  if (!filteredProduct){
    return response.status(404).json({
      success: false,
      message: `No product with id: ${id} found`
    })
  }

  return response.status(200).json({
    success: true,
    filteredProduct
  })
})

//UPDATE: PUT
app.put("/full-edit-product/:id", async (request, response) => {
  const {id} = request.params
  const {name, price, quantity} = request.body

  const filteredProduct = await Product.findByIdAndUpdate(
    id,
    {name, price, quantity},
    {new: true}
  )
  response.status(201).json({
    success: true,
    message: 'Product fully updated',
    filteredProduct
  })

})

//UPDATE: PATCH
app.patch("/part-edit-product/:id", async (request, response) => {
  const {id} = request.params
  //Update only name
  const {name} = request.body

  const filteredProduct = await Product.findById(id)
  if(filteredProduct){
    filteredProduct.name = name
    await filteredProduct.save()
    return response.status(201).json({
      success: true,
      message: 'Product partly updated',
      filteredProduct
    })
  }
  return response.status(404).json({
    success: false,
    message: `product with id: ${id} was not found`
  })

})


//DELETE
app.delete("/delete-product/:id", async (request, response) => {
  const {id} = request.params
  const filteredProduct = await Product.findByIdAndDelete(id)
  if(filteredProduct){
    return response.status(200).json({
      success: true,
      message: 'Product deleted',
    })
  }
  return response.status(200).json({
    success: true,
    message: 'Product delete failed or product not found',
  })
})