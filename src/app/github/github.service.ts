import { GithubCreateProfile } from './github-create-profile.interface';
import { Observable } from 'rxjs/Rx';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GithubService {

  constructor(private http: Http) {}

  public createRepository(data: GithubCreateProfile): Observable<any> {

    let url = 'https://api.github.com/user/repos';
    let token = '4cfd3a331b83d7e3db77d494795961a7ab0716a2';
    let githubCreateProfile: GithubCreateProfile = data;

    let body = JSON.stringify(githubCreateProfile);
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'token ' + token});

    console.log('Attempting to create repository');
    console.log(body);
    return this.http.post(url, body, {headers: headers})
      .map((res) => res.json())
      .catch((error) => Observable.throw(error.json() || 'Server error'));
  }

}
