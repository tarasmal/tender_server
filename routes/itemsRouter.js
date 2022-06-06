const express = require('express')
const router = express.Router()
const {getItem, createItem, deleteItem} = require('../controllers/itemsController')
router.get('/:id', getItem)
router.put('/:id', createItem)
router.delete('/:id', deleteItem)

module.exports = router