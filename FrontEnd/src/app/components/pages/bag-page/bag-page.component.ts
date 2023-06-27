import { Component, OnInit } from '@angular/core';
import { BagService } from 'src/app/services/bag.service';
import { Bag } from 'src/app/shared/models/Bag';
import { BagItem } from 'src/app/shared/models/BagItem';

@Component({
  selector: 'app-bag-page',
  templateUrl: './bag-page.component.html',
  styleUrls: ['./bag-page.component.css']
})
export class BagPageComponent implements OnInit{
  bag!: Bag;

  constructor(private bagService: BagService){
    this.bagService.getBagObservable().subscribe((bag) =>{
      this.bag = bag;
    })
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  removeFromBag(bagitem:BagItem){
    this.bagService.removeFromBag(bagitem.product.id);
  }
}
