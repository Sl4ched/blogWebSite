const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({

    name: {require: true, type: String},
    surname: {require: true, type: String},
    body: {require: true, type: String}

}, {timestamps: true})

module.exports = mongoose.model('blog',mySchema)