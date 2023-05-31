const collectionBlogModel = require('../model/blogModel')
const collectionLoginModel = require('../model/loginModel')

let arrOfBlogsName = []
let arrOfBlogsSurname = []
let arrOfBlogsBody = []
let arrOfTime = []
const firstGet = (req, res) => {
    const pages = req.query.p || 0
    let limit = 15

    collectionBlogModel.find()
        .skip(limit * pages)
        .limit(limit)
        .then(val => {

            arrOfBlogsName = val.map(value => value.name)
            arrOfBlogsSurname = val.map(value => value.surname)
            arrOfBlogsBody = val.map(value => value.body)
            arrOfTime = val.map(value => value.createdAt)

        })
        .catch(err => console.log(err))

    collectionLoginModel.find()
        .then((val) => res.render('homepage',
            {
                title: 'Home Page',
                userID: req.params.id,
                user: val,
                name: arrOfBlogsName,
                surname: arrOfBlogsSurname,
                body: arrOfBlogsBody,
                uploadTime: arrOfTime
            }
        ))
        .catch(err => res.json({err: err}))
}

const addBlogScreen = (req, res) => {
    collectionLoginModel.find()
        .then((val) => res.render('addBlog', {title: 'Create Blog', userID: req.params.id, user: val}))
        .catch(err => res.json({err: err}))
}

const postBlog = (req, res) => {

    const newData = new collectionBlogModel(req.body)
    newData.save()
        .then(() => res.redirect(`/homepage/${req.params.id}`))
        .catch(err => console.log(err))

}

module.exports = {
    firstGet,
    addBlogScreen,
    postBlog
}