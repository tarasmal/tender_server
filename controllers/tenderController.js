const {Tender} = require('../models/models')
const uuid = require('uuid')
const { Op } = require("sequelize")
const getTenders = async (req, res) => {
    const {page, limit, searchReq} = req.query
    const end = page * limit
    const start = end - limit
    const totalCount = await Tender.count()
    const pageCount = Math.ceil(totalCount / limit)
    let tenders
    if (req.headers.search === 'false'){
        tenders = await Tender.findAll({offset: start, limit: limit})
    }
    else{
        tenders = await Tender.findAll({
            where:  {
                name: {
                    [Op.like]: '%' + searchReq + `%`
                }
            }
        })
    }

    const data = Object.assign({}, {tenders: tenders}, {pageCount: pageCount})
    return res.status(200).json(data)
}

const getUserTenders = async (req, res) => {
    const id = req.params.id
    const tender = await Tender.findAll({where : {userId: id}})
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


module.exports = {getTenders, getUserTenders, createTender}
