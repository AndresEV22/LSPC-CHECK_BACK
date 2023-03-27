const db = require("../config/sequelize");
const EntSal = db.entSal;
const User = db.user;
const Computer = db.computer;
const Op = db.SequelizeLbr.Op;
const { Sequelize } = require('sequelize');

//relaciones de tablas
EntSal.belongsTo(User,{foreignKey: "idUser"});// N - N
User.hasMany(EntSal,{foreignKey: "idUser"});// M - N

EntSal.belongsTo(Computer,{foreignKey: "idComputer"});// N - N
Computer.hasMany(EntSal,{foreignKey: "idComputer"});// M - N

//crear y guardar

exports.create = async (req,res)=>{
    //se hace una pequeña validacion de ejemplo para luego agregar mas validaciones a los otros campos
    if(!req.body.idUser){
        res.status(400).send({
            message:"El contenido no puede estar vacio mi bro"
        });
    }
    //crear un registro
    const entSal ={
        idTransac: req.body.idTransac,
        idUser: req.body.idUser,
        idComputer:req.body.idComputer,
        time:req.body.time,
        date:req.body.date,
        tipoTransac:req.body.tipoTransac
    };
    //guardar un registro en la base de datos
    try {
        const data = await EntSal.create(entSal)
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.mesagge || "Hubo un error al crear"
        })
    }

};

//listar todos los registros de la tabla ent_sal
exports.findAll = async (req,res)=>{
    const idUser = req.query.idUser;
    let condition = idUser?{idUser:{[Op.iLike]: `%${idUser}%`}}: null;
    try {
        const data = await EntSal.findAll({include:[{ model: User, attributes: ["name","lastname"]},{ model: Computer, attributes:["id_computer","id_serial","mark","peripherals"]}],where:condition})
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'No se pudo encontrar todos los registros'
        })        
    }

};

//contar todos los registros de la tabla ent_sal
exports.countEntSal = async (req,res)=>{
    try {
        const entradas = await EntSal.findAll({where:{tipoTransac:{[Op.iLike]: `%Entrada%`}}, attributes:[[Sequelize.fn('COUNT',Sequelize.col('tipo_transac')),'n_entradas']] });
        const salidas = await EntSal.findAll({where:{tipoTransac:{[Op.iLike]: `%Salida%`}}, attributes:[[Sequelize.fn('COUNT',Sequelize.col('tipo_transac')),'n_salidas']] });
        const data = { entradas: entradas, salidas: salidas }
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'No se pudo encontrar todos los registros'
        })        
    }

};

// listar un registro a base de su id
exports.findOne = async (req,res)=>{
    const id = req.params.id;
    try{
        const data = await EntSal.findOne({include:[{ model: User, attributes: ["name","lastname"]},{ model: Computer, attributes:["id_computer","id_serial","mark","peripherals"]}],where:{idTransac:id}})
        if(data){
            res.send(data);
        }else{
            res.status(404).send({
                message: `No se encontro el registro con el id=${id}`
            })
        }
    }catch(err){
        res.status(500).send({
            message: err.message || "Error id= "+id
        })
    }
};

// actualizar registros mi pro
exports.update = async (req,res)=>{
    const id = req.params.id;
    try{
        const num = await EntSal.update(req.body,{
            where:{idTransac:id}
        });
        if(num==1){
            res.send({
                message:"El registro fue actualizado"
            })
        }else{
            res.send({
                message:`No se pudo actualizar el registro con el id=${id}`
            })
        }
    }catch(err){
        res.status(500).send({
            message: err.message || "Error al actualizar el registro con id="+id
        })
    }
};

//eliminar registro por id
exports.delete = async (req,res)=>{
    const id = req.params.id
    try {
        const num =   await  EntSal.destroy({
            where:{idTransac:id}
        });
        if(num==1){
            res.send({
                message: "El registro fue eliminado exitosamente"
            });
        }else{
            res.send({
                message: `No se pudo eliminar el registro id=${id}`
            });
        }
    } catch (err) {
        res.status(500).send({
            message : err.message || "No puedes eliminar el registro"
        })
    }
};