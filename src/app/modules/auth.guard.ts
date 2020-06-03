import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private storage: StorageService) {

    }

    // 路由守卫
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        //console.log(next,state)
        if (navigator.userAgent.indexOf('Mobile') >-1){
            window.location.href = 'https://www.baidu.com';
        }
        this.storage.sendMessage({message: 'sendMessage', goToURL: state.url});
        return true;
    }
}