import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Device,
  DeviceHistory,
  DevicesService,
  IdentityUser,
  UsersService,
} from 'api-clients/api';
import { forkJoin } from 'rxjs';
import { ExportService } from 'src/app/shared/export.service';

@Component({
  selector: 'app-device-history',
  templateUrl: './device-history.component.html',
  styleUrls: ['./device-history.component.scss'],
})
export class DeviceHistoryComponent {
  displayedColumns: string[] = ['id', 'user', 'device', 'startDate', 'endDate'];
  dataSource = new MatTableDataSource<DeviceHistory>();

  users: IdentityUser[] | null = null;
  devices: Device[] | null = null;
  @ViewChild('TABLE') table: ElementRef | undefined;

  constructor(
    private devicesService: DevicesService,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    let id: string | null = this.route.snapshot.paramMap.get('id');

    forkJoin({
      history: this.devicesService.apiDevicesHistoryForDeviceIdGet(+id!),
      users: this.usersService.allUsersGet(),
      devices: this.devicesService.apiDevicesAllDevicesGet(),
    }).subscribe((result) => {
      this.dataSource = new MatTableDataSource<DeviceHistory>(result.history);
      this.users = result.users;
      this.devices = result.devices;
    });
  }

  getUserName(userId: string) {
    return this.users?.find((x) => x.id === userId)?.userName;
  }

  getDeviceName(deviceId: number) {
    return this.devices?.find((x) => x.id === deviceId)?.name;
  }

  cancel() {
    this.router.navigate([`/manage-devices`]);
  }

  exportToExcel() {
    this.exportService.tableToExcel(this.table, 'Eszköz történet', 1);
  }
}
