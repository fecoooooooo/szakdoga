import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  DevicesForUserResponse,
  DevicesService,
  UsersService,
} from 'api-clients/api';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-user-devices',
  templateUrl: './user-devices.component.html',
  styleUrls: ['./user-devices.component.scss'],
})
export class UserDevicesComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'deviceName', 'startDate'];
  dataSource = new MatTableDataSource<DevicesForUserResponse>();

  constructor(
    private devicesService: DevicesService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    let userId: string | null = this.authService.getUserId();

    if (userId !== null) {
      this.devicesService
        .apiDevicesDevicesForUserUserIdGet(userId)
        .subscribe((result) => {
          this.dataSource.data = result;
        });
    }
  }
}
