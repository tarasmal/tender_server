const { Op} = require("sequelize")
const {Tender} = require("../../models/models");
const get = async (limit, searchReq, search, status, start) => {
    const searchOption = [{
        name: {
            [Op.like]: '%' + searchReq + `%`
        }
    },
        {
            location: {
                [Op.like]: '%' + searchReq + `%`
            }
        },
        {
            cost: searchReq
        }
    ]
    let baseOptions = {offset: start, limit: limit}
    let options
    if (search === 'false'){
        if (status === 'false'){
            options = baseOptions
        }
        else{
            options = Object.assign(baseOptions, {where: {status: true}})
        }
    }
    else{
        if (status === 'false'){
            options = Object.assign({baseOptions}, {where: {[Op.or]: searchOption}})
        }
        else{
            options = Object.assign({baseOptions}, {where: {[Op.or]: searchOption, status: true}})
        }
    }
    const totalCount = await Tender.count(options)
    const tenders = await Tender.findAll(options)

    return [totalCount, tenders]
}

const getForUser = async (id) => {
    try{
        return await Tender.findAll({where : {userId: id}})
    }
    catch (e){
        console.log(e)
        return res.status(404).json({message: "not found"})
    }
}

const getOneTender = async (id) => {
    try{
        return await Tender.findOne({where: {id: id}})
    }
    catch (e){
        console.log(e)
        return res.status(404).json({message: "not found"})
    }
}

module.exports = {get, getForUser, getOneTender}