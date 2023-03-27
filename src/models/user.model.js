const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) =>{
    const tbl_users = sequelize.define("tbl_users",{
        idUser:{
            field:'id_user',
            autoIncrement:true,
            primaryKey:true,
            type:Sequelize.INTEGER
        },
        name:{
            field:'name',
            type:Sequelize.TEXT
        },
        secName:{
            field:'second_name',
            type:Sequelize.TEXT
        },
        lastname:{
            field:'lastname',
            type:Sequelize.TEXT
        },
        secSurname:{
            field:'second_surname',
            type:Sequelize.TEXT
        },
        password:{
            field:'password',
            type:Sequelize.TEXT
        },
        email:{
            field:'email',
            unique: true,
            type:Sequelize.TEXT
        },
        cardId:{
            field:'card_id',
            unique: true,
            type:Sequelize.TEXT
        },
        idProfile:{
            field:'id_profile',
            foreignKey:true,
            type:Sequelize.INTEGER
        },
        state:{
            field:'state',
            type:Sequelize.TEXT
        },
        type:{
            field:'type',
            type:Sequelize.TEXT,
        },
        namePhoto:{
            field:'namePhoto',
            type:Sequelize.TEXT
        },
        data:{
            field:'data',
            type:DataTypes.BLOB("long")
        },
        resetPasswordToken: {
            field: 'reset_password_token',
            type: Sequelize.STRING
        },
        resetPasswordTokenExpiresAt: {
            field: 'reset_password_token_expires_at',
            type: Sequelize.DATE
        }
    })
    return tbl_users;
}