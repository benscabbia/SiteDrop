import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  // error: boolean = false;
  // errorMessage: String = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): any {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')
      ])],
      'password': ['', Validators.compose([
        Validators.required,
      ])]
    });
  }

  onLogin() {
    console.log(this.loginForm);
    this.authService.signinUser(this.loginForm.value);
  }

  // example-custom-validator
  isEmailValid(control: FormControl): { [s: string]: boolean } {
    if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      return { noEmail: true };
    }
  }

}
