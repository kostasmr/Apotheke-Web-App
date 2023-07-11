import { Schema, model } from 'mongoose';

export interface Product{
    id:string;
    name:string;
    supplier:string;
    weight:number;
    quantity: number;
    bagQuantity: number; 
}

export const ProductSchema = new Schema<Product>(
    {
        name: {type: String, required:true},
        supplier: {type: String, required:true},
        weight: {type: Number, required:true},
        quantity: {type: Number, required:true},
        bagQuantity: {type: Number, required:true},
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

export const ProductModel = model<Product>('product', ProductSchema);