const db = require("../config/sequelize");
const Pqrs = db.pqrs;
const User = db.user;
const Op = db.SequelizeLbr.Op;
const { Sequelize } = require('sequelize');

//relaciones de tablas
Pqrs.belongsTo(User,{foreignKey: "idUser"});// N - N
User.hasMany(Pqrs,{foreignKey: "idUser"});// M - N

//crear y guardar
exports.create = async (req,res)=>{
//se hace una pequeña validacion de ejemplo para luego agregar mas validaciones a los otros campos
    if(!req.body.reason){
        res.status(400).send({
            message:"El contenido no puede estar vacio"
        });
    }
    // crear un registro
    const  pqrs ={
        idInform:req.body.idInform,
        idUser:req.body.idUser,
        reason:req.body.reason,
        time:req.body.time,
        date:req.body.date,
        description:req.body.description,
        tipoTransac:req.body.tipoTransac,
    }
    //guardar un registro en la la base de datos
    try {
        const data = await Pqrs.create(pqrs);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.mesagge || "Hubo un error al crear"
        })
    }
};

//listar todos los registros de la tabla
exports.findAll = async (req,res)=>{
    const idInform = req.query.idInform;
    let condition = idInform?{idInform:{[Op.iLike]: `%${idInform}`}}:null;
    try {
        const data = await Pqrs.findAll({include:{ model: User, attributes: ["name","lastname"] },where:condition})
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'No se pudo encontrar todos los registros'
        })        
    }
};

//contar todos los registros de la tabla
exports.countPqrs = async (req,res)=>{
    try {
        const data = await Pqrs.findAll({ attributes:[[Sequelize.fn('COUNT',Sequelize.col('id_inform')),'n_pqrs']] })
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'No se pudo contar los registros'
        })        
    }
};

//listar un registro a base de su id
exports.findOne = async (req,res)=>{
    const id = req.params.id;
    let condition = id?{idInform: id}: null;
    try{
        const data = await Pqrs.findOne({include:{ model: User, attributes: ["name","lastname"] },where:condition});
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

//listar un registro a base de el id del usuario
exports.findByUserId = async (req,res)=>{
    const id = req.params.idUser;
    try{
        const data = await Pqrs.findAll({include:{ model: User, attributes: ["name","lastname"]}, where: { idUser:id }});
        if(data){
            res.send(data);
        }else{
            res.status(404).send({
                message: `No se encontro el registro con el id=${id}`
            })
        }
    }catch(err){
        res.status(500).send({
            message: err.message || "Error id= " + id
        })
    }
};

//actualizar registros mi pro
exports.update = async (req,res)=>{
    const id = req.params.id;
    try{
        const num = await Pqrs.update(req.body,{
            where:{idInform:id}
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
}

//eliminar registro por id
exports.delete = async (req,res)=>{
    const id = req.params.id
    try {
        const num =   await Pqrs.destroy({
            where:{idInform:id}
        })
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
}