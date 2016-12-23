import { User } from './user.interface';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { AngularFire, FirebaseObjectObservable, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {

    private user: any = null;
    private userProfile: User;
    item: FirebaseObjectObservable<any>;

    constructor(private router: Router, private http: Http, private af: AngularFire) {
        this.item = af.database.object('/profile');

        let self = this;
        this.af.auth.subscribe(user => {
            if (user) {
                self.user = user;
            } else {
                self.user = null;
            }
        });
    }

    public signupUser(user: User): void {
        this.af.auth.createUser({ email: user.email, password: user.password })
            .then(
            success => {
                // set uid
                user['key'] = success.uid;

                this.storeProfile(user);
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

    private storeProfile(userProfile: User): boolean {
        userProfile.token = '';
        // Create profile        
        let body = Object.assign({}, userProfile);
        let userKey = userProfile['key'];
        delete body['key'];
        console.log(body);

        const promise = this.af.database.object('/profiles/' + userKey).set(body);
        promise
            .then((success) => {
                console.log('PRofile created successfully');
                return true;
            })
            .catch((error) => console.log('error in creating profile'));
        return false;
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
                console.log('Authenticated');
                this.getProfile().subscribe(
                    profile => {
                        console.log(profile);
                        console.log('Profile Loaded on Signin, redirecting to Dashboard');
                        this.router.navigate(['/dashboard']);
                    },
                    error => console.log(error)
                );
            }
            )
            .catch(function (error) {
                // Handle Errors here.
                let errorCode = error;
                let errorMessage = error.message;
                // todo
                console.log('Error on getting profile from db');
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    public logout() {
        this.userProfile = null;
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

    public getProfile(): Observable<User> {
            return this.af.database.object('/profiles/' + this.user.uid)
            .map(
                profile => {
                    this.userProfile = <User>profile;
                    console.log('Profile Added to Memory');
                    return profile;
                },
                error => {
                    console.log(error);
                });
    }

    public getProfileFromMemory(): User {
        return this.userProfile;
    }

    public updateProfile(user: User): firebase.Promise<any> {
        this.userProfile = user;
        return this.af.database.object('/profiles/' + this.user.uid).update({ name: user.name, github: user.github, token: user.token});
    }

    public get userKey(): string{
        return this.user.key;
    }
}
