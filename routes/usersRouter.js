const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.getUsers)
router.post('/', userController.login)
router.put('/', userController.registration)

module.exports = router