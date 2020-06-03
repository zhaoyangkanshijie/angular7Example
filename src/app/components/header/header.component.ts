import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CookieService } from 'ngx-cookie-service';
import { Subject, Subscription, Observable } from 'rxjs';
import { StorageService } from '../../services/storage.service';

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
  public subscription : Subscription;
  
  constructor( private cookieService: CookieService, private storage: StorageService ) { }

  ngOnInit() {
    this.name = this.cookieService.get( 'zhaoyangkanshijie' );
  }

  ngAfterViewInit() {
    this.subscription = this.storage.getMessage().subscribe(
      msg => {
        console.log(msg);
        // do else in this component
      });
    }

  public changeState() { 
    this.boxState = this.boxState == 'close' ? 'open' : 'close'; 
  }
}
