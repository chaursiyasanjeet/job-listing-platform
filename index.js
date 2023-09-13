const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send("Welcome to the portal")
})

app.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log(`server is running on the http://localhost:${process.env.PORT}/`)
    }
    else {
        console.log(error)
    }
})