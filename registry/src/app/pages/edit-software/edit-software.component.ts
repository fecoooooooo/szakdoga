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
import { forkJoin } from 'rxjs';
import { CommonValidators } from 'src/app/shared/common-validators';

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
  inUseLicenses: string[] = [];

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
      productLinkControl: (this.productLinkControl = new FormControl(null)),
      userIdControl: (this.userIdControl = new FormControl(null)),
      isActiveControl: (this.isActiveControl = new FormControl(false)),
    });
  }

  ngOnInit(): void {
    let id: string | null = this.route.snapshot.paramMap.get('id');
    this.isCreate = id === null;

    forkJoin({
      users: this.usersService.allUsersGet(),
      softwares: this.softwaresService.apiSoftwaresAllSoftwaresGet(),
    }).subscribe((result) => {
      this.users = result.users;

      this.inUseLicenses = result.softwares
        .map((x) => x.license)
        .filter((x) => x != null) as string[];

      if (
        id !== null &&
        result.softwares.find((x) => x.id === +id!) !== undefined
      ) {
        let currentSoftware = result.softwares.find((x) => x.id === +id!);

        if (currentSoftware !== undefined) {
          this.licenseControl.setValue(currentSoftware.license);
          this.nameControl.setValue(currentSoftware.name);
          this.descriptionControl.setValue(currentSoftware.description);
          this.priceControl.setValue(currentSoftware.price);
          this.productLinkControl.setValue(currentSoftware.productLink);
          this.userIdControl.setValue(currentSoftware.userId);
          this.isActiveControl.setValue(currentSoftware.isActive);

          this.softwerDataRecieved = true;

          this.softwareId = +id!;

          this.licenseControl.addValidators(
            CommonValidators.inUseKeyValidator(
              this.inUseLicenses,
              currentSoftware.license
            )
          );
        }
      } else {
        this.licenseControl.addValidators(
          CommonValidators.inUseKeyValidator(this.inUseLicenses, null)
        );
      }
    });
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
          .subscribe((newId) => {
            this.softwaresService
              .apiSoftwaresAddHistoryEntryPost(
                +newId,
                this.userIdControl.value,
                this.userIdControl.value !== null
              )
              .subscribe((r) => {
                this.router.navigate([`/manage-softwares`]);
              });
          });
      } else {
        software.id = this.softwareId;

        this.softwaresService
          .apiSoftwaresUpdateSoftwarePatch(software)
          .subscribe((r) => {
            this.softwaresService
              .apiSoftwaresAddHistoryEntryPost(
                software.id,
                this.userIdControl.value,
                this.userIdControl.value !== null
              )
              .subscribe((r) => {
                this.router.navigate([`/manage-softwares`]);
              });
          });
      }
    }
  }

  cancel() {
    this.router.navigate([`/manage-softwares`]);
  }
}
