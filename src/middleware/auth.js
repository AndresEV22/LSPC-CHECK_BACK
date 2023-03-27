const jwt = require('jsonwebtoken');

// Funcion para verifcar el token y autirazr el acceso a la base de datos
exports.verifyToken = function(req,res,next) {
  if (!req.headers.authorization) return res.status(401).json('No autorizado');
  const token = req.headers.authorization.substr(7);
  if (token!=='') {
    const content = jwt.verify(token, process.env.AUTH_TOKEN_KEY);
    req.data = content;
    next()
  } else{
    res.status(401).json('Token vacio')
  }
}
