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
  username: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private githubService: GithubService) { }

  ngOnInit(): void {
    this.username = this.authService.userProfileCached.github;
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
    let user: GithubCreateProfile = {
        name: this.createForm.value['name'],
        description: this.createForm.value['description'],
        homepage: '',
        private: false,
        has_issues: false,
        has_wiki: false,
        has_downloads: false
      };
      if (this.isValid(user)) {
        this.githubService.createRepository(user).subscribe(
          success => 'Successfully created Repository...',
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
