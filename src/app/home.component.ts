import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {trigger, state, transition, style, animate} from '@angular/animations';
import axios from 'axios';
import { routerTransition } from './router.animations';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routerTransition]
})
export class Home implements OnInit{
  title = 'campus';

  public value: String = "a";
  public pageState: String = 'close';

  constructor( private cookieService: CookieService ) { }

  ngOnInit() {
    // axios.get('/api/values')
    // .then((response) => {
    //   this.value = response.data[0];
    // })
    // .catch((error) => {
    //   console.log(error)
    // });
    // this.cookieService.set( 'zhaoyangkanshijie', 'zhaoyangkanshijie', 24*60*60 );
  }

  accept(msg:string){
    console.log(msg)
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
