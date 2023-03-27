const db = require("../config/sequelize");
const Computer = db.computer;
const Op = db.SequelizeLbr.Op;
const User = db.user;
const { Sequelize } = require('sequelize');

//relaciones de tablas
Computer.belongsTo(User,{foreignKey: "idUser"});// N - N
User.hasMany(Computer,{foreignKey: "idUser"});// M - N

//crear y guardar

exports.create = async (req,res)=>{
    //se hace una pequeña validacion de ejemplo para luego agregar mas validaciones a los otros campos
    if(!req.body.idSerial){
        res.status(400).send({
            message:"El contenido no puede estar vacio"
        });
    }

    //crear un registro

    const computer ={
        idComputer:req.body.idComputer,
        idSerial:req.body.idSerial,
        color:req.body.color,
        mark:req.body.mark,
        peripherals:req.body.peripherals,
        idUser:req.body.idUser
    };

    //guardar un registro en la base de datos

    try {
        const data = await Computer.create(computer);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.mesagge || "Hubo un error al crear"
        })
    }
};


// listar todos los registros de la tabla computer gamer

exports.findAll = async (req,res)=>{
    const idComputer = req.query.idComputer;
    var condition = idComputer?{idComputer:{[Op.iLike]: `%${idComputer}%`}}: null;

    
    try {
        const data = await Computer.findAll({include:{ model: User, attributes: ["name","lastname"] },where:condition})
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'No se pudo encontrar todos los registros'
        })        
    }
    
};

// contar todos los registros de la tabla computer gamer
exports.countComputers = async (req,res)=>{
    try {
        const data = await Computer.findAll({attributes:[[Sequelize.fn('COUNT', Sequelize.col('id_computer')), 'n_pcs']]})
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'No se pudo encontrar todos los registros'
        })        
    }
    
};

//listar un registro a base de ID

exports.findOne = async (req,res)=>{
    const id = req.params.id;
    let condition = id?{idComputer: id}: null;
    try{
        const data = await Computer.findOne({include:{ model: User, attributes: ["name","lastname"] },where:condition});
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
        });
    }
}

//listar un registro a base de el id del usuario
exports.findByUserId = async (req,res)=>{
    const id = req.params.idUser;
    try{
        const data = await Computer.findAll({include:{ model: User, attributes: ["name","lastname"]}, where: { idUser:id }});
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

// Actualizar registros mi pro
exports.update = async (req,res)=>{
    const id = req.params.id;
    try{
        const num = await Computer.update(req.body,{
            where:{idComputer:id}
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
        const num =   await  Computer.destroy({
            where:{idComputer:id}
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

