module.exports = app =>{
    const profile = require("../controllers/profile.controller");
    const auth = require('../middleware/auth');
    var router = require("express").Router();

    //crear un nuevo registro
    router.post("/", auth.verifyToken, profile.create);
    //encuentra todos los registros
    router.get("/", auth.verifyToken, profile.findAll);
    //encuentra la cantisad de los registros
    router.get("/count", auth.verifyToken, profile.countProfiles);
    //encuentra un registro a base de su id
    router.get("/:id", auth.verifyToken, profile.findOne);
    //actualiza su registro a base de su id
    router.put("/:id", auth.verifyToken, profile.update);
    //elimina su registro a base de su id
    router.delete("/:id", auth.verifyToken, profile.delete);


    app.use('/api/profile',router);
}