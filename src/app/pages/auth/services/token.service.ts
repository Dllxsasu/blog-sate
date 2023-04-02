import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  tokenKey="jwtToken";
  constructor() { }

  getToken(){
    return localStorage.getItem(this.tokenKey);
  }
  removeToken(){
     localStorage.removeItem(this.tokenKey);
  }
  setToken(token:string){
    localStorage.setItem(this.tokenKey, token);
  }
}
