import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  DevicesForUserResponse,
  DevicesService,
  UsersService,
} from 'api-clients/api';
import { AuthService } from 'src/app/shared/auth.service';
import { ExportService } from 'src/app/shared/export.service';

@Component({
  selector: 'app-user-devices',
  templateUrl: './user-devices.component.html',
  styleUrls: ['./user-devices.component.scss'],
})
export class UserDevicesComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'deviceName', 'startDate'];
  dataSource = new MatTableDataSource<DevicesForUserResponse>();

  @ViewChild('TABLE') table: ElementRef | undefined;

  constructor(
    private devicesService: DevicesService,
    private authService: AuthService,
    private exportService: ExportService
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

  exportToExcel() {
    this.exportService.tableToExcel(this.table, 'Felhasználó eszközei', 1);
  }
}
