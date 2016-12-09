import { Site } from './site.interface';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';


@Injectable()
export class SiteService {

    constructor(private af: AngularFire) {}

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
}
