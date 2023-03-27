module.exports = app =>{
    const entSal = require("../controllers/entSal.controller");
    const auth = require('../middleware/auth');
    var router = require("express").Router();

    //crear un nuevo registro
    router.post("/", auth.verifyToken, entSal.create);
    //encuentra todos los registros
    router.get("/", auth.verifyToken, entSal.findAll);
    //cuenta todos los registros
    router.get("/count", auth.verifyToken,entSal.countEntSal);
    //encuentra un registro a base de su id
    router.get("/:id", auth.verifyToken, entSal.findOne);
    //actualiza su registro a base de su id
    router.put("/:id", auth.verifyToken, entSal.update);
    //elimina su registro a base de su id
    router.delete("/:id", auth.verifyToken, entSal.delete);

    app.use('/api/entSal',router);
}