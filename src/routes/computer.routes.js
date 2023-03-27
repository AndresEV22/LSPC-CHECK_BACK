module.exports = app =>{
    const computer = require("../controllers/computer.controller");
    const auth = require('../middleware/auth')
    var router = require("express").Router();

    //crear un nuevo registro
    router.post("/", auth.verifyToken, computer.create);
    //encuentra todos los registros
    router.get("/",auth.verifyToken, computer.findAll);
    //cuenta todos los registros
    router.get("/count",auth.verifyToken, computer.countComputers);
    //encuentra un registro a base de su id
    router.get("/:id",auth.verifyToken, computer.findOne);
    //encuentra un registro a base del id del usuario
    router.get("/pcUser/:idUser",auth.verifyToken, computer.findByUserId);
    //actualiza su registro a base de su id
    router.put("/:id",auth.verifyToken, computer.update);
    //elimina su registro a base de su id
    router.delete("/:id",auth.verifyToken, computer.delete);

    app.use('/api/computer',router);
}