const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Alien = require('../models/alien')

//CRUD routes

router.get('/', (req, res) => {
    Alien.find().sort({createdAt: -1})
        .then(data => {
            res.render('index.ejs', {info : data})
        })
        .catch(error => console.log(error))
    
    })

router.get('/aliens/:id', (req, res) => {
    const id = req.params.id;
    
    Alien.findById(id)
        .then(result => {
            res.render('details', {alien : result, title: "Alien details"});
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
        
    }) 
    
router.delete('/deleteEntry', (req, res) => {
        
    })

module.exports = router
    