const express = require("express");
const app = express();
const { connection } = require("./db.js"); // Ensure the DB connection works
const cors = require("cors");
const colors = require("colors");

const signupHandler = require("./routes/signup.js");
const loginHandler = require("./routes/login.js");
const addProductHandler = require("./routes/addProduct.js");
const getProductsHandler = require("./routes/getProducts.js");
const deleteHandler = require("./routes/deleteProduct.js");

// app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(cors());

connection(); // Check that the DB connection works

app.use("/api/signup", signupHandler);
app.use("/api/login", loginHandler);
app.use("/api/addProducts", addProductHandler);
app.use("/api/getProducts", getProductsHandler); // This should be correct
app.use("/api/deleteProduct", deleteHandler);

app.listen(8000, (error) => {
  if (error) {
    console.log(colors.bgRed("Error starting server"));
  } else {
    console.log(colors.bgGreen("Server Started on Port 8000"));
  }
});
