const express = require("express");
const router = express.Router();
const {Product} = require('../models/product')


router.get('/',async(req,res)=>{
    try {
        let product = await Product.find();
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Internal Server Error"});
    }
})

module.exports = router;