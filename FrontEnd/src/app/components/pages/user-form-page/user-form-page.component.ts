import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-user-form-page',
  templateUrl: './user-form-page.component.html',
  styleUrls: ['./user-form-page.component.css']
})

export class UserFormPageComponent implements OnInit{

  user!: User;
  prForm: FormGroup;

  constructor(private _fb: FormBuilder, private userService: UserService, private dialogRef: MatDialogRef<UserFormPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
    this.prForm = this._fb.group({
      name: '',
      email: '',
      password: '',
    })
  }
  hide=true;
  ngOnInit(): void {
    this.prForm.patchValue(this.data);
    throw new Error('Method not implemented.');
  }

  onFormSubmit(){
    if(this.prForm.valid){
      this.userService.editUser(this.data.id, this.prForm.value).subscribe({
        next: (val: any) => {
          alert("User edited!");
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        }
    })
    alert("User edited!");
    this.dialogRef.close(true);
    window.location.reload();
    }
  }
}
