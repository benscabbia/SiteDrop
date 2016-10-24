import { User } from './user.interface';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs/Rx';


@Injectable() 
export class AuthService {
    constructor(private router: Router) { }

    signupUser(user: User){
        // todo
    }

    signinUser(user: User){
        // todo
    }

    logout(){
        // todo
    }

    isAuthenticated(): Observable<boolean>{
        // todo
        return;
    }
}
