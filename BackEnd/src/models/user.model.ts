import mongoose, { Schema, StringSchemaDefinition, model } from 'mongoose';

const bcrypt = require('bcryptjs');

export interface User{
    id:string;
    email:string;
    name:string;
    password:string;
    isAdmin:boolean;
    token:string;
    tokens:any;
}

export const UserSchema = new Schema<User>({
    name: {type: String, required:true },
    password: {type: String, required:true },
    email: {type: String, required:true, unique: true},
    isAdmin: {type: Boolean, required:true },
    token: { type: String, require: false},
    tokens: { id:{type:String , required: false},
        token:{type: String, required: false}}
},{
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});


export const UserModel = model<User>('user', UserSchema);