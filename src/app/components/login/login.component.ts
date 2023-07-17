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
    private router:Router,private toastr: ToastrService) 
{ 

  }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password:['',[Validators.required,PasswordStrengthValidator]]
    })
  }
  

  onLogin(){
    if(this.loginForm.valid){

      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
          this.loginForm.reset();
          this.auth.storeToken(res.token)
          this.toastr.success("Authorization succeeded")
          this.router.navigate(['candidates'])
        },
        error:(errorResponse)=>{
          // this.toastr.error({detail:"Error", summary:err, duration:5000})
          this.toastr.error('Authorization failed: ' + errorResponse?.error?.ErrorMessage)
          // console.log(errorResponse.error.ErrorMessage);
          
        }
      })
    }
    // else{
    //   this.validateAllFormFields(this.loginForm);
    // }
  }


}
