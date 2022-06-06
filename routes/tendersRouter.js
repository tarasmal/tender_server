const express = require('express')
const router = express.Router()
const tenderController = require('../controllers/tenderController')
const checkCustomer = require('../middlewares/checkCustomer')

router.get('/', tenderController.getTenders)
router.get('/:id', tenderController.getUserTenders)
router.put('/', checkCustomer, tenderController.createTender)
router.post('/', tenderController.pauseTender)
router.delete('/:id', tenderController.deleteTender)

module.exports = router