import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { User } from 'src/app/shared/models/User';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{

  user!: User;
  userForm: FormGroup;

  constructor(private _fb: FormBuilder, private userService: UserService, private dialogRef: MatDialogRef<RegisterPageComponent>){
    this.userForm = this._fb.group({
      name: '',
      email: '',
      password: '',
      conf_password: '',
      isAdmin: '',
    },{
      validators: PasswordsMatchValidator('password','conf_password')
    })
  }
  hide=true;
  hide2=true;
  hide3=true;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onFormSubmit(){
    if(this.userForm.valid){
      const fv= this.userForm.value;
      console.log(fv.isAdmin);
      let adminUser = false;
      if(fv.isAdmin === '12'){
        adminUser = true;
      }
      const user :IUserRegister = {
        name: fv.name,
        email: fv.email,
        password: fv.password,
        confirmPassword: fv.confirmPassword,
        isAdmin: adminUser
      };
      
      this.userService.addUser(user).subscribe({
        next: (val: any) => {
          alert("User added!");
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        }
    })
    this.dialogRef.close(true);
    window.location.reload();
    }
  }

}
