import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-external-auth',
  templateUrl: './external-auth.component.html',
  styleUrls: ['./external-auth.component.css']
})
export class ExternalAuthComponent implements OnInit  {
  constructor(private spinner: NgxSpinnerService, private authService:AuthserviceService,
    private router: Router,private toastr: ToastrService) {}

  ngOnInit() {
    this.spinner.show();
    this.authService.loginWithGoogle(this.router.url).subscribe({
      next:(resp)=>{
        this.authService.storeToken(resp)
        this.toastr.success("Authorization succeeded")
        this.router.navigate(['candidates'])      
      },
      error:(errorResponse)=>{
        this.toastr.error('Authorization failed: ' + errorResponse?.error?.ErrorMessage)         
      }
      
    }
    )

  }
  
}
