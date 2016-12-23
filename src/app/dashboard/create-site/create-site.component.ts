import { Site } from './../site.interface';
import { SiteService } from './../site.service';
import { GithubService } from './../../github/github.service';
import { GithubCreateProfile } from './../../github/github-create-profile.interface';
import { AuthService } from './../../authentication/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.css']
})
export class CreateSiteComponent implements OnInit {

  createForm: FormGroup;
  name: string;
  description: string;
  url: string;
  userCache: any;
  username: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private githubService: GithubService, private siteService: SiteService) { }

  ngOnInit(): void {
    this.userCache = this.authService.getProfileFromMemory();
    this.username = this.userCache.github;
    console.log('Create Site Received');
    this.initForm();
  }

  private initForm(): void {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', []]
    }
    );
  }

  onSubmit() {
    console.log(this.createForm.value);
    this.createRepository();
  }

  createRepository() {
    let nameTemp = this.createForm.value['name'];
    let user: GithubCreateProfile = {
        name: nameTemp,
        description: this.createForm.value['description'],
        homepage: 'https://' + this.userCache.github + '.github.io/' + nameTemp,
        // Properties below not stored in database at the moment
        private: false,
        has_issues: false,
        has_wiki: false,
        has_downloads: false
      };
      if (this.isValid(user)) {
        let temp: Site = {
          userKey: this.userCache.$key,
          siteKey: '',
          siteName: user.name,
          siteDescription: user.description,
          siteUrl: user.homepage
        };

        console.log(temp);

        this.githubService.createRepository(user).subscribe(
          success => {
            console.log('Successfully created Repository...');
            this.siteService.addSite(temp);
          },
          error => console.log(error)
        );
      }
  }

  private isValid(user: GithubCreateProfile): boolean {
    if ((!user.name || user.name.length === 0 || !user.name.trim())) {
      console.log('Form is invalid');
      return false;
    }
    return true;
  }
}
