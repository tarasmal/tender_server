const express = require('express')
const router = express.Router()
const bidController = require('../controllers/bidController')
const checkProvider = require('../middlewares/checkProvider')

router.get('/', bidController.getBids)
router.get('/:id', bidController.getBid)
router.put('/', checkProvider, bidController.createBid)
router.delete('/:id', bidController.deleteBid )

module.exports = router