import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenApiModel } from '../models/token-api.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Location } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private baseUrl=environment.apiUrl;
  private googleSignIn='signin-google'
  private hostUrl='';

  constructor(private http: HttpClient, private location:Location,
    @Inject(DOCUMENT) private document: any) {
   this.hostUrl = this.document.location.protocol+'//'+  this.document.location.host;
   }

  register(userObj:any){
    return this.http.post<any>(this.baseUrl + '/Auth/register',userObj);
  }

  login(loginObj:any){
      return this.http.post<any>(this.baseUrl + '/Auth/login',loginObj)
  }


  getGoogleAuthUrl(){
    let params = new HttpParams();
    params= params.append('redirectUrl' ,this.hostUrl + '/' + this.googleSignIn)
    return this.http.get<any>(this.baseUrl + '/Auth/getGoogleRedirectUrl',{ observe: 'response', params }) .pipe(
      map((response: { body: any; })=>{
        return response.body
      })
    )
  }

  loginWithGoogle(code:string){
    let authCode=this.getGoogleCode(code);
    let headers=new HttpHeaders().set('authCode',authCode)
    let params = new HttpParams().set('redirectUrl' ,this.hostUrl + '/' + this.googleSignIn);
    return this.http.post<any>(this.baseUrl + '/Auth/login-google',null,{headers:headers,params:params})
  }

  storeToken(tokenResponse:any){
    localStorage.setItem('token',tokenResponse.token);
    localStorage.setItem('refreshToken',tokenResponse.refreshToken);
  }
  getToken(){
    return localStorage.getItem('token');
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  renewToken(tokenApi:TokenApiModel){
    return this.http.post<any>(this.baseUrl + '/Token/refresh',tokenApi);
  }

  getDecodedToken(){
    const jwtHelper= new JwtHelperService();
    const token=this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getGoogleCode(code:string){
    code=decodeURIComponent(code);
    let startIndex = code.indexOf("code=") + "code=".length;
    let endIndex = code.indexOf("scope=") - "scope=".length - code.indexOf("code=") + 1;
    let extractedCode = code.substring(startIndex,startIndex+endIndex);
    return extractedCode;
  }
}
