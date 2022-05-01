const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }


})

const Balance = sequelize.define('balance', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },

    value: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
})

const Bid = sequelize.define('bid',{
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },

    cost: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },


})

const Tender = sequelize.define('tender', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },

    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    winnerId: {
        type: DataTypes.UUID,
        allowNull: true,
    },

    cost: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }


})

const Item = sequelize.define('item', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false
    },

    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }

})

User.hasOne(Balance)
User.hasMany(Tender)
User.hasMany(Bid)

Balance.belongsTo(User)

Tender.hasMany(Item)
Tender.hasMany(Bid)
Item.belongsTo(Tender)
Tender.belongsTo(User)

Bid.belongsTo(User)
Bid.belongsTo(Tender)

module.exports = {User, Balance, Tender, Bid, Item}