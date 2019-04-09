import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('menu', [
    state('close', style({
      height: '0'
    })),
    state('open', style({
      height: '200px'
    })),
    transition('close => open', animate('100ms')),
    transition('open => close', animate('100ms'))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  public boxState: String = 'close';
  public name: String = '';
  
  constructor( private cookieService: CookieService ) { }

  ngOnInit() {
    this.name = this.cookieService.get( 'tp-link' );;
  }

  public changeState() { 
    this.boxState = this.boxState == 'close' ? 'open' : 'close'; 
  }
}
