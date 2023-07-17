import { Schema, model } from 'mongoose';

export interface Order{
    id:string;
    supplier:string;
    supplier_code:string;
    products:any;
    user: string;
}

export const OrderSchema = new Schema<Order>(
    {
        supplier: {type: String, required:false},
        supplier_code: {type: String, required:false},
        products: [{
            name:{type:String , required: true},
            quantity:{type: Number , required: true}
        }],
        user: {type: String, required:true},
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

export const OrderModel = model<Order>('order', OrderSchema);