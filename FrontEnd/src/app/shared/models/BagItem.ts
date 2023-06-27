import { Product } from "./Product";

export class BagItem{
    constructor(public product:Product){ }
    quantity:number = 1;
}