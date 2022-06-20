//REQUIRE DEPNEDENCIES
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const starTrekRoutes = require('./routes/startrek')


//SET Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.use(express.json())

//CRUD METHODS
app.use(starTrekRoutes)

//connect to DB
mongoose.connect(process.env.DB_STRING)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to DB and Server is running on port ${process.env.PORT}`)
        })
    })
    .catch(error => console.log(error))
