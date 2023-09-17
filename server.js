const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const register = require("./routes/register")
const login = require("./routes/login")
const addjob = require("./routes/addJob")
const jwt = require("jsonwebtoken")
dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/health', (req, res) => {
    res.status(200).json({
        service: "job-listing-server",
        status: "Active",
        time: new Date(),
    })
})

//middleware for user login status
const isLoggedIn = (req, res, next) => {
    try {
        const jwtToken = req.headers.token
        const user = jwt.verify(jwtToken, process.env.JWT_SECRET)
        req.userExist = user
        next()
    }
    catch (error) {
        console.log(error)
        next(new Error("Please login first"))
    }
}

//routes
app.use('/register', register)
app.use('/login', login)
app.use('/addjob', isLoggedIn, addjob)



//error handler middleware
app.use((req, res, next) => {
    const err = new Error('page not found');
    err.status = 404;
    next(err)
})

//error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

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