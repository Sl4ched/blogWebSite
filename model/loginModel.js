const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({

    email: {require: true, type: String},
    password: {require: true, type: String},

}, {timestamps: true})

module.exports = mongoose.model('login',mySchema)