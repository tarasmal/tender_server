const jsonwebtoken = require("jsonwebtoken");
const checkJWT = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    if (! jsonwebtoken.verify(token, process.env.JWT_KEY)){
        return res.status(403).json({message:"Token is not usable"})
    }
    next()
}

module.exports = checkJWT