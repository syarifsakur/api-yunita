const { Sequelize , DataTypes} = require("sequelize")
const db = require("../config//db")

const Artikel = db.define(
    "artikel",
    {
        foto:{
            type:DataTypes.STRING
        },
        dokter:{
            type:DataTypes.STRING
        },
        judul:{
            type:DataTypes.STRING
        }
},{
    freezeTableName:true
});


module.exports=Artikel
