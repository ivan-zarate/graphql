const dotenv=require("dotenv");
dotenv.config();

const options={
    MONGO_URL:process.env.MONGO_URL,
    MONGO_SESSION: process.env.MONGO_SESSION || "http://mongo/",
    CLAVE_SECRETA:process.env.CLAVE_SECRETA
}

module.exports= {options};