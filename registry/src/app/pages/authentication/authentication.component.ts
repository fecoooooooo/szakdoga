import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  form: FormGroup;

  usernameControl: FormControl;
  passwordControl: FormControl;

  authSuccess: boolean | undefined;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
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
  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.router.navigate([`/manage-users`]);
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  login() {
    const userName = this.usernameControl.value;
    const password = this.passwordControl.value;

    this.authService.login(userName, password).then((loginResult: boolean) => {
      if (loginResult === true) {
        this.router.navigate(['/user-devices']);
        this.authSuccess = true;
      } else {
        this.authSuccess = false;
      }
    });
  }
}
