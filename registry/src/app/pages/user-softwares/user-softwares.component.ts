import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  DevicesForUserResponse,
  DevicesService,
  SoftwaresForUserResponse,
  SoftwaresService,
} from 'api-clients/api';
import { AuthService } from 'src/app/shared/auth.service';
import { ExportService } from 'src/app/shared/export.service';

@Component({
  selector: 'app-user-softwares',
  templateUrl: './user-softwares.component.html',
  styleUrls: ['./user-softwares.component.scss'],
})
export class UserSoftwaresComponent {
  displayedColumns: string[] = ['userName', 'softwareName', 'startDate'];
  dataSource = new MatTableDataSource<SoftwaresForUserResponse>();

  @ViewChild('TABLE') table: ElementRef | undefined;

  constructor(
    private softwaresService: SoftwaresService,
    private authService: AuthService,
    private exportService: ExportService
  ) {}
  ngOnInit(): void {
    let userId: string | null = this.authService.getUserId();

    if (userId !== null) {
      this.softwaresService
        .apiSoftwaresSoftwaresForUserUserIdGet(userId)
        .subscribe((result) => {
          this.dataSource.data = result;
        });
    }
  }

  exportToExcel() {
    this.exportService.tableToExcel(this.table, 'Felhasználó szoftverei', 1);
  }
}
