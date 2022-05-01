const jsonwebtoken = require('jsonwebtoken')
const generateJWT = (id, role) => {
    const key = process.env.JWT_KEY
    return jsonwebtoken.sign({id: id, role: role}, key, {expiresIn: "24h"} )
}

module.exports = generateJWT