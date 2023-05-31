const collectionBlogModel = require('../model/blogModel')
const collectionLoginModel = require('../model/loginModel')

const login = (req,res) => {
    collectionLoginModel.find()
        .then(data => {res.render('login',{title:'Login',data:data})})
}



module.exports = {
    login,

}