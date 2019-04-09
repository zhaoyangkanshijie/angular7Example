import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class Home implements OnInit{
  title = 'campus';

  public value: String = "a";
  public boxState: String = 'close';

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
}
