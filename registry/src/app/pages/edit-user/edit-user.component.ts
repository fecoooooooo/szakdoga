import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentityRole, UserRequest, UsersService } from 'api-clients/api';
import { CommonValidators } from 'src/app/shared/common-validators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent {
  isCreate: boolean = false;
  userDataRecieved: boolean = false;

  userId: string | undefined;

  form: FormGroup;

  userNameControl: FormControl;
  phoneControl: FormControl;
  emailControl: FormControl;
  roleControl: FormControl;
  passwordControl: FormControl;
  passwordAgainControl: FormControl;

  roles: IdentityRole[] | null = null;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) {
    this.form = this.formBuilder.group({
      userNameControl: (this.userNameControl = new FormControl(
        null,
        Validators.required
      )),
      phoneControl: (this.phoneControl = new FormControl(
        null,
        Validators.required
      )),
      emailControl: (this.emailControl = new FormControl(
        null,
        Validators.required
      )),
      roleControl: (this.roleControl = new FormControl(
        null,
        Validators.required
      )),
      passwordControl: (this.passwordControl = new FormControl(
        null,
        Validators.required
      )),
      passwordAgainControl: (this.passwordAgainControl = new FormControl(null, [
        Validators.required,
        CommonValidators.validatePasswordMatch(this.passwordControl),
      ])),
    });
  }

  ngOnInit(): void {
    let id: string | null = this.route.snapshot.paramMap.get('id');
    this.isCreate = id === null;

    this.usersService.apiUsersGetAllRolesGet().subscribe((r) => {
      this.roles = r;
      if (id !== null) {
        this.usersService.apiUsersSingleIdGet(id).subscribe((currentUser) => {
          if (currentUser.user !== undefined) {
            this.userNameControl.setValue(currentUser.user.userName);
            this.phoneControl.setValue(currentUser.user.phoneNumber);
            this.emailControl.setValue(currentUser.user.email);
            this.roleControl.setValue(currentUser.role);

            this.userDataRecieved = true;

            this.userId = id!;
          }
        });
      }
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      let user: UserRequest = {
        userName: this.userNameControl.value,
        phoneNumber: this.phoneControl.value,
        email: this.emailControl.value,
        role: this.roleControl.value,
        password: this.passwordControl.value,
      };

      if (this.isCreate) {
        this.usersService.apiUsersAddUserPost(user).subscribe((r) => {
          this.router.navigate([`/manage-users`]);
        });
      } else {
        this.usersService
          .apiUsersUpdateUserUserIdPatch(this.userId!, user)
          .subscribe((r) => {
            this.router.navigate([`/manage-users`]);
          });
      }
    }
  }

  cancel() {
    this.router.navigate([`/manage-users`]);
  }

  passwordKeyup() {
    this.passwordAgainControl.updateValueAndValidity();
    this.passwordAgainControl.markAsTouched();
  }

  passwordConfirmKeyup() {
    this.passwordControl.updateValueAndValidity();
    this.passwordControl.markAsTouched();
  }
}
