import { Http } from '@angular/http';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';

@Injectable()
export class GithubService {

  constructor(private http: Http, private af: AngularFire) {}

}
