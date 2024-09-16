const express = require("express");
const router = express.Router();
const {Product} = require("../models/product");
const colors = require("colors")

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
        await new Product(req.body).save();
        console.log(req.body.name=" added");
        return res.status(200).send({message:"Product added!"})
  } catch(error) {
    console.log(colors.bgRed(error))
    return res.status(500).send({message:"Internal Server Error"})
  }
});

module.exports = router;
