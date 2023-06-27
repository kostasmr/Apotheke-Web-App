import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})

export class EditPageComponent implements OnInit{

  product!: Product;
  constructor(activatedRoute:ActivatedRoute, productService:ProductService){
    activatedRoute.params.subscribe((params) => {
        this.product = params.product
    })
  }
  

  ngOnInit(): void {
  }


}
