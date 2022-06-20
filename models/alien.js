const mongoose = require('mongoose')
const Schema = mongoose.Schema

const alienSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    features: {
        type: Array,
        
    },
    homeWorld:{
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    interestingFact:{
        type: String,
        required: true
    },
    notableExamples:{
        type: String,
        required: false
    }

}, {timestamps : true})

const Alien = mongoose.model('Alien', alienSchema);

module.exports = Alien;