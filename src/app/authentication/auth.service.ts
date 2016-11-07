import { User } from './user.interface';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs/Rx';
import { Headers, Http, Response } from '@angular/http';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {

    private user: any = null;

    constructor(private router: Router, private http: Http, private af: AngularFire) {

        let self = this;
        this.af.auth.subscribe(user => {
            if (user){
                self.user = user;
            }   
            else {
                self.user = null;
            }
        });
    }

    public signupUser(user: User): void {
        this.af.auth.createUser({ email: user.email, password: user.password })
            //firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(
            success => {

                //set uid
                user['key'] = success.uid;
                // let profileData = Object.assign({}, user);
                // let userKey = profileData['$key'];

                this.storeProfile(user).subscribe(
                    profile => console.log('Profile Created: ' + profile),
                    error => console.log(error)
                );
                // post  profileData under: '/profiles/uid/profileData

                this.router.navigate(['/profile']);
            }
            )
            .catch(function (error) {
                // Handle Errors here.
                let errorCode = error;
                let errorMessage = error.message;
                // todo
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    private storeProfile(userProfile: User): Observable<Response> {
        // create profile
        let body = JSON.stringify(userProfile);

        let headers = new Headers({ 'Content-Type': 'application/JSON' });
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
        this.af.auth.login({
            email: user.email,
            password: user.password
        },
            {
                provider: AuthProviders.Password,
                method: AuthMethods.Password
            }

        )
            .then(
            success => {
                console.log('Authetnicated maybe');
                this.router.navigate(['/dashboard']);
            }
            )
            .catch(function (error) {
                // Handle Errors here.
                let errorCode = error;
                let errorMessage = error.message;
                // todo
                console.log('ERROR SIGNING USER IN');
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    public logout() {
        this.router.navigate(['/login']);
        this.af.auth.logout();
    }

    public isAuthenticated(): Observable<boolean> {

        const subject = new Subject<boolean>();

        this.af.auth.subscribe(
            (auth) => {
                if (auth) {
                    subject.next(true);
                } else {
                    subject.next(false);
                }
            }
        );
        return subject.asObservable();
    }

    public get isLoggedIn() {
        return (this.user) ? true : false;
    }
}
