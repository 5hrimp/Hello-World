const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  imageSrc: { type:String, required: true}
});

productSchema.plugin(AutoIncrement, { inc_field: "id" });

const Product = mongoose.model("Product Info", productSchema);

module.exports = { Product };
