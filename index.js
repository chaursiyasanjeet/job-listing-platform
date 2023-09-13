const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require("mongoose")
dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send("Welcome to the portal")
})

app.get('/health', (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "All Good!! Server is running"
    })
})

app.listen(process.env.PORT, (error) => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(
            console.log(`server is running on http://localhost:${process.env.PORT}`)
        )
        .catch((err) => console.log(err))
})