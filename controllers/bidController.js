const {Bid} = require('../models/models')
const uuid = require('uuid')
const getBids = async (req, res) => {
    const bids = await Bid.findAll()
    return res.status(200).json(bids)
}
const getBid = async(req, res) => {
    const id = req.params.id
    const bid = await Bid.findByPk(id)
    return res.status(200).json(bid)
}

const createBid = async(req, res) => {
    const bidInfo = req.body
    bidInfo.id = uuid.v4()
    const bid = Object.assign({}, bidInfo, {id: uuid.v4(), userId: res.locals.id})
    try {
        await Bid.create(bid)
        return res.status(201).json(bid)
    }
    catch (e){
        console.log(e)
        return res.status(500).json({message: "error while creating"})
    }

}

const deleteBid = async(req, res) => {
    const id = req.params.id
    Bid.destroy({where: {id: id}})
    return res.status(200).json({message: "bid has been successfully deleted "})
}

module.exports = {getBids, getBid, createBid, deleteBid}