module.exports = (sequelize,Sequelize) =>{
    const tbl_computers = sequelize.define("tbl_computers",{

        idComputer:{
            field: 'id_computer',
            autoIncrement: true,
            primaryKey:true,
            type:Sequelize.INTEGER
        },
        idSerial:{
            field:'id_serial',
            unique: true,
            type:Sequelize.TEXT
        },
        color:{
            field:'color',
            type:Sequelize.TEXT
        },
        mark:{
            field:'mark',
            type:Sequelize.TEXT
        },
        peripherals:{
            field:'peripherals',
            type:Sequelize.TEXT
        },
        idUser:{
            field:'id_user',
            foreignKey:true,
            type:Sequelize.INTEGER
        }
    });
    return tbl_computers;
}