import { Site } from './site.interface';
import { AngularFire } from 'angularfire2';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class SiteService {

    constructor(private http: Http, private af: AngularFire) {}

    public addSite(site: Site): boolean {
        site.userKey = 'S9mLmYSXTJM5Ppek7TkIvmXQUAA2';
        // site.siteKey;

        site.siteName = 'My site';
        site.siteDescription = 'this is description text';
        site.siteUrl = 'https://example.com';

        let body = Object.assign({}, site);
        console.log(body);

        this.af.database.object('sites/' + site.userKey + '/').set(body)
            .then(success => {
                console.log('Site created successfully');
                return true;
            })
            .catch(error => {
                console.log('Error in adding your site');
                return false;
            });
        return false;
    }
}
