import { Product } from "./Product";

export class Order{
    id!:string;
    supplier!:string;
    supplier_code!:string;
    products!: { name: any; quantity: any; }[];
    user!: string;
}