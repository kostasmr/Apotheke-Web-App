import { Router } from 'express';
import { sample_products } from '../data';
import expressAsyncHandler from 'express-async-handler';
import { ProductModel } from '../models/product.model';
import auth from '../middlewares/auth'

const router = Router();


router.get("/seed", expressAsyncHandler(
    async (rew,res) => {
    const productsCount = await ProductModel.countDocuments();
    if(productsCount > 0){
        res.send("Seed is already done!");
        return;
    }
    await ProductModel.create(sample_products);
    res.send("Seed is done");
}));

router.get("/", auth, expressAsyncHandler(
    async (req,res) => {
        const products = await ProductModel.find();
        res.send(products);
    }
));

router.get("/search/:searchTerm", auth, expressAsyncHandler(
    async (req, res) =>{
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const products = await ProductModel.find({name: {$regex:searchRegex}})
        res.send(products)
    }
));

router.get("/:productId", auth, expressAsyncHandler(
    async (req, res) =>{
        const product = await ProductModel.findById(req.params.productId);
        res.send(product)
    }
));

router.delete("/:productId", auth, expressAsyncHandler(
    async (req, res) =>{
        await ProductModel.findByIdAndRemove(req.params.productId);
    }
));

router.post("/edit-page", auth, expressAsyncHandler(
    async(req, res) => {
        const product = req.body;
        await ProductModel.insertMany(product);
    }
));

router.put("/:productId", auth, expressAsyncHandler(
    async(req, res) => {
        const productDetails = req.body;
        const product = await ProductModel.findById(req.params.productId);
        await ProductModel.findByIdAndUpdate(req.params.productId,
        {
            name: productDetails.name,
            supplier: productDetails.supplier,
            weight: productDetails.weight,
            quantity: productDetails.quantity
        },
        {new: true});
    }
));

router.put("/", auth, expressAsyncHandler(
    async(req, res) => {
        const orderedProduct = req.body;
        let product = await ProductModel.findOne({name: orderedProduct.name});
        if(!product){
            res.status(404).send("Product not found.");
        } else {
            const newQuantity = product.quantity - orderedProduct.quantity;
            product = await ProductModel.findByIdAndUpdate(product.id,
            {
                quantity: newQuantity
            },
            {new: true});
        }
    }
));

export default router;