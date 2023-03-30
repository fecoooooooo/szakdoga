import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IdentityUser,
  Software,
  SoftwaresService,
  UsersService,
} from 'api-clients/api';

@Component({
  selector: 'app-edit-software',
  templateUrl: './edit-software.component.html',
  styleUrls: ['./edit-software.component.scss'],
})
export class EditSoftwareComponent {
  isCreate: boolean = false;
  softwerDataRecieved: boolean = false;

  softwareId: number | undefined;

  form: FormGroup;

  licenseControl: FormControl;
  nameControl: FormControl;
  descriptionControl: FormControl;
  priceControl: FormControl;
  productLinkControl: FormControl;
  userIdControl: FormControl;
  isActiveControl: FormControl;

  users: IdentityUser[] | null = null;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private softwaresService: SoftwaresService,
    private usersService: UsersService
  ) {
    this.form = this.formBuilder.group({
      licenseControl: (this.licenseControl = new FormControl(
        null,
        Validators.required
      )),
      nameControl: (this.nameControl = new FormControl(
        null,
        Validators.required
      )),
      descriptionControl: (this.descriptionControl = new FormControl(
        null,
        Validators.required
      )),
      priceControl: (this.priceControl = new FormControl(
        null,
        Validators.required
      )),
      productLinkControl: (this.productLinkControl = new FormControl(
        Validators.required
      )),
      userIdControl: (this.userIdControl = new FormControl(null)),
      isActiveControl: (this.isActiveControl = new FormControl(false)),
    });
  }

  ngOnInit(): void {
    let id: string | null = this.route.snapshot.paramMap.get('id');

    this.usersService.allUsersGet().subscribe((r) => {
      this.users = r;
    });

    this.isCreate = id === null;
    if (id !== null) {
      this.softwaresService.apiSoftwaresSingleIdGet(+id).subscribe((r) => {
        this.licenseControl.setValue(r.license);
        this.nameControl.setValue(r.name);
        this.descriptionControl.setValue(r.description);
        this.priceControl.setValue(r.price);
        this.productLinkControl.setValue(r.productLink);
        this.userIdControl.setValue(r.userId);
        this.isActiveControl.setValue(r.isActive);

        this.softwerDataRecieved = true;

        this.softwareId = +id!;
      });
    }
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      let software: Software = {
        license: this.licenseControl.value,
        name: this.nameControl.value,
        description: this.descriptionControl.value,
        price: this.priceControl.value,
        productLink: this.productLinkControl.value,
        userId: this.userIdControl.value,
        isActive: this.isActiveControl.value,
      };

      if (this.isCreate) {
        this.softwaresService
          .apiSoftwaresAddSoftwarePost(software)
          .subscribe((r) => {
            this.router.navigate([`/manage-softwares`]);
          });
      } else {
        software.id = this.softwareId;

        this.softwaresService
          .apiSoftwaresUpdateSoftwarePatch(software)
          .subscribe((r) => {
            this.router.navigate([`/manage-softwares`]);
          });
      }
    }
  }

  cancel() {
    this.router.navigate([`/manage-softwares`]);
  }
}
