import { Injectable } from '@angular/core';
import { sample_products } from 'src/data';
import { Product } from '../shared/models/Product';
import { HttpClient } from '@angular/common/http';
import { PRODUCTS_BY_SEARCH_URL, PRODUCTS_URL, PRODUCT_BY_ID_URL, PRODUCT_EDIT_PAGE_URL, BASE_URL} from '../shared/constants/urls';
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

  addProduct(data: any): Observable<any> {
    const product = new Product();
    product.name = data.name;
    product.supplier = data.supplier;
    product.weight = data.weight;
    product.quantity = data.quantity;
    product.bagQuantity = 0;
    return this.http.post(PRODUCT_EDIT_PAGE_URL, product);
  }

  editProduct(id: any ,data: any): Observable<any> {
    return this.http.put(`http://localhost:8080/api/products/${id}`, data);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/products/${id}`);
  }

  getProductList(): Observable<any> {
    return this.http.get(PRODUCTS_URL);
  }

}
