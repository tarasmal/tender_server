const {User} = require("../models/models");
const bcrypt = require("bcrypt");
const changePassword = async (req, res) => {
    const id = req.params.id
    const {old_password, new_password} = req.body
    const user = await User.findByPk(id)
    console.log(old_password, user.password)
    const result = bcrypt.compareSync(old_password, user.password)
    if (!result){
        return res.status(406).json({message: "Incorrect password"})
    }
    else{

        user.password = await bcrypt.hash(new_password, 5)
        await user.save()
        return res.status(200).json({message: 'OK'})
    }
}

module.exports = {changePassword}