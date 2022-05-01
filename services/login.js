const {User} = require("../models/models");
const bcrypt = require("bcrypt");
const login = async (userInfo) => {
     const user = await User.findOne( {where: {email: userInfo.email}} )
     if (!user){
         return {message: "Incorrect email", code: 401}
     }
     const userPassword = bcrypt.compareSync(userInfo.password, user.password )
     if (!userPassword){
         return {message: "Incorrect password", code: 401}
     }
     return user
}

module.exports = login