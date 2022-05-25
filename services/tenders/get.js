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
module.exports = {get}