const collectionBlogModel = require('../model/blogModel')
const collectionLoginModel = require('../model/loginModel')

const register = (req, res) => {
    collectionBlogModel.find()
        .then(val => {
            res.render('register', {title: "Register", value: val})
        })
}

const insert = (req, res) => {
    const data = new collectionLoginModel(req.body)
    data.save()
        .then(() => res.redirect('/register/connectionSuccess'))
        .catch(err => console.log(err))
}

const connectionSuccessAnimate = (req, res) => {
    res.render('connectionSuccess',{
        title:'Connection Success...'
    })
}

module.exports = {
    register,
    insert,
    connectionSuccessAnimate
}