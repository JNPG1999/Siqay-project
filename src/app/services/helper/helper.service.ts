import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  ItemMenu = new BehaviorSubject<string>('');

  constructor() { }

  EnviarItemMenu(item : string){
    console.log(item);
    this.ItemMenu.next(item);
  }

  RecibirItemMenu(){
    return this.ItemMenu.asObservable();
  }

}
