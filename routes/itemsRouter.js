const express = require('express')
const router = express.Router()
const {getItem, createItem, deleteItem, changeItem} = require('../controllers/itemsController')
router.get('/:id', getItem)
router.put('/:id', createItem)
router.post('/:id', changeItem)
router.delete('/:id', deleteItem)

module.exports = router