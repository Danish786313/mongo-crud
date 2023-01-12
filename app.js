const mongoose = require('mongoose')
const bodyparser = require("body-parser")
require('dotenv').config()
const express = require("express")
const app = express()

// defines
app.use(bodyparser.urlencoded({ extended : true }))
app.use(bodyparser.json())
app.set('view engine', 'ejs')

// routes
const userroute = require("./routes/userroute")
const viewsroute = require("./routes/views")
const postroute = require("./routes/postroute")

// APIs routes
app.use("/api", userroute)
app.use("/api", postroute)

// views routes
app.use("/views", viewsroute)

// default route
app.use((req, res, next) => {
    res.render('Notfoundpage.ejs')
})

// Databse connection
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://0.0.0.0:27017/Social_media').then(result => {
    console.log("Databse connected")
}).catch(err => {
    console.log("Database not connected")
})

// connecting to server
port = process.env.port || 2000
app.listen(port, async () => {
    console.log(`server is running on : http://localhost:${port}`)
})