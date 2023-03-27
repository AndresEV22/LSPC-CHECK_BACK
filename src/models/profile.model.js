module.exports  = (sequelize,Sequelize) =>{
    const tbl_profiles = sequelize.define("tbl_profiles",{

        idProfile:{
            field: 'id_profile',
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name:{
            field: 'name',
            type: Sequelize.TEXT
        }
        
    });

    return tbl_profiles;

};