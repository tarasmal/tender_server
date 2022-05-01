const {User, Balance} = require("../models/models");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const registrate = async userInfo => {
    console.log(userInfo)
    if (!userInfo.password || !userInfo.email) {
        return {message: " Uncorrect email or password", code: 400}
    }
    const user = await User.findOne({where: {email: userInfo.email}})
    if (user) {
        return {message: "User already exists", code: 400}
    }
    const uid = uuid.v4()
    userInfo.password = await bcrypt.hash(userInfo.password, 5)
    const createdUser = Object.assign({}, userInfo, {id: uid})
    User.create(createdUser)
    Balance.create({id: uuid.v4(), value: 0, userId: uid})
    return {message: "OK", code: 201}
}

module.exports = registrate