const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER,allowNull:false, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING,allowNull:false,  unique: true },
    password: { type: DataTypes.STRING, allowNull:false  },
    userName: { type: DataTypes.STRING, allowNull:false },
    userImage: { type: DataTypes.STRING},
    role: { type: DataTypes.STRING,allowNull:false, defaultValue: "USER" }
})

const Comment = sequelize.define('comment', {
    content: { type: DataTypes.TEXT,allowNull:false,  },
    id: { type: DataTypes.INTEGER, allowNull:false,  primaryKey: true, autoIncrement: true }
})

const Film = sequelize.define('film', {
    filmName: { type: DataTypes.STRING, allowNull:false,  },
    description: { type: DataTypes.TEXT, allowNull:false,  },
    genres: { type: DataTypes.STRING , allowNull:false, },
    video: { type: DataTypes.STRING, allowNull:false,  },
    duration: { type: DataTypes.INTEGER, allowNull:false,  },
    preview: { type: DataTypes.STRING, allowNull:false,  },
    id: { type: DataTypes.INTEGER,allowNull:false,  primaryKey: true, autoIncrement: true },
    type: {type: DataTypes.STRING, allowNull:false, },
    year: {type: DataTypes.INTEGER, allowNull:false}
})

const Raiting = sequelize.define('raiting', {
    id: { type: DataTypes.INTEGER,allowNull:false,  primaryKey: true, autoIncrement: true },
    value: { type: DataTypes.REAL, allowNull:false, }
})

User.hasMany(Comment)
Comment.belongsTo(User)

User.hasMany(Raiting)
Raiting.belongsTo(User)

Film.hasMany(Comment)
Comment.belongsTo(Film)

Film.hasMany(Raiting)
Raiting.belongsTo(Film)

module.exports = {
    User,
    Comment,
    Raiting,
    Film
}