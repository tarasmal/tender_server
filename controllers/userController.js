const {User} = require('../models/models')
const generateJWT = require('../functions/generateJWT')
const registrate = require('../services/registrate')
const toLogin = require('../services/login')
const registration = async(req, res) => {
    const userInfo = req.body
    const {message, code} = await registrate(userInfo)

    return res.status(code).json({message: message})
}
const login = async(req, res) => {
    const userInfo = req.body
    console.log(userInfo)
    const user = await toLogin(userInfo)
    if (user.code) return res.status(user.code).json({message: user.message})
    const token = generateJWT(user.id, user.role)
    return res.status(200).json({token: token})

}

const getUsers = async (req, res) => {
    const users = await User.findAll({where : {status: true}})
    res.status(200).json(users)
}

module.exports = {getUsers, registration, login}
