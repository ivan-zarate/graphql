const mongoose = require("mongoose");
const { options } = require("./options");
const logger=require("../logger")

class ConnectDB{
    static #instance;
    constructor(){
        try {
            mongoose.set("strictQuery", true);
            mongoose.set('debug', true);
            mongoose.connect(options.MONGO_URL);
            logger.info('Connected to Mongo')
        } catch (error) {
            logger.warn(`An error occurred trying to connect to mongo: ${error}`)
        }
    };
    static async getInstance(){
        if(ConnectDB.#instance){
            logger.info("Base de datos ya conectada");
            return ConnectDB.#instance;
        }
        this.#instance = new ConnectDB();
        logger.info("Base de datos conectada");
        return this.#instance;
    }
}

module.exports = { ConnectDB }