import { Component, OnInit } from '@angular/core';
import { BagService } from 'src/app/services/bag.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Bag } from 'src/app/shared/models/Bag';
import { BagItem } from 'src/app/shared/models/BagItem';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-bag-page',
  templateUrl: './bag-page.component.html',
  styleUrls: ['./bag-page.component.css']
})
export class BagPageComponent implements OnInit{
  bag!: Bag;
  user!: User;

  constructor(private bagService: BagService, 
    private orderService: OrderService,
    private userService: UserService){
    this.bagService.getBagObservable().subscribe((bag) =>{
      this.bag = bag;
    })

    userService.userObservable.subscribe((newUser) =>{
      this.user = newUser;
    })
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  sendTheOrder(){
    this.orderService.addOrder(this.user.email,this.bag).subscribe({
      next: (val: any) => {
        alert("Order done");
      },
      error: (err: any) => {
        console.error(err);
      }
    })
    this.bagService.clearBag();
    alert("Order done!");
    window.location.reload();
  }

  

  removeFromBag(bagitem:BagItem){
    this.bagService.removeFromBag(bagitem.product.id);
  }
}
