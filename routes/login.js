const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await User.findOne({ email })

        if (userExist) {
            const passwdMatched = await bcrypt.compare(password, userExist.password);

            if (!passwdMatched) {
                res.status(500).json({
                    status: "FAILED",
                    message: "password wrong"
                })
            }


            const jwtToken = jwt.sign(userExist.toJSON(), process.env.JWT_SECRET, { expiresIn: 60 })
            res.json({
                status: "SUCCESS",
                message: `${userExist.name} signed in successfully`,
                jwtToken
            })
        }

        else {
            res.status(500).json({
                status: "FAILED",
                message: "user not exist,Please Register First",
            });
        }
    }
    catch (error) {
        const err = new Error("Something went wrong! Please try after some time.")
        next(err)
    }
})

module.exports = router