const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Product } = require("./models/productModel");
const { Auth } = require("./models/authModel");
const { sendForgotPasswordEmail } = require("./helpers/sendMail");
const { validateEmail } = require("./validators/email");

const app = express();
dotenv.config();
app.use(express.json());
const port = process.env.PORT;

const url = process.env.MONGODB_URL;
mongoose
  .connect(url)
  .then(() => {
    console.log("Mongoose connected...");
    app.listen(port, (e) => {
      if (e) {
        console.log("Error occurred: ", e);
      } else {
        console.log(`Server is running at port ${port}`);
      }
    });
  })
  .catch(() => {
    console.log("Failed to connect to mongoose");
  });

//APIs
//Home
app.get("/", (request, response) => {
  response.send("You are connected");
});

//CRUD: Products
//CREATE: A product
app.post("/create-product", async (request, response) => {
  if (!request.body) {
    return response.status(400).json({
      success: false,
      message: "missing request body",
    });
  }
  const { name, price, quantity } = request.body;
  if (!name || !price) {
    return response.status(400).json({
      success: false,
      message: "missing required fields - name or price",
    });
  }

  // const createdProduct = Product.create({name, price, quantity})
  const newProduct = new Product({ name, price, quantity });
  await newProduct.save();
  return response.status(201).json({
    success: true,
    // createdProduct
    newProduct,
  });
});

//READ: All products
app.get("/all-products", async (request, response) => {
  const allProducts = await Product.find();
  response.status(200).json({
    success: true,
    allProducts,
  });
});
//READ: A single product
app.get("/one-product/:id", async (request, response) => {
  // if(!request.params || !request.params.id){
  //   return response.status(400).json({
  //     success: false,
  //     message: "Missing request params or parameters"
  //   })
  // }
  const { id } = request.params;
  const filteredProduct = await Product.findById(id);
  if (!filteredProduct) {
    return response.status(404).json({
      success: false,
      message: `No product with id: ${id} found`,
    });
  }

  return response.status(200).json({
    success: true,
    filteredProduct,
  });
});

//UPDATE: PUT
app.put("/full-edit-product/:id", async (request, response) => {
  const { id } = request.params;
  const { name, price, quantity } = request.body;

  const filteredProduct = await Product.findByIdAndUpdate(
    id,
    { name, price, quantity },
    { new: true }
  );
  response.status(201).json({
    success: true,
    message: "Product fully updated",
    filteredProduct,
  });
});

//UPDATE: PATCH
app.patch("/part-edit-product/:id", async (request, response) => {
  const { id } = request.params;
  //Update only name
  const { name } = request.body;

  const filteredProduct = await Product.findById(id);
  if (filteredProduct) {
    filteredProduct.name = name;
    await filteredProduct.save();
    return response.status(201).json({
      success: true,
      message: "Product partly updated",
      filteredProduct,
    });
  }
  return response.status(404).json({
    success: false,
    message: `product with id: ${id} was not found`,
  });
});

//DELETE
app.delete("/delete-product/:id", async (request, response) => {
  const { id } = request.params;
  const filteredProduct = await Product.findByIdAndDelete(id);
  if (filteredProduct) {
    return response.status(200).json({
      success: true,
      message: "Product deleted",
    });
  }
  return response.status(200).json({
    success: true,
    message: "Product delete failed or product not found",
  });
});

// AUTH
app.post("/auth/signup", async (request, response) => {
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
});

//LOGIN
app.post("/auth/login", async (request, response) => {
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
    { expiresIn: "10m" }
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
});

// forgot password
app.post("/auth/forgot-password", async (request, response) => {
  const { email } = request.body;
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
});

app.patch("/reset-password", async (request, response) => {
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

  response
    .status(200)
    .json({ success: true, message: "Password reset successful." });
});
