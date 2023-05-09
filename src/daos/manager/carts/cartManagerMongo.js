const { productsMongo } = require("../../dbModels/product.model");

class CartManagerMongo {
    constructor(model) {
        this.model = model;
    };
    async getCart() {
        try {
            const productsInCart = await this.model.find();
            if (!productsInCart) {
                return ("Carrito no encontrado");
            }
            if (productsInCart.length === 0) {
                return ("Aun no tienes productos en el carrito");
            }
            return productsInCart;
        } catch (error) {
            throw new Error("No se pudo obtener el carrito");
        }
    };
    async addProduct(productId) {
        const productToFind = await productsMongo.find(productId);
        console.log("producto ", productToFind);
        if (!productToFind) {
            return ("Producto no encontrado");
        }
        const { name, description, code, url, price, stock } = productToFind[0];
        const isInCart = await this.model.findOne({ name });
        if (!isInCart) {
            const newProductInCart = new this.model({ name, description, code, url, price, stock, amount: 1 });
            await productsMongo.findByIdAndUpdate(
                productToFind[0]._id,
                { incart: true },
                { new: true }
            )
                .then((product) => {
                    newProductInCart.save();
                    return (product)
                })
                .catch((error) => {
                    throw new Error("No se pudo obtener el carrito");
                })
        }
        else if (isInCart) {
            return ("El producto ya esta en el carrito")
        }
    }
    async updateProduct(productId, query) {
        try {
            const productToFind = await this.model.findById(productId);
            let { amount } = productToFind;
            if (!productToFind) {
                return ("Producto no encontrado");
            }
            else if (productToFind && query === "add") {
                await this.model.findByIdAndUpdate(productToFind._id,
                    { amount: amount + 1 },
                    { new: true }
                ).then((product) => {
                    return (`Se actualizo la cantidad en ${product.amount} del producto ${product.name}`)
                })
            }
            else if (productToFind && query === "del") {
                await this.model.findByIdAndUpdate(productToFind._id,
                    { amount: amount - 1 },
                    { new: true }
                ).then((product) => {
                    return (`Se actualizo la cantidad en ${product.amount} del producto ${product.name}`)
                })
            }
            else {
                return ("Ocurrio un error al intentar actualizar el producto en el carrito")
            }
        } catch (error) {
            throw new Error("No se pudo modificar el producto");
        }
    }
    async delete(productId) {
        try {
            const productInCart = await this.model.findById(productId);
            if (!productInCart) {
                return ("Producto no encontrado");
            }
            const productToFind = await productsMongo.findOne({ name: productInCart.name });
            console.log("productToFind", productToFind);
            let { _id, incart } = productToFind;
            await this.model.findByIdAndDelete(productId);
            await productsMongo.findByIdAndUpdate(_id,
                { incart: false },
                { new: true }
            ).then((product) => {
                return(`El producto ${product.name} fue eliminado del carrito`);
            })
        } catch (error) {
            throw new Error("No se pudo eliminar el producto");
        }
    }
}


module.exports = { CartManagerMongo }