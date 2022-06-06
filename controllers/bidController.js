const {Bid, Tender} = require('../models/models')
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
    const checkBid = await Bid.findOne({
        where: {
            userId: bidInfo.userId,
            tenderId: bidInfo.tenderId,

        }
    })
    const tender = await Tender.findByPk(bidInfo.tenderId)
    if (!tender.status){
        return res.status(403).json({message: "THIS TENDER IS NOT ACTIVE"})
    }
    if (checkBid){
        return res.status(406).json({message: "BID HAS BEEN ALREADY CREATED"})
    }

    else{
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

}
const deleteBid = async (req, res) => {
    const id = req.params.id
    try{
        await Bid.destroy({where : {tenderId: id}})
        return res.status(200)
    }
    catch (e) {
        console.log(e)
        return res.status(500)
    }
}

module.exports = {getBids, getBid, createBid, deleteBid}