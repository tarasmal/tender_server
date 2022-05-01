const express = require('express')

const router = express.Router()
const usersRouter = require('./usersRouter')
const tendersRouter = require('./tendersRouter')
const bidsRouter = require('./bidsRouter')



router.use('/users', usersRouter)
router.use('/tenders', tendersRouter)
router.use('/bids', bidsRouter)

module.exports = router