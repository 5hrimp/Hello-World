const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/info");
const colors = require("colors");

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const userExists = await User.findOne({ username: req.body.username });

    if (!userExists) {
      console.log("invalid username or password");
      return res.status(500).send({ message: "Invalid email or password" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      userExists.password
    );

    if (!validPassword) {
      console.log("invalid username or password");
      return res.status(500).send({ message: "Invalid email or password" });
    }

    
    console.log(
      colors.bgWhite(`${userExists.username} logged in as ${userExists.role}`)
    );
    

    console.log(userExists.role)
    res.status(200).send({userinfo: userExists, username:userExists.username, userRole: userExists.role, message: "User logged in" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
