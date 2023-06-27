import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BagService } from 'src/app/services/bag.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/app/shared/models/Product';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {

  products: Product[] = []
  searchTerm = '';
  user!:User;
  constructor(private productService:ProductService, activatedRoute:ActivatedRoute, 
    private router:Router,private bagService: BagService,
    private userService:UserService) {
    let productsObservable: Observable<Product[]>;
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm){
        productsObservable = this.productService.getAllProductsBySearchTerm(params.searchTerm);
        this.searchTerm = params.searchTerm;
      }
      else{
        productsObservable = productService.getAll();
      }

      productsObservable.subscribe((serverProducts) => {
        this.products = serverProducts;
      })

      userService.userObservable.subscribe((newUser) =>{
        this.user = newUser;
      })
    })
    //productsObservable = productService.getAll();
  }

  search(term:string):void{
    if(term){
      this.router.navigateByUrl('/search/' + term);
    }
  }
  editClick(productId:string):void{
    //this.products = this.productService.getProductByid(productId);
    this.router.navigateByUrl('./edit-page.component.html');
  }

  addToBag(product: Product){
    this.bagService.addTobag(product);
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
    
  get isAuth(){
    return this.user.token;
  }
}
