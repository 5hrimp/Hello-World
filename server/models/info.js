const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: Number, required: true},
    password: {type: String, required: true},
    role: { type: String, default: "user" }
})
    
const User = mongoose.model("User Info",userSchema);

module.exports = {User};