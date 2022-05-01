const jwtDecoder = require('jwt-decode')
const jsonwebtoken = require('jsonwebtoken')
const checkCustomer = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    if (!jsonwebtoken.verify(token, process.env.JWT_KEY)) return res.status(403).json({message:"Token is not usable"})
    const token_info = jwtDecoder(token)
    if (token_info.role === 'customer'){
        res.locals.id = token_info.id
        return next()
    }

    return res.status(403).json({message: "You are not a customer"})
}

module.exports = checkCustomer
