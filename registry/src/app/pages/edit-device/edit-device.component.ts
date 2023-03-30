import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DevicesService, IdentityUser, UsersService } from 'api-clients/api';
import { Device } from 'api-clients/api/model/device';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.scss'],
})
export class EditDeviceComponent implements OnInit {
  isCreate: boolean = false;
  deviceDataRecieved: boolean = false;

  deviceId: number | undefined;

  form: FormGroup;

  serialControl: FormControl;
  nameControl: FormControl;
  descriptionControl: FormControl;
  priceControl: FormControl;
  linkControl: FormControl;
  userIdControl: FormControl;
  isActiveControl: FormControl;

  users: IdentityUser[] | null = null;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private devicesService: DevicesService,
    private usersService: UsersService
  ) {
    this.form = this.formBuilder.group({
      serialControl: (this.serialControl = new FormControl(
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
      linkControl: (this.linkControl = new FormControl(null)),
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
      this.devicesService.apiDevicesSingleIdGet(+id).subscribe((r) => {
        this.serialControl.setValue(r.serialNumber);
        this.nameControl.setValue(r.name);
        this.descriptionControl.setValue(r.description);
        this.priceControl.setValue(r.price);
        this.linkControl.setValue(r.link);
        this.userIdControl.setValue(r.userId);
        this.isActiveControl.setValue(r.isActive);

        this.deviceDataRecieved = true;

        this.deviceId = +id!;
      });
    }
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      let device: Device = {
        serialNumber: this.serialControl.value,
        name: this.nameControl.value,
        description: this.descriptionControl.value,
        price: this.priceControl.value,
        link: this.linkControl.value,
        userId: this.userIdControl.value,
        isActive: this.isActiveControl.value,
      };

      if (this.isCreate) {
        this.devicesService.apiDevicesAddDevicePost(device).subscribe((r) => {
          this.router.navigate([`/manage-devices`]);
        });
      } else {
        device.id = this.deviceId;

        this.devicesService
          .apiDevicesUpdateDevicePatch(device)
          .subscribe((r) => {
            this.router.navigate([`/manage-devices`]);
          });
      }
    }
  }

  cancel() {
    this.router.navigate([`/manage-devices`]);
  }
}
