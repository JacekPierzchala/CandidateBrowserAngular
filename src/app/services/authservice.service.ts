import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private baseUrl=environment.apiUrl;

  constructor(private http: HttpClient ) { }

  register(userObj:any){
    return this.http.post<any>(this.baseUrl + '/Auth/register',userObj);
  }

  login(loginObj:any){
      return this.http.post<any>(this.baseUrl + '/Auth/login',loginObj)
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
  }
  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');

  }
}
