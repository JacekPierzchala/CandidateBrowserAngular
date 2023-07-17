import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { PasswordStrengthValidator } from 'src/app/validator/password-strength.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  type:string="password";
  signUpForm:FormGroup= new FormGroup({});

  constructor(private fb:FormBuilder,private auth:AuthserviceService, private router:Router) {

  }

  ngOnInit(): void {
    this.signUpForm=this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password:['',[Validators.required,PasswordStrengthValidator]],
      confirmPassword:['',[Validators.required, this.matchValues('password')]],
      lastname:['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      firstname:['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
    })

    this.signUpForm.controls['password'].valueChanges.subscribe({
      next:()=>this.signUpForm.controls['confirmPassword'].updateValueAndValidity()
    })

  }

  onRegister(){
    if(this.signUpForm.valid){
        this.auth.register(this.signUpForm.value).subscribe({
          next:(res)=>{
            alert(res.success)
            this.signUpForm.reset();
            this.router.navigate(['login'])
          },
          error:(err)=>{
            alert(err?.message)
          }
        })
    }
  }

  matchValues(matchTo:string):ValidatorFn{
    return (control:AbstractControl)=>{
      return control.value==control.parent?.get(matchTo)?.value? null:{notMatching:true}
    }
  }



}
