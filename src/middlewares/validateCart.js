const logger = require("../logger");

const validateCart = (req, res, next) => {
    if (req.body.username && req.body.name && req.body.addres && req.body.age && req.body.telphone) {
      req.isCorrect = true;
      return next();
    }
    logger.error("Por favor ingresar los datos de usuario");
    throw new Error("Por favor ingresar los datos de usuario");
  };
  
  module.exports = validateCart;