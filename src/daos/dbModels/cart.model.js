const mongoose = require("mongoose");

const schemaCartOnMongo = new mongoose.Schema(
  
    {
        name: { type: String, required: true , unique:true},
        description: { type: String, required: true },
        code: { type: Number, required: true },
        url: { type: String, required: true},
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        amount: { type: Number, required: true },
    }, 
    {
        timestamps: true
    }
)

const cartsMongo= mongoose.model('carts', schemaCartOnMongo);

module.exports={cartsMongo}