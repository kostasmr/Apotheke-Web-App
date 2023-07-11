import { Router } from 'express';
import { sample_suppliers } from '../data';
import expressAsyncHandler from 'express-async-handler';
import { SupplierModel } from '../models/supplier.model';
import auth from '../middlewares/auth'

const router = Router();

router.get("/seed", expressAsyncHandler(
    async (rew,res) => {
    const supplierCount = await SupplierModel.countDocuments();
    if(supplierCount > 0){
        res.send("Seed is already done!");
        return;
    }
    await SupplierModel.create(sample_suppliers);
    res.send("Seed is done");
}));

router.get("/", auth, expressAsyncHandler(
    async (rew,res) => {
        const supliers = await SupplierModel.find();
        res.send(supliers);
    }
));

router.get("/searchSupplier/:searchTerm", auth, expressAsyncHandler(
    async (req, res) =>{
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const supliers = await SupplierModel.find({name: {$regex:searchRegex}});
        res.send(supliers);
    }
));

router.get("/:supplierId", auth, expressAsyncHandler(
    async (req, res) =>{
        const supplier = await SupplierModel.findById(req.params.supplierId);
        res.send(supplier)
    }
));

export default router;
