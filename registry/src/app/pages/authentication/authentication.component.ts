import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  form: FormGroup;

  usernameControl: FormControl;
  passwordControl: FormControl;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      usernameControl: (this.usernameControl = new FormControl(
        null,
        Validators.required
      )),
      passwordControl: (this.passwordControl = new FormControl(
        null,
        Validators.required
      )),
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  login() {
    this.authService.login();
  }
}
