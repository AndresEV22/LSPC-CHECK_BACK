const express = require("express");
const router = express.Router();
const updateImageController = require("../controllers/uploadImage.controller"); // importa el nuevo controlador
const upload = require("../middleware/uploadImage");
const auth = require('../middleware/auth');

let routes = (app)=>{
    router.put("/:id/image", auth.verifyToken, upload.single('file'), updateImageController.updateImage); // nueva ruta para actualizar la imagen de un usuario
    router.get("/:id/getimage", auth.verifyToken,updateImageController.getImage); // nueva ruta para obtener la imagen de un usuario

    return app.use("/api/user",router);
};

module.exports = routes;