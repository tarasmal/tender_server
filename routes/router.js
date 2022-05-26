const express = require('express')

const router = express.Router()
const usersRouter = require('./usersRouter')
const tendersRouter = require('./tendersRouter')
const bidsRouter = require('./bidsRouter')
const passwordRouter = require('./passwordRouter')
const itemsRouter = require('./itemsRouter')


router.use('/users', usersRouter)
router.use('/tenders', tendersRouter)
router.use('/bids', bidsRouter)
router.use('/items', itemsRouter)
router.use('/password', passwordRouter)
module.exports = router