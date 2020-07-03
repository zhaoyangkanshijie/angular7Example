import { Component, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { Subject, Subscription, Observable } from 'rxjs';
import axios from 'axios';

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

  public boxState: string = 'close';
  public account: string = '同学';
  public showMenu: boolean = false;
  public showMenuLoged: boolean = false;
  public loged: boolean = false;
  public showLogoutConfirmModal : boolean = false;
  public subscription: Subscription;
  public indexStyle: boolean = false;

  @ViewChild('login') login;
  @ViewChild('register') register;
  @ViewChild('findPassword') findPassword;
  
  constructor(public router: Router,public storage: StorageService ) { }

  ngOnInit() {
    // this.cookieService.delete( 'tp-link' );
    // this.name = this.cookieService.get( 'tp-link' );
    // 判断使用哪个menu，jwt，name
    this.authorization();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
  
  ngAfterViewInit() {
    this.subscription = this.storage.getMessage().subscribe(
      msg => {
        if(msg.message === 'errorLogout'){
          localStorage.removeItem('authJWT');
          localStorage.removeItem('campusAccount');
          localStorage.removeItem('userId');
          this.showMenu = false;
          this.showMenuLoged = false;
          this.loged = false;
          this.account = '同学';
          if(msg.link != undefined || msg.link != null){
            this.router.navigate([msg.link]);
          }
          this.login.canSeeloginModal = true;
        }
        else if(msg.message === 'changeHeaderStyle'){
          //console.log(msg.goToURL);
          if(msg.goToURL === '/' || msg.goToURL === '/index'){
            this.indexStyle = true;
          }
          else{
            this.indexStyle = false;
          }
        }
      });
  }

  authorization(): void {
    if(!localStorage.getItem('authJWT')){
      localStorage.removeItem('campusAccount');
      localStorage.removeItem('userId');
      this.showMenu = false;
      this.showMenuLoged = false;
      this.loged = false;
    }
    else{
      this.account = localStorage.getItem('campusAccount');
      this.loged = true;
    }
  }

  toggleMenu(): void {
    if(this.loged){
      this.showMenuLoged = !this.showMenuLoged;
    }
    else{
      this.showMenu = !this.showMenu;
    }
  }

  toggleShowMenu(): void {
    if(this.loged){
      this.showMenu = false;
      this.showMenuLoged = true;
    }
    else{
      this.showMenu = true;
      this.showMenuLoged = false;
    }
  }

  hideMenu(): void {
    this.showMenu = false;
    this.showMenuLoged = false;
  }

  jump(where: string): void {
    if(where == "login"){
      this.login.canSeeloginModal = true;
      this.register.canSeeRegisterModal = false;
      this.findPassword.canSeeFindPasswordModal = false;
    }
    else if(where == "register"){
      this.login.canSeeloginModal = false;
      this.register.canSeeRegisterModal = true;
      this.findPassword.canSeeFindPasswordModal = false;
    }
    else if(where == "findPassword"){
      this.login.canSeeloginModal = false;
      this.register.canSeeRegisterModal = false;
      this.findPassword.canSeeFindPasswordModal = true;
    }
    else{
      this.login.canSeeloginModal = false;
      this.register.canSeeRegisterModal = false;
      this.findPassword.canSeeFindPasswordModal = false;
    }
  }

  changeAccount(): void {
    this.account = localStorage.getItem('campusAccount');
    this.loged = true;
  }

  logoutConfirm(): void {
    this.showLogoutConfirmModal = true;
  }

  errorLogout(): void {
    console.log('tag', '')
  }

  logout(): void {
    this.showLogoutConfirmModal = false;
    let params = {
      'tel': this.account
    }
    let config = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': localStorage.getItem("authJWT")
      }
    };
    axios.post('/api/v1/account/signout',params,config)
    .then(response => {
      if(response.data.errorCode == 0){
        localStorage.removeItem('authJWT');
        localStorage.removeItem('campusAccount');
        localStorage.removeItem('userId');
        this.showMenu = false;
        this.showMenuLoged = false;
        this.loged = false;
        this.account = '同学';
      }
      else{
        console.log(response)
        localStorage.removeItem('authJWT');
        localStorage.removeItem('campusAccount');
        localStorage.removeItem('userId');
        this.showMenu = false;
        this.showMenuLoged = false;
        this.loged = false;
        this.account = '同学';
      }
      this.router.navigate(['/index']);
    })
    .catch(response => {
      console.log(response)
      localStorage.removeItem('authJWT');
      localStorage.removeItem('campusAccount');
      localStorage.removeItem('userId');
      this.showMenu = false;
      this.showMenuLoged = false;
      this.loged = false;
      this.account = '同学';
    });
  }

  public changeState(): void { 
    this.boxState = this.boxState == 'close' ? 'open' : 'close'; 
  }


}
