import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RegisterPageComponent } from '../register-page/register-page.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  loginForm!: FormGroup
  isSubmitted = false;
  returnUrl = '';
  registerSuccess: boolean = false;

  constructor(private formBuilder:FormBuilder, private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private _dialog: MatDialog){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['', Validators.required]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

    this.userService.login({email: this.fc.email.value,
      password: this.fc.password.value}).subscribe(() =>{
        this.router.navigateByUrl(this.returnUrl);
      });
  }

  registerForm(){
    const dialofRef = this._dialog.open(RegisterPageComponent);
    dialofRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          alert("You have successfully registered!");
        }
      }
    });
  }
}
