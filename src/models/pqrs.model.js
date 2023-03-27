module.exports = (sequelize,Sequelize) =>{
    const tbl_pqrs_nvds = sequelize.define("tbl_pqrs_nvds",{
        idInform:{
            field:'id_inform',
            autoIncrement:true,
            primaryKey:true,
            type:Sequelize.INTEGER
        },
        idUser:{
            field:'id_user',
            foreignKey:true,
            type: Sequelize.INTEGER
        },
        reason:{
            field:'reason',
            type:Sequelize.TEXT
        },
        time:{
            field:'time',
            type: Sequelize.TIME
        },
        date:{
            field:'date',
            type:Sequelize.DATEONLY
        },
        description:{
            field:'description',
            type:Sequelize.TEXT
        },
        tipoTransac:{
            field:'tipo_trans',
            type:Sequelize.TEXT
        }

    });

    return tbl_pqrs_nvds;
}