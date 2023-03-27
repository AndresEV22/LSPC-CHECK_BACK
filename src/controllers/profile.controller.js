const { Sequelize } = require("sequelize");
const db = require("../config/sequelize");
const Profile = db.profile;
const Op = db.SequelizeLbr.Op;

//crear y guardar


exports.create = async (req,res) =>{
    //se hace una pequeña validacion de ejemplo para luego agregar mas validaciones a los otros campos
    if(!req.body.name){
        res.status(400).send({
            message: "El contenido no puede estar vacio"
        });
        return;
    }

    //crear un registro

    const profile={
        idProfile:req.body.idProfile,
        name : req.body.name
    };

    // guardar un registro en la base de datos

    try {
        const data = await Profile.create(profile);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.mesagge || "Hubo un error al crear"
        })
    }
};


// listar todos los registro de la tabla profile 
exports.findAll = async (req,res)=>{
    const idProfile = req.query.idProfile;
    var condition = idProfile? {idProfile:{[Op.iLike]: `%${idProfile}%`}}: null;

    try {
        const data = await Profile.findAll({where:condition})
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'No se pudo encontrar todos los registros'
        })        
    }


};

// listar la cantidad de los registro de la tabla profile 
exports.countProfiles = async (req,res)=>{
    try {
        const data = await Profile.findAll({attributes:[[Sequelize.fn('COUNT', Sequelize.col('id_profile')), 'n_profiles']]});
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'No se pudo contar los registros'
        })        
    }
};


// listar un registro a base de id

exports.findOne = async (req,res)=>{
    const id = req.params.id;
    try{
        const data = await Profile.findByPk(id);
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

//actualizar registros
exports.update = async (req,res)=>{
    const id = req.params.id;

    try{
        const num = await Profile.update(req.body,{
            where:{idProfile:id}
        })
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
    const id = req.params.id;


    try {
        const num =   await  Profile.destroy({
            where:{idProfile:id}
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
};


