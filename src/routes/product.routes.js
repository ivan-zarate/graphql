const express = require("express");
const productsInMongo = express.Router();
const validateBody = require("../middlewares/validateBody");
const validateUser = require("../middlewares/validateUser.js");
//importamos la capa de controlador
const {productController, createProductController, editProductController, deleteProductController, productByNameController} = require("../controllers/product.controller");

//definir las rutas para usuarios
productsInMongo.get("/products",productController);
productsInMongo.get("/product",productByNameController);
productsInMongo.post("/products",validateBody,validateUser, createProductController);
productsInMongo.put("/products/:_id", validateBody,validateUser, editProductController);
productsInMongo.delete("/products/:_id",validateUser, deleteProductController);

module.exports = productsInMongo;