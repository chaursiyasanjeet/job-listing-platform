const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")


router.post('/', async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body
        if (!name || !email || !mobile || !password) {
            return res.status(400).json({
                error: "Invalid Input fields"
            })
        }

        const existingName = await User.findOne({ name })
        const existingEmail = await User.findOne({ email })
        const existingMobile = await User.findOne({ mobile })

        if (existingName || existingEmail || existingMobile) {
            return res.status(409).json({ mesage: "user already exist" })
        }

        const encryptedPasswd = await bcrypt.hash(password, 10)
        const user = new User({
            name, email, mobile, password: encryptedPasswd
        })

        await user.save()
        res.json({ message: "User registered successfully" })

    }
    catch (error) {
        const err = new Error("Something went wrong! Please try after some time.")
        next(err)
    }
})


module.exports = router;