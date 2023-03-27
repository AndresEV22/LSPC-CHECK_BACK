const fs  = require("fs");
const db = require("../config/sequelize");
const Image  = db.user;

exports.updateImage  = async (req,res)=>{
    try {
        const id = req.params.id;

        if(req.file==undefined){
            res.status(400).send({message: "Debes selecionar algun archivo."});
            return;
        }

        const updatedImage = {
            type: req.file.mimetype,
            namePhoto: req.file.originalname,
            data: fs.readFileSync(
                __basedir + "/resources/static/assets/uploads/" + req.file.filename
            )
        }
        
        //actualiza el registro en la base de datos
        const [rowCount,[updated]] = await Image.update({type: updatedImage.type, namePhoto:updatedImage.namePhoto, data: updatedImage.data },{
            where:{idUser:id},
            returning:true
        });

        if (rowCount===0){
            res.status(400).send({message: `el usuario con ID ${id} no se encuentra en la base de datos.`});
            return;
        }

        fs.writeFileSync(__basedir + "/resources/static/assets/temp/" + updated.namePhoto,updated.data);
        
        res.status(200).send({message: `La imagen de el usuario con ID ${id} ha sido actualizada.`});
        return;
    } catch (error) {
        res.status(400).send({message: `Hubo un error al  momento de actualizar el archivo: ${error}`});
        return;
    }
};

exports.getImage = async (req,res) =>{
    try {
        const id = req.params.id

        const image = await Image.findByPk(id);

        if(image){
            res.setHeader("content-Type",image.type);
            const blob = new Blob([image.data],{type:image.type});
            res.send(blob);
        }else{
            res.status(404).send({message:`No se encontro ninguna imagen con id ${id}`});
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}