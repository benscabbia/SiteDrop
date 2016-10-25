import { AuthService } from './auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): any {
    this.signupForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')
      ])],
      'password': ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      'confirmPassword': ['', Validators.compose([
        Validators.required,
        this.isEqualPassword.bind(this)
      ])]
    });
  }

  onSignup() {
    console.log(this.signupForm);
    this.authService.signupUser(this.signupForm.value);
  }

  isEqualPassword(control: FormControl): {[s: string]: boolean} {
    if (!this.signupForm) {
      return { passwordsNotMatch: true };
    }
    if (control.value !== this.signupForm.controls['password'].value) {
      return { passwordsNotMatch: true };
    }
  }

}
