const logger = require("../logger.js");

const validateBody = (req, res, next) => {
  console.log("body", req.body);
    if (req.body.name && req.body.description && req.body.code && req.body.url && req.body.price && req.body.stock || req.body.text) {
      req.isCorrect = true;
      return next();
    }
    logger.error("Por favor ingresar todos los campos del nuevo producto");
    throw new Error("The body is required");
  };
  
  module.exports = validateBody;