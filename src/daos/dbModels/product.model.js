
const mongoose = require("mongoose");

const schemaProductOnMongo = new mongoose.Schema(
    {
        name: { type: String, required: true, unique:true },
        description: { type: String, required: true },
        code: { type: Number, required: true },
        url: { type: String, required: true},
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        incart:{type:Boolean, default:false}
    }, {
    timestamps: true
}
)
const productsMongo= mongoose.model('products', schemaProductOnMongo);

module.exports={productsMongo}