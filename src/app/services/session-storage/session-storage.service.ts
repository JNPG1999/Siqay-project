import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  isBrowser: boolean = isPlatformBrowser(inject(PLATFORM_ID))

  constructor() { }

  validateTokken(): boolean {
    if(this.isBrowser){
      var token=localStorage.getItem('TokenSiqay');
      return (token==undefined || token==null)?false:true;
    }else{
      return false;
    }
  }
  GetToken():string|null{
    if(this.isBrowser){
      var token=localStorage.getItem('TokenSiqay');
      if(token==undefined || token==null) return null;
      return atob(token)
    }
    return null;
  }
  SetToken(token: string):void{
    if(this.isBrowser){
      localStorage.setItem('TokenSiqay',btoa(token));
    }
  }

  
}
