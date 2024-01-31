const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    //if anything is empty
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        error: "Epmty fields",
      });
    }

    //checking if already exist
    const existingEmail = await User.findOne({ email });
    const existingMobile = await User.findOne({ mobile });

    //if user already exist
    if (existingEmail || existingMobile) {
      return res.status(409).json({ mesage: "user already exist" });
    }

    //encrypting the password
    const encryptedPasswd = await bcrypt.hash(password, 10);

    //creating user
    const user = new User({
      name,
      email,
      mobile,
      password: encryptedPasswd,
    });
    await user.save();
    res.json({ message: "User registered successfully", recuirterName: name });
  } catch (error) {
    const err = new Error("Something went wrong! Please try after some time.");
    next(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.json({
        message: "fields can't empty",
      });
    }
    //checking for user exist
    const userExist = await User.findOne({ email });

    //if user found
    if (userExist) {
      const passwdMatched = await bcrypt.compare(password, userExist.password);

      if (!passwdMatched) {
        return res.status(500).json({
          status: "FAILED",
          message: "password wrong",
        });
      }

      const jwtToken = jwt.sign(userExist.toJSON(), process.env.JWT_SECRET, {
        expiresIn: 3600,
      });
      res.json({
        status: "SUCCESS",
        message: `${userExist.name} signed in successfully`,
        recuirterName: userExist.name,
        jwtToken,
      });
    }

    //if user not found
    else {
      res.status(500).json({
        status: "FAILED",
        message: "user not exist,Please Register First",
      });
    }
  } catch (error) {
    const err = new Error("Something went wrong! Please try after some time.");
    next(err);
  }
});

module.exports = router;
