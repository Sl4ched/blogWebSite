const express = require('express')
const app = express()
const mongoose = require('mongoose')

const Data = require('./model/blogModel')

app.set('view engine', 'ejs')

//static and urlencoded
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

//routers
const routerMain = require('./routers/loginRouters')
const routerRegister = require('./routers/registerRouters')
const routerHomePage = require('./routers/homepageRouters')

//url attribute is belong to my own db, so you need to use your own db url

const url = 'mongodb+srv://Slached:254857Os@mysite.n8xf8lg.mongodb.net/myDB'

mongoose.connect(url)
    .then(() => app.listen(3000))
    .catch((err) => console.log(err))

app.use('/login', routerMain)
app.use('/register', routerRegister)
app.use('/homepage', routerHomePage)

//this is for postman to show all data
app.get('/getAll', (req, res) => {
    Data.find()
        .then(val => {
            res.status(200).json(val)
        })
        .catch(err => console.log(err))

})

app.use((req, res, next) => {
    res.redirect('/register')
    next()
})

/*app.use((req, res, next) => { //404 handler
    res.status(404).json({err:'404 not found'})
    next()
})*/

