import { Schema, model } from 'mongoose';
import { Product } from './product.model';


export interface Supplier{
    id:string;
    name:string;
    code:string;
    products:Product[];
}


export const SupplierSchema = new Schema<Supplier>(
    {
        name: {type: String, required:true},
        code: {type: String, required:true},
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps:true
    }
);

export const SupplierModel = model<Supplier>('supplier', SupplierSchema);