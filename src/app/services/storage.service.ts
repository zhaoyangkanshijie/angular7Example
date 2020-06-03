import { Injectable } from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private subject = new Subject<any>();
  
  sendMessage(message){
    this.subject.next({message:message});
  }

  clearMessage(){
    this.subject.next();
  }

  getMessage():Observable<any> {
    return this.subject.asObservable();
  }

  constructor(){}

}
