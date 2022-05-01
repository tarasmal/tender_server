const {Tender} = require('../models/models')
const uuid = require('uuid')


const getTenders = async (req, res) => {
    const tenders = await Tender.findAll()
    return res.status(200).json(tenders)
}

const getTender = async (req, res) => {
    const id = req.params.id
    const tender = await Tender.findByPk(id)
    if (tender){
        return res.status(200).json(tender)
    }
    return res.status(404).json({message: "Tender has been not found"})
}


const createTender = async (req, res) => {
    const tenderInfo = req.body
    const tender = Object.assign({}, tenderInfo, {id: uuid.v4(), userId: res.locals.id})
    try{
        await Tender.create(tender)
        return res.status(201).json(tender)
    }
    catch (e){
        console.log(e)
        res.status(500).json({message: "tender has not been created"})
    }


}


module.exports = {getTenders, getTender, createTender}
