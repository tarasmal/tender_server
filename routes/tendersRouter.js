const express = require('express')
const router = express.Router()
const tenderController = require('../controllers/tenderController')
const checkCustomer = require('../middlewares/checkCustomer')

router.get('/', tenderController.getTenders)
router.get('/:id', tenderController.getTender)
router.put('/', checkCustomer, tenderController.createTender)

module.exports = router