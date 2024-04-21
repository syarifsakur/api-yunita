const { Sequelize , DataTypes} = require("sequelize")
const db = require("../config//db")

const User = db.define(
    "user",
    {
    namaLengkap:{
        type: DataTypes.STRING
    },
    noHp:{
        type:DataTypes.STRING
    },
    birthDate:{
        type: DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    token:{
        type:DataTypes.STRING
    }
},{
    freezeTableName:true
});


module.exports=User
