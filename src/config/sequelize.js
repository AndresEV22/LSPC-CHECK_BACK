const dbConfig = require("./db");

const SequelizeLibrary = require("sequelize");


const sequelizeConfig = new SequelizeLibrary(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
    }
)

const db = {};

db.SequelizeLbr = SequelizeLibrary;
db.sequelizeCfg = sequelizeConfig;

db.profile = require("../models/profile.model")(sequelizeConfig,SequelizeLibrary);
db.computer = require("../models/computer.model")(sequelizeConfig,SequelizeLibrary);
db.entSal = require("../models/entSal.model")(sequelizeConfig,SequelizeLibrary);
db.pqrs = require("../models/pqrs.model")(sequelizeConfig,SequelizeLibrary);
db.user = require("../models/user.model")(sequelizeConfig,SequelizeLibrary);

module.exports = db;

