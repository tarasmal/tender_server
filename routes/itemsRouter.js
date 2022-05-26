const express = require('express')
const router = express.Router()
const {getItem, createItem} = require('../controllers/itemsController')
router.get('/:id', getItem)
router.put('/:id', createItem)

module.exports = router