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
import { forkJoin } from 'rxjs';
import { CommonValidators } from 'src/app/shared/common-validators';

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
  inUseSerials: string[] = [];

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
    this.isCreate = id === null;

    forkJoin({
      users: this.usersService.apiUsersAllUsersNamesGet(),
      devices: this.devicesService.apiDevicesAllDevicesGet(),
    }).subscribe((result) => {
      this.users = result.users;

      this.inUseSerials = result.devices
        .map((x) => x.serialNumber)
        .filter((x) => x != null) as string[];

      if (
        id !== null &&
        result.devices.find((x) => x.id === +id!) !== undefined
      ) {
        let currentDevice = result.devices.find((x) => x.id === +id!);

        if (currentDevice !== undefined) {
          this.serialControl.setValue(currentDevice.serialNumber);
          this.nameControl.setValue(currentDevice.name);
          this.descriptionControl.setValue(currentDevice.description);
          this.priceControl.setValue(currentDevice.price);
          this.linkControl.setValue(currentDevice.link);
          this.userIdControl.setValue(currentDevice.userId);
          this.isActiveControl.setValue(currentDevice.isActive);

          this.deviceDataRecieved = true;

          this.deviceId = +id!;

          this.serialControl.addValidators(
            CommonValidators.inUseKeyValidator(
              this.inUseSerials,
              currentDevice.serialNumber
            )
          );
        }
      } else {
        this.serialControl.addValidators(
          CommonValidators.inUseKeyValidator(this.inUseSerials, null)
        );
      }
    });
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
        this.devicesService
          .apiDevicesAddDevicePost(device)
          .subscribe((newId) => {
            this.devicesService
              .apiDevicesAddHistoryEntryPost(
                +newId,
                this.userIdControl.value,
                this.userIdControl.value !== null
              )
              .subscribe((r) => {
                this.router.navigate([`/manage-devices`]);
              });
          });
      } else {
        device.id = this.deviceId;

        this.devicesService
          .apiDevicesUpdateDevicePatch(device)
          .subscribe((r) => {
            this.devicesService
              .apiDevicesAddHistoryEntryPost(
                device.id,
                this.userIdControl.value,
                this.userIdControl.value !== null
              )
              .subscribe((r) => {
                this.router.navigate([`/manage-devices`]);
              });
          });
      }
    }
  }

  cancel() {
    this.router.navigate([`/manage-devices`]);
  }
}
