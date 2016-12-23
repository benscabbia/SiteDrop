import { AuthService } from './../authentication/auth.service';
import { Observable } from 'rxjs/Rx';
import { Site } from './site.interface';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';


@Injectable()
export class SiteService {

    constructor(private af: AngularFire, private authService: AuthService) {}

    public addSite(site: Site): void {
        let body = Object.assign({}, site);
        console.log(body);
        this.af.database.list('sites/' + site.userKey + '/').push(body)
            .then(success => {
                console.log('Site created successfully');
            })
            .catch(error => {
                console.log('Error in adding your site');
                console.log(error);
            });
    }

    public getSites(): Observable<Site[]> {
        
        console.log('IN GETSITES() method');
        let pro = this.authService.getProfileFromMemory();
        let ke = this.authService.userKey;
        // console.log(this.authService.userKey);
        // console.log(pro);
        // console.log(ke);
        return this.af.database.list('sites/' + 'S9mLmYSXTJM5Ppek7TkIvmXQUAA2')//this.authService.userProfileCached.key)
            .map(response => <Site[]>response)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(error => Observable.throw(error.json().error || 'Server error'));            
    }
}
