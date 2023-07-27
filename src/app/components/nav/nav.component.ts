import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public authService:AuthserviceService,private router:Router, 
    public userStore:UserStoreService) {
      
     }

  ngOnInit(): void {
  }
  
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('login')
  }
}
