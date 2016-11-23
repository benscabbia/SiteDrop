import { User } from './../user.interface';
import { AuthService } from './../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;

  id: string;
  name: string;
  email: string;
  user: User;
  github: string;
  token: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {

    console.log('Profile received');

    this.authService.getProfile()
    .subscribe(
      user => {
        console.log(user);
        this.user = user;
      },
      error => console.log(error),
    );

    this.initForm();
  }

  private initForm(): void {
    this.profileForm = this.formBuilder.group({
      id: [this.id, []],
      name: [this.name, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      email: [this.email, []],
      github: [this.github, Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])],
      token: [this.token, []],
    }
    );
  }

  public onUpdate(name: string, github: string, token: string) {
    this.user.name = name;
    this.user.github = github;
    this.user.token = token;
    this.authService.updateProfile(this.user).then(
      success => console.log('Successful update'),
      error => console.log('Error updating')
    );
  }
}
