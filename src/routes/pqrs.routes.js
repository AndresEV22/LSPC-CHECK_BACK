module.exports = app =>{
    const pqrs = require("../controllers/pqrs.controller");
    const auth = require('../middleware/auth');
    var router = require("express").Router();

    //crear un nuevo registro
    router.post("/", auth.verifyToken, pqrs.create);
    //encuentra todos los registros
    router.get("/", auth.verifyToken, pqrs.findAll);
    //cuenta todos los registros
    router.get("/count", auth.verifyToken, pqrs.countPqrs);
    //encuentra un registro a base de su id
    router.get("/:id", auth.verifyToken, pqrs.findOne);
    //encuentra un registro a base del id usuario
    router.get("/userPqrs/:idUser", auth.verifyToken, pqrs.findByUserId);
    //actualiza registro a base de su id
    router.put("/:id", auth.verifyToken, pqrs.update);
    //elimina un registro a base de su id
    router.delete("/:id", auth.verifyToken, pqrs.delete);


    app.use('/api/pqrs',router);
}