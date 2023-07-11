import { Router } from 'express';
import { sample_products } from '../data';
import expressAsyncHandler from 'express-async-handler';
import { ProductModel } from '../models/product.model';
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

router.get("/", expressAsyncHandler(
    async (rew,res) => {
        const products = await ProductModel.find();
        res.send(products);
    }
));

router.get("/search/:searchTerm", expressAsyncHandler(
    async (req, res) =>{
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const products = await ProductModel.find({name: {$regex:searchRegex}})
        res.send(products)
    }
));

router.get("/:productId", expressAsyncHandler(
    async (req, res) =>{
        const product = await ProductModel.findById(req.params.productId);
        res.send(product)
    }
));

export default router;