const bcrypt = require("bcrypt");
const colors = require("colors");

const router = require("express").Router();

const { User } = require("../models/info");

router.post("/", async (req, res) => {
  console.log(colors.bgMagenta(req.body));
  const { username, name, age, address, phone, email, password } = req.body;

    if (!username || !name || !age || !address || !phone || !email || !password) {
        console.log("All fields are required")
        return res.status(400).send({ message: 'All fields are required.' });
        
    }
  try {
    
    const emailExists = await User.findOne({ email: req.body.email });
    const usernameExists = await User.findOne({ username: req.body.username });

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    if (emailExists || usernameExists) {
      console.log("User already exists");
      res.status(409).send({ message: "User already exists" });
    } else {
      await new User({ ...req.body, password: hashPassword }).save();
      console.log(colors.bgGreen(`User: ${req.body.username} registered`));
      res.status(200).send({ message: "User created" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error!" });
  }
});

module.exports = router;
