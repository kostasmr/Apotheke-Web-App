import { Component, OnInit } from '@angular/core';
import { BagService } from 'src/app/services/bag.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  bagQuantity=0;
  constructor(bagService: BagService){ 
    bagService.getBagObservable().subscribe((newBag) =>{
      this.bagQuantity = newBag.totalCount;
    })
  } 

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
