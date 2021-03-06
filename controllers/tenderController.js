const {Tender, Bid, Item} = require('../models/models')
const uuid = require('uuid')
const {get, getForUser, getOneTender} = require("../services/tenders/get");

const getTenders = async (req, res) => {
    const {page, limit, searchReq, status} = req.query
    const end = page * limit
    const start = end - limit
    const [totalCount, tenders] = await get(limit, searchReq, req.headers.search, status, start)
    const pageCount = Math.ceil(totalCount / limit)
    const data = Object.assign({}, {tenders: tenders}, {pageCount: pageCount})
    return res.status(200).json(data)
}

const getUserTenders = async (req, res) => {
    const id = req.params.id
    const {is_one} = req.headers
    let tender;
    if (is_one === 'true'){
        tender = await getOneTender(id)
    }
    else{
        tender = await getForUser(id)
    }

    if (tender){
        return res.status(200).json(tender)
    }
    return res.status(404).json({message: "Tender has been not found"})
}


const createTender = async (req, res) => {
    const tenderInfo = req.body

    const tender = Object.assign({}, tenderInfo, {id: uuid.v4(), userId: res.locals.id, status: true})
    try{
        await Tender.create(tender)
        return res.status(201).json(tender)
    }
    catch (e){
        console.log(e)
        res.status(500).json(tender)
    }

}
const pauseTender = async (req, res) => {
    const {id, status} = req.body
    await Tender.update(
        {
            status: !status
        },
        {
            where: {id: id}
        }
    )
    return res.status(200).json({message: 'ok'})

}

const deleteTender = async (req, res) => {
    const id = req.params.id
    try{
        await Item.destroy({where: {tenderId: id}})
        await Bid.destroy({where: {tenderId: id}})
        await Tender.destroy({where: {id: id}})

        return res.status(200).json({message: 'ok'})
    }
    catch (e){
        console.log(e)
        return res.status(500).json({message: 'error'})
    }


}



module.exports = {getTenders, getUserTenders, createTender, pauseTender, deleteTender}
