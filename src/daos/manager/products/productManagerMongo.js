class ProductManagerMongo {
    constructor(model) {
        this.model = model;
    };
    async getAll(){
        try {
            const products = await this.model.find();
            return products;
        } catch (error) {
            throw new Error("No se pudo obtener los productos");
        }
    };
    async getByName(name){
        try {
            const product = await this.model.findOne(name);
            return product;
        } catch (error) {
            throw new Error("No se pudo obtener los productos");
        }
    };
    async create(product){
        try {
            const newProduct = new this.model(product);
            const test=newProduct.save();
            return test;
        } catch (error) {
            throw new Error("No se pudo crear el producto");
        }
    }
    async modify(id, product){
        try {
            const modifiedProduct = await this.model.updateOne(id,product);
            return modifiedProduct;
        } catch (error) {
            throw new Error("No se pudo modificar el producto");
        }
    }
    async delete(id){
        try {
            const deletedProduct = await this.model.findByIdAndDelete(id);
            if(!deletedProduct){
                throw new Error("no se pudo eliminar el producto porque no existe");
            } else {
                return "producto eliminado"
            }
        } catch (error) {
            throw new Error("No se pudo eliminar el producto");
        }
    }
}
  

module.exports = {ProductManagerMongo}