const {productDao} = require("../daos/factory");


class ProductService{
    static async getProducts(){
        return await productDao.getAll();
    };
    static async getProductByName(name){
        return await productDao.getByName(name);
    };
    static async createProduct({product}){
        return await productDao.create(product);
    };
    static async modifyProduct(args){
        const _id= args._id;
        const newProduct=args.product;
        return await productDao.modify({_id}, newProduct);
    };
     static async deleteProduct({id}){
        return await productDao.delete(id);
    };

};

module.exports = {ProductService};