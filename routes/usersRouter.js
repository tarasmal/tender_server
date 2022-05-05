const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const checkJWT = require('../middlewares/checkJWT')
router.get('/', userController.getUsers)
router.get('/:id',checkJWT, userController.getUser)
router.post('/', userController.login)
router.put('/', userController.registration)

module.exports = router