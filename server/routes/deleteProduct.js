
const { Product } = require('../models/product');
const router = require('express').Router();

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    console.log(id)
    await Product.findOneAndDelete({_id: id}).then(
        res=> console.log("deleted")
    ).catch(err=>
        console.log(err)
    )
});

module.exports = router;

