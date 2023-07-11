import { Product } from "./Product";

export class Supplier{
    id!:string;
    name!:string;
    code!:string;
    products!: Product[];
}