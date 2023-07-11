import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from '../shared/models/Supplier';
import { Observable } from 'rxjs';
import { SUPPLIER_BY_ID_URL, SUPPLIER_BY_SEARCH_URL, SUPPLIER_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Supplier[]>{
    return this.http.get<Supplier[]>(SUPPLIER_URL);
  }

  getSupplierByid(supplierId:string):Observable<Supplier>{
    return this.http.get<Supplier>(SUPPLIER_BY_ID_URL + supplierId);
  }

  getAllSuppliersBySearchTerm(searchTerm: string) {
    return this.http.get<Supplier[]>(SUPPLIER_BY_SEARCH_URL + searchTerm);
  }
}
