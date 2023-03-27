module.exports = app =>{
    const user = require("../controllers/user.controller");

    var router = require("express").Router();

    const auth = require('../middleware/auth')

    //crear un nuevo registro
    router.post("/", user.create);
    //encuentra todos los registros
    router.get("/",auth.verifyToken,user.findAll);
    //contar usuarios
    router.get("/count",auth.verifyToken,user.countUsers);
    //encuentra un registro a base de su id
    router.get("/:id",auth.verifyToken, user.findOne);
    //actualiza un registro a base de su id
    router.put("/:id",auth.verifyToken, user.update);
    //elimina un registro a base de su id
    router.delete("/:id",auth.verifyToken, user.delete);
    // login del usuario
    router.post('/login', user.login);

    app.use('/api/user',router);

}