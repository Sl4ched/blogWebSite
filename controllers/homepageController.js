const collectionBlogModel = require('../model/blogModel')
const collectionLoginModel = require('../model/loginModel')

let arrOfBlogsName = []
let arrOfBlogsSurname = []
let arrOfBlogsBody = []
let arrOfTime = []
const firstGet = (req, res) => {
    const pages = req.query.p || 0
    let limit = req.query.lim || 15
    let numberOfBlogs

    //this is a good example of handling queue of queries you need to understand flawless promise mechanism to solve that
    //time complexity problem
    //first of inside of then working till end then codes callbacks to promise section

    collectionBlogModel.find()//this counts how many blogs (1)
        .count()
        .then(val => {

            numberOfBlogs = val

            collectionBlogModel.find() //this creates necessary arrays (2)
                .skip(limit * pages)
                .limit(limit)
                .then(val => {

                    arrOfBlogsName = val.map(value => value.name)
                    arrOfBlogsSurname = val.map(value => value.surname)
                    arrOfBlogsBody = val.map(value => value.body)
                    arrOfTime = val.map(value => value.createdAt)

                    collectionLoginModel.find()
                        .then(val => { //this render homepage (3)

                            res.render('homepage',
                                {
                                    title: 'Home Page',
                                    userID: req.params.id,
                                    user: val,
                                    name: arrOfBlogsName,
                                    surname: arrOfBlogsSurname,
                                    body: arrOfBlogsBody,
                                    uploadTime: arrOfTime,
                                    numberOfBlogs: numberOfBlogs,
                                    limit:limit,
                                    currentPage : pages
                                }
                            )
                        })
                        .catch(err => res.json({err: err}))

                })
                .catch(err => console.log(err))
        })



}

const addBlogScreen = (req, res) => {
    collectionLoginModel.find()
        .then((val) => res.render('addBlog', {title: 'Create Blog', userID: req.params.id, user: val}))
        .catch(err => res.json({err: err}))
}

const postBlog = (req, res) => {

    const newData = new collectionBlogModel(req.body)
    newData.save()
        .then(() => res.redirect(`/homepage/${req.params.id}/?p=0&lim=15`))
        .catch(err => console.log(err))

}

module.exports = {
    firstGet,
    addBlogScreen,
    postBlog
}