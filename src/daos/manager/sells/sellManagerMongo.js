const { cartsMongo } = require("../../dbModels/cart.model");
const { sellsMongo } = require("../../dbModels/sell.model");

class SellManagerMongo {
    constructor(model) {
        this.model = model;
    };
    async sell(data) {
        try {
            const productsInCart = await cartsMongo.find();
            if (!productsInCart) {
                return res.status(400).send("Carrito no encontrado");
            }
            if (productsInCart.length === 0) {
                return res.status(200).send("Aun no tienes productos en el carrito");
            }
            const total = productsInCart.reduce((acc, product) => acc + (product.price * product.amount), 0);
            const sell = {
                user: data,
                cart: productsInCart,
                total,
            }
            const newSell = new sellsMongo(sell);
            newSell.save();
            return newSell;
        } catch (error) {
            throw new Error("No se pudo obtener el carrito");
        }
    };
}

module.exports = { SellManagerMongo }