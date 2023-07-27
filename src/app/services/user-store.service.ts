import { Injectable } from '@angular/core';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
permisions:[]=[]
  constructor(private auth:AuthserviceService) { }

  getUserPermissions(){
    this.permisions=this.auth.getDecodedToken().Permission;
  }

  hasPermission(permision:string){
    this.getUserPermissions();
    return this.permisions.some(c=>c==permision)?true:false;
  }
}
