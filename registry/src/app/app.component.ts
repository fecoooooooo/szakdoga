import { Component } from '@angular/core';
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

  clickNavItem(event: any) {
    const parent = event.currentTarget.parentNode;
    const children = parent.children;

    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove('active');
    }

    event.currentTarget.classList.add('active');
  }

  IsMenuItemVisible(roles: string[]) {
    const usertRole = this.authService.getRole();

    if (usertRole !== null && roles.includes(usertRole)) {
      return true;
    }

    return false;
  }
}
