const newArgs = require("../config/arg");
const { ConnectDB } = require("../config/dbConnection.js");

let userDao;
let productDao;
let messageDao;
let cartDao;
let sellDao;

switch (newArgs.persistance) {
    case "mongo":
        ConnectDB.getInstance();
        const { UserManagerMongo } = require("./manager/users/userManagerMongo");
        const { usersMongo } = require("./dbModels/user.model");
        const { ProductManagerMongo } = require("./manager/products/productManagerMongo");
        const { productsMongo } = require("./dbModels/product.model");
        const { MessageManagerMongo } = require("./manager/messages/messageManagerMongo");
        const { messagesMongo } = require("./dbModels/message.model");
        const { CartManagerMongo } = require("./manager/carts/cartManagerMongo");
        const { cartsMongo } = require("./dbModels/cart.model");
        const { SellManagerMongo } = require("./manager/sells/sellManagerMongo");
        const { sellsMongo } = require("./dbModels/sell.model");
        userDao = new UserManagerMongo(usersMongo);
        productDao = new ProductManagerMongo(productsMongo);
        messageDao = new MessageManagerMongo(messagesMongo);
        cartDao=new CartManagerMongo(cartsMongo);
        sellDao=new SellManagerMongo(sellsMongo);
        break;
    case "sql":
        break;
    case "firebase":
        break;
}

module.exports = { userDao, productDao, messageDao, cartDao, sellDao }