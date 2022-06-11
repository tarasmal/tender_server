const {Item} = require('../models/models')
const uuid = require('uuid')

const getItem = async (req, res) => {
    const items = await Item.findOne({where: {tenderId: req.params.id}})
    return res.status(200).json(items)
}
const createItem = async (req, res) => {
    const itemInfo = req.body
    const id = uuid.v4()
    const item = Object.assign({}, itemInfo, {id: id, tenderId: req.params.id})
    try {
        await Item.create(item)
        return res.status(201).json(item)
    }
    catch (e){
        console.log(e)
        return res.status(500).json({message: "error while creating"})
    }
}
const changeItem = async(req, res) => {
    const tenderId = req.params.id
    const {userId} = req.query
    console.log("~!~")
    try{
        await Item.update(
            {
                winnerId: userId
            },
            {
                where: {tenderId: tenderId}
            }
        )
        return res.status(200)
    }
    catch (e){
        console.log(e)
        return res.status(500)
    }
}
const deleteItem = async (req, res) => {
    const tenderId = req.params.id
    try{
        await Item.destroy({where: {tenderId: tenderId}})
        return res.status(200)
    }
    catch (e){
        console.log(e)
        return res.status(500)
    }
}

module.exports = {getItem, createItem, changeItem, deleteItem}