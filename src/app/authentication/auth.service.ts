import { User } from './user.interface';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs/Rx';

declare var firebase: any;

@Injectable()
export class AuthService {
    constructor(private router: Router) { }

    signupUser(user: User) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // todo
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    signinUser(user: User) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // todo
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    logout() {
        // todo
        firebase.auth().signOut()
            .then(function () {
                // Sign-out successful.
                // todo
            }, function (error) {
                // An error happened.
                // todo
            });
            this.router.navigate(['/login']);
    }

    isAuthenticated(): Observable<boolean> {

        const subject = new Subject<boolean>();

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                subject.next(true); 
            } else {
                subject.next(false);                 
            }
        });

        return subject.asObservable();
    }
}
