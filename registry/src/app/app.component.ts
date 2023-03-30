import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  showSuccess() {
    this.toastr.success('Success message', 'Success!');
  }

  showError() {
    this.toastr.error('Error message', 'Error!');
  }

  logout() {
    this.authService.logout();
  }
}
