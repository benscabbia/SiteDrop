import { User } from './user.interface';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs/Rx';

declare var firebase: any;

@Injectable()
export class AuthService {
    constructor(private router: Router) { }

    public signupUser(user: User) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(
                success => {
                // set uid
                user['$key'] = success.uid;
                // create profile
                let profileData = Object.assign({}, user);
                let userKey = profileData['$key'];

                // post  profileData under: '/profiles/uid/profileData

                console.log(profileData);
                console.log(userKey);


                this.router.navigate(['/profile']);
                }
            )
            .catch(function (error) {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                // todo
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    public signinUser(user: User) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then( 
                success => {
                    this.router.navigate(['/dashboard'])
                }
            )
            .catch(function (error) {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                // todo
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    public logout() {
        this.router.navigate(['/login']);
        firebase.auth().signOut();
    }

    public isAuthenticated(): Observable<boolean> {

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
