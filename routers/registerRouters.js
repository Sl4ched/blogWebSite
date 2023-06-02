const express = require('express')
const router = express.Router()
const controllers = require('../controllers/registerController')

router.get('/',controllers.register)
router.get('/connectionSuccess',controllers.connectionSuccessAnimate)

router.post('/insert',controllers.insert)

module.exports = router