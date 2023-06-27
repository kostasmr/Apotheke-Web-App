import { Injectable } from '@angular/core';
import { sample_products } from 'src/data';
import { Product } from '../shared/models/Product';
import { HttpClient } from '@angular/common/http';
import { PRODUCTS_BY_SEARCH_URL, PRODUCTS_URL, PRODUCT_BY_ID_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>(PRODUCTS_URL);
  }

  getAllProductsBySearchTerm(searchTerm: string) {
    return this.http.get<Product[]>(PRODUCTS_BY_SEARCH_URL + searchTerm);
  }

  getProductByid(productId:string):Observable<Product>{
    return this.http.get<Product>(PRODUCT_BY_ID_URL + productId);
  }

  changeProductQuantity(product:Product, flag:string){
    if(flag === "addToBag"){
      product.quantity = product.quantity - 1;
      product.bagQuantity = product.bagQuantity + 1;
    }
    else{
      product.quantity = product.quantity + product.bagQuantity;
      product.bagQuantity = 0;
    }

  }

}
