const jsonwebtoken = require("jsonwebtoken");
const checkJWT = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    try{
        jsonwebtoken.verify(token, process.env.JWT_KEY)
        next()
    }catch {
        return res.status(403).json({message: "Token is not usable"})
    }


}

module.exports = checkJWT