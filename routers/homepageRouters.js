const express = require('express')
const routers = express.Router()
const controllers = require('../controllers/homepageController')

routers.get('/:id',controllers.firstGet)

routers.get('/add_blog/:id',controllers.addBlogScreen)
routers.post('/add_blog/:id',controllers.postBlog)

module.exports = routers