module.exports = (sequelize,Sequelize) =>{
    const tbl_ent_sals  = sequelize.define("tbl_ent_sals",{
        idTransac:{
            field: 'id_transac',
            autoIncrement:true,
            primaryKey:true,
            type:Sequelize.INTEGER
        },
        idUser:{
            field:'id_user',
            foreignKey:true,
            type:Sequelize.INTEGER
        },
        idComputer:{
            field:'id_computer',
            foreignKey:true,
            type:Sequelize.INTEGER
        },
        time:{
            field:'time',
            type:Sequelize.TIME
        },
        date:{
            field:'date',
            type:Sequelize.DATEONLY
        },
        tipoTransac:{
            field:'tipo_transac',
            type:Sequelize.TEXT
        }

    });

    return tbl_ent_sals;
}