const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const register = require("./routes/register")
const login = require("./routes/login")
dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send("Welcome to the portal")
})

app.get('/health', (req, res) => {
    res.status(200).json({
        service: "job-listing-server",
        status: "Active",
        time: new Date(),
    })
})

app.use('/register', register)
app.use('/login', login)





//server listening
app.listen(process.env.PORT, (error) => {
    mongoose
        .connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(
            console.log(`server is running on http://localhost:${process.env.PORT}`)
        )
        .catch((err) => console.log(err))
})