const express = require('express')
const router = express.Router()
const passwordController = require('../controllers/passwordController')

router.post('/:id', passwordController.changePassword)


module.exports = router