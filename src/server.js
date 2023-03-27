const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/sequelize");
const app = express();
const initRoutes = require("./routes/image.routes");
const passwordResetRoutes = require("./routes/resetpass.routes");
const passwordForgetRoutes = require("./routes/forgetpasw.routes");

global.__basedir = __dirname;

db.sequelizeCfg.sync()
    .then(() =>{
        console.log("Synced DB");
    })
    .catch((err) =>{
        console.log("failed to sync db:"+ err.message);
    });


var corsOptions ={
    origin:true
}

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

app.use(express.urlencoded({extended:true}));
initRoutes(app);

app.get("/",(req,res)=>{
    res.json({message: "Bienvenido!"});
});

const PORT = process.env.PORT || 4000;

require("./routes/profile.routes")(app);
require("./routes/computer.routes")(app);
require("./routes/entSal.routes")(app);
require("./routes/pqrs.routes")(app);
require("./routes/user.routes")(app);
require("./routes/image.routes")(app);

app.use(passwordResetRoutes); // agregar la ruta de reinicio de contraseña
app.use(passwordForgetRoutes); // agregar la ruta de olvido de contraseña

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}.`);
});