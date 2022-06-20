const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Alien = require('../models/alien')

//CRUD routes

router.get('/', (req, res) => {
    Alien.find().sort({createdAt: -1})
        .then(data => {
            let listAliens = data.map(alien => alien)
            
            console.log(listAliens)
            res.render('index.ejs', {info : listAliens})
        })
        .catch(error => console.log(error))
    
    })

router.get('/aliens/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    Alien.findById(id)
        .then(result => {
            res.render('details', {alien : result, title: "Alien details"})
        })
        .catch(error => console.log(error))

})

router.post('/api', (req, res) => {
        const alien = new Alien(req.body)   
        alien.save()
        .then(result => {
            console.log(result)
            res.redirect('/')
        })
        .catch(error => console.log(error))
    })

router.put('/updateEntry', (req, res) => {
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
    
router.delete('/deleteEntry', (req, res) => {
        db.collection('aliens').findOneAndDelete(
            {name: req.body.name}
            )
        .then(result => {
            console.log("Entry deleted!")
            res.json("Entry deleted")
        })
        .catch(error => console.log(error))
    })

module.exports = router
    