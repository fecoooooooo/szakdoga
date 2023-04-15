import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Device,
  DevicesService,
  IdentityUser,
  UsersService,
} from 'api-clients/api';
import { forkJoin } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { ExportService } from 'src/app/shared/export.service';

@Component({
  selector: 'app-list-devices',
  templateUrl: './list-devices.component.html',
  styleUrls: ['./list-devices.component.scss'],
})
export class ListDevicesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'serialNumber',
    'name',
    'description',
    'price',
    'link',
    'userId',
    'isActive',
    'actions',
  ];
  dataSource = new MatTableDataSource<Device>();
  @ViewChild('TABLE') table: ElementRef | undefined;

  users: IdentityUser[] | null = null;

  constructor(
    private devicesService: DevicesService,
    private matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    forkJoin({
      devices: this.devicesService.apiDevicesAllDevicesGet(),
      users: this.usersService.apiUsersAllUsersNamesGet(),
    }).subscribe((result) => {
      this.dataSource = new MatTableDataSource<Device>(result.devices);
      this.users = result.users;
    });
  }

  add() {
    this.router.navigate([`./new-device`], { relativeTo: this.route });
  }

  edit(id: number) {
    this.router.navigate([`./edit-device/${id}`], { relativeTo: this.route });
  }

  delete(id: number) {
    const dialogRef = this.matDialog.open(ConfirmationModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.devicesService.apiDevicesDeleteIdDelete(id).subscribe((r) => {
          let temp = this.dataSource.data.filter((x) => x.id != id);
          this.dataSource.data = temp;
        });
      }
    });
  }

  history(id: number) {
    this.router.navigate([`./device-history/${id}`], {
      relativeTo: this.route,
    });
  }

  getUserName(userId: string) {
    return this.users?.find((x) => x.id === userId)?.userName;
  }

  exportToExcel() {
    this.exportService.tableToExcel(this.table, 'Eszközök', 1);
  }
}
