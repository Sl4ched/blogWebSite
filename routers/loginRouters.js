const express = require('express')
const router = express.Router()
const controllers = require('../controllers/loginController')

router.get('/',controllers.login)

module.exports = router