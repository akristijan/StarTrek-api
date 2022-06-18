//REQUIRE DEPNEDENCIES
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8005
require('dotenv').config()

//DECLARED DB VARIABLES
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName="star-trek-api"

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to the ${dbName} Database`)
        db = client.db(dbName)
    })



//SET Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.use(express.json())

//CRUD METHODS
app.get('/', (req, res) => {
    db.collection('aliens').find().toArray()
        .then(data => {
            let nameList = data.map(item => item.name)
            console.log(nameList)
            res.render('index.ejs', {info : nameList})
        })
        .catch(error => console.log(error))
    
    })

app.post('/api', (req, res) => {
    const body = req.body

    db.collection('aliens').insertOne(
        {
            name : body.name,
            species: body.species,
            features: body.features,
            homeWorld: body.homeWorld,
            img : body.image,
            interestingFact: body.interestingFact,
            notableExamples: body.notableExamples,
        }
    )
    .then(result => {
        console.log(result)
        res.redirect('/')
    })
})

app.put('/updateEntry', (req, res) => {
    console.log(req.body)
    Object.keys(req.body).forEach(key => {
        if(req.body[key] === null || req.body[key] === undefined || req.body[key] === '') {
            delete req.body[key]
        }

    })
    console.log(req.body)
    db.collection('aliens').findOneAndUpdate(
        {name : req.body.name},
        {
            $set: req.body
        }
    )
    .then(result => {
        console.log(result)
        res.json('Success')
    })
    .catch(error => console.log(error))
}) 

app.delete('/deleteEntry', (req, res) => {
    db.collection('aliens').findOneAndDelete(
        {name: req.body.name}
        )
    .then(result => {
        console.log("Entry deleted!")
        res.json("Entry deleted")
    })
    .catch(error => console.log(error))
})

//SET UP LOCALHOST ON PORT
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})