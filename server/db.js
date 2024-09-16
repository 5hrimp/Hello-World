const mongoose = require("mongoose");
const colors = require("colors");

const connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://thakurakhilesh959:qAs82SkeAOJ4zNWB@cluster0.jbzhwop.mongodb.net/"
    );
    console.log(colors.bgGreen("connected to db"));
  } catch (error) {
    console.log(colors.bgRed(error));
  }
};

module.exports = { connection };
