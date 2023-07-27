import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthserviceService } from 'src/app/services/authservice.service';
import { PasswordStrengthValidator } from 'src/app/validator/password-strength.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  constructor(private fb:FormBuilder, private auth:AuthserviceService,
    private router:Router,private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password:['',[Validators.required,PasswordStrengthValidator]]
    })
  }
  
  handleGoogleLogin(){
    let url:string=''
    this.auth.getGoogleAuthUrl().subscribe({
      next:response=>{
        url =response.data;
        window.location.href=url;
      }
      })

    }

  

  onLogin(){
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
          this.loginForm.reset();
          this.auth.storeToken(res)
          this.toastr.success("Authorization succeeded")
          this.router.navigate(['candidates'])
        },
        error:(errorResponse)=>{
          this.toastr.error('Authorization failed: ' + errorResponse?.error?.ErrorMessage)         
        }
      })
    }
  }


}
