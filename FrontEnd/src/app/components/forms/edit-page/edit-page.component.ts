import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/Product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})

export class EditPageComponent implements OnInit{

  product!: Product;
  prForm: FormGroup;

  constructor(private _fb: FormBuilder, private productService: ProductService, private dialogRef: MatDialogRef<EditPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
    this.prForm = this._fb.group({
      name: '',
      supplier: '',
      weight: '',
      quantity: '',
    })
  }

  onFormSubmit(){
    if(this.prForm.valid){
      if(this.data){
        this.productService.editProduct(this.data.id, this.prForm.value).subscribe({
          next: (val: any) => {
            alert("Product edited!");
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
        alert("Product edited!");
        this.dialogRef.close(true);
        window.location.reload();
      }
      else{
        this.productService.addProduct(this.prForm.value).subscribe({
          next: (val: any) => {
            alert("Product added!");
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
        alert("Product added!");
        this.dialogRef.close(true);
        window.location.reload();
      }
    }
  }
  

  ngOnInit(): void {
    this.prForm.patchValue(this.data);
  }


}
