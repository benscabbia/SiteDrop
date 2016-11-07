import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        console.log('Through auth guard and the logged in status: ' + this.authService.isLoggedIn);
        return this.authService.isLoggedIn;
    }
}
