import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bag } from '../shared/models/Bag';
import { Product } from '../shared/models/Product';
import { BagItem } from '../shared/models/BagItem';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class BagService {
  
  private bag:Bag = this.getBagFromLocalStorage();
  private bagSubject: BehaviorSubject<Bag> = new BehaviorSubject(this.bag);
  constructor(private productService: ProductService) { }

  addTobag(product:Product):void{
    let bagItem = this.bag.items.find(item => item.product.id === product.id);
    if(bagItem?.product.quantity === 0){
      return;
    }
    this.productService.changeProductQuantity(product,"addToBag");
    this.bag.totalBagQuantity = this.bag.totalBagQuantity + 1;
    if(bagItem){
      return;
    }
    this.bag.items.push(new BagItem(product));
    
    this.setbagToLocalStorage();
  }

  removeFromBag(productId: string):void{
    this.bag.items = this.bag.items.filter(item => item.product.id != productId);
    //this.bag.totalBagQuantity = this.bag.totalBagQuantity - this.productService.getProductByid(productId);
    //this.productService.changeProductQuantity(this.productService.getProductByid(productId),"");
    this.setbagToLocalStorage();
  }

  changeQuantity(productId:string, quantity:number){
    let bagItem = this.bag.items.find(item => item.product.id === productId);
    if(!bagItem){
      return;
    }

    bagItem.quantity = quantity;
    this.setbagToLocalStorage();
  }

  clearBag(){
    this.bag = new Bag();
    this.setbagToLocalStorage();
  }

  getBagObservable(): Observable<Bag>{
    return this.bagSubject.asObservable();
  }

  getTotalBagQuantity(): number{
    return this.bag.totalBagQuantity;
  }

  private setbagToLocalStorage():void{
    this.bag.totalCount = this.bag.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const bagJson = JSON.stringify(this.bag);
    localStorage.setItem('Bag', bagJson);
    this.bagSubject.next(this.bag);
  }

  private getBagFromLocalStorage():Bag{
    const bagJson = localStorage.getItem('Bag');
    return bagJson? JSON.parse(bagJson): new Bag();
  }
}
