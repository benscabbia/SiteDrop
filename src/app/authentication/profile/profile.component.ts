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

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {

    console.log('PRofile received');

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
      email: [this.email, []]
    }
    );
  }
}
