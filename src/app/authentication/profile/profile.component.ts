import { User } from './../user.interface';
import { AuthService } from './../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  id: string = "a";
  name: string = "aqweqeqweqweq";
  email: string = "a";
  user: User = {
    key: "xxxxx",
    name: "ben",
    email: "test@gmail.com",
    password: "2222",
    confirmPassord: "sdad"
  };

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): any {

    console.log("PRofile received");
    this.authService.getProfile().subscribe(
      user => {
        console.log("user received!")
        console.log(user);
        this.user = user;
      },
      error => console.log("error occured"),
      () => {
        
      }
    );

        this.profileForm = this.formBuilder.group({
          'id': ['', []],
          'name': ['', Validators.compose([
            Validators.required,
            Validators.minLength(6)
          ])],
          'email': ['', []]
        }
        );

    // this.id = this.user.key;
    // this.name = this.user.name;
    // this.email = this.user.email;
  }

  // onSignup() {
  //   console.log(this.signupForm);
  //   this.authService.signupUser(this.signupForm.value);
  // }

}
