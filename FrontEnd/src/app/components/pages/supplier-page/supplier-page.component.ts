import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SupplierService } from 'src/app/services/supplier.service';
import { UserService } from 'src/app/services/user.service';
import { Supplier } from 'src/app/shared/models/Supplier';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-supplier-page',
  templateUrl: './supplier-page.component.html',
  styleUrls: ['./supplier-page.component.css']
})
export class SupplierPageComponent implements OnInit{
  suppliers: Supplier[] = []
  searchTerm = '';
  user!:User;

  constructor(private supplierService: SupplierService, 
    private userService: UserService,
    activatedRoute:ActivatedRoute,
    private router:Router){
    let supplierObservable: Observable<Supplier[]>;
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm){

        supplierObservable = this.supplierService.getAllSuppliersBySearchTerm(params.searchTerm);
        this.searchTerm = params.searchTerm;
      }
      else{
        supplierObservable = supplierService.getAll();
      }
      
      supplierObservable.subscribe((serverSuppliers) => {
        this.suppliers = serverSuppliers;
      })

      userService.userObservable.subscribe((newUser) =>{
        this.user = newUser;
      })
    })
  }
  openAddEditPrForm() {
  }

  get isAdmin(){
    return this.user.isAdmin;
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  search(term:string):void{
    if(term){
      this.router.navigateByUrl('/searchSupplier/' + term);
    }
    else{
      this.router.navigateByUrl('/supplier-page');
    }
  }
}
