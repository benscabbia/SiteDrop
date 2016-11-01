import { Validators } from '@angular/forms';
import { User } from './user.interface';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs/Rx';
import { Headers, Http, Response } from '@angular/http';

declare var firebase: any;

@Injectable()
export class AuthService {
    constructor(private router: Router, private http: Http) { }

    public signupUser(user: User): void {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(
            success => {

                //set uid
                user['key'] = success.uid;
                // let profileData = Object.assign({}, user);
                // let userKey = profileData['$key'];

                this.storeProfile(user).subscribe(
                    profile => console.log("Profile Created: " + profile),
                    error => console.log(error)
                );
                // post  profileData under: '/profiles/uid/profileData

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

    private storeProfile(userProfile: User): Observable<Response> {
        // create profile
        let body = JSON.stringify(userProfile);

        let headers = new Headers({'Content-Type':'application/JSON'});
        //let profileData = Object.assign({}, userProfile);
        let userKey = userProfile['key'];
        //let body = {"hello":"world"};
        console.log(body);
        //firebase.database().ref('profiles/' + userKey).set(body);
        return this.http.post('https://sitedrop-c39b3.firebaseio.com/profiles/' + userKey + '.json', body, headers)
        .map((data: Response) => data.json());        
        // console.log(profileData);
        // console.log(userKey);
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
