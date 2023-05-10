const {ProductService} = require("../services/product.service");
const logger=require("../logger");
const {buildSchema} = require("graphql");
const {graphqlHTTP} = require("express-graphql");

const schemaGraphql = buildSchema(`
    type Product{
        _id:String,
        name: String,
        description: String,
        code:Int,
        url: String,
        price: Int,
        stock: Int,
        incart:Boolean
    }
    input ProductInput{
        name: String,
        description: String,
        code:Int,
        url: String,
        price: Int,
        stock: Int,
    }
    type Query{
        getProducts: [Product],
        getProductByName(name:String): Product
    }
    type Mutation{
        modifyProduct(
            _id:String
            product: ProductInput
            ): Product
        createProduct(product:ProductInput): Product
        
        deleteProduct(id:String): String
    }
`);

const graphqlController = ()=>{
    return graphqlHTTP({
        schema:schemaGraphql,
        rootValue:ProductService,
        graphiql:true
    })
};

module.exports = {graphqlController}
// const productController = async(req,res)=>{
//     try {
//         const products = await ProductService.getProducts();
//         res.json({status:"success",data:products});
//     } catch (error) {
//         logger.error(error.message)
//         res.json({status:"error",message:error.message});
//     }
// };
// const productByNameController = async(req,res)=>{
//     try {
//         console.log("req", req.body);
//         const product = await ProductService.getProductByName(req.body);
//         res.json({status:"success",data:product});
//     } catch (error) {
//         logger.error(error.message)
//         res.json({status:"error",message:error.message});
//     }
// };

// const createProductController = async(req,res)=>{
//     try {
//         const newProduct = await ProductService.createProduct(req.body);
//         res.json({status:"success",data:newProduct});
//     } catch (error) {
//         logger.error(error.message)
//         res.json({status:"error",message:error.message});
//     }
// };
// const editProductController = async(req,res)=>{
//     try {
//         const editedProduct = await ProductService.modifyProduct(req.params, req.body);
//         res.json({status:"Producto modificado con exito",data:editedProduct});
//     } catch (error) {
//         logger.error(error.message)
//         res.json({status:"error",message:error.message});
//     }
// };
// const deleteProductController = async(req,res)=>{
//     try {
//         const deletedProduct = await ProductService.deleteProduct(req.params);
//         res.json({status:"Producto eliminado con exito",data:deletedProduct});
//     } catch (error) {
//         logger.error(error.message)
//         res.json({status:"error",message:error.message});
//     }
// };

// module.exports = { editProductController}