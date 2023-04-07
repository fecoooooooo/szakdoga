import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Device,
  DevicesService,
  IdentityUser,
  Software,
  SoftwaresService,
  UsersService,
} from 'api-clients/api';
import { forkJoin } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { ExportService } from 'src/app/shared/export.service';

@Component({
  selector: 'app-list-softwares',
  templateUrl: './list-softwares.component.html',
  styleUrls: ['./list-softwares.component.scss'],
})
export class ListSoftwaresComponent {
  displayedColumns: string[] = [
    'id',
    'license',
    'name',
    'description',
    'price',
    'productLink',
    'userId',
    'isActive',
    'actions',
  ];
  dataSource = new MatTableDataSource<Software>();
  @ViewChild('TABLE') table: ElementRef | undefined;
  users: IdentityUser[] | null = null;

  constructor(
    private softwaresService: SoftwaresService,
    private matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    forkJoin({
      softwares: this.softwaresService.apiSoftwaresAllSoftwaresGet(),
      users: this.usersService.allUsersGet(),
    }).subscribe((result) => {
      this.dataSource = new MatTableDataSource<Software>(result.softwares);
      this.users = result.users;
    });
  }

  add() {
    this.router.navigate([`./new-software`], { relativeTo: this.route });
  }

  edit(id: number) {
    this.router.navigate([`./edit-software/${id}`], { relativeTo: this.route });
  }

  delete(id: number) {
    const dialogRef = this.matDialog.open(ConfirmationModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.softwaresService.apiSoftwaresDeleteIdDelete(id).subscribe((r) => {
          let temp = this.dataSource.data.filter((x) => x.id != id);
          this.dataSource.data = temp;
        });
      }
    });
  }

  history(id: number) {
    this.router.navigate([`./software-history/${id}`], {
      relativeTo: this.route,
    });
  }

  getUserName(userId: string) {
    return this.users?.find((x) => x.id === userId)?.userName;
  }

  exportToExcel() {
    this.exportService.tableToExcel(this.table, 'Szoftverek', 1);
  }
}
