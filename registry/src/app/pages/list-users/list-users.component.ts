import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent {
  displayedColumns: string[] = [
    'id',
    'userName',
    'email',
    'phoneNumber',
    'roles',
  ];
  dataSource = new MatTableDataSource<IdentityUser>();

  users: IdentityUser[] | null = null;

  constructor(
    private devicesService: DevicesService,
    private matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.allUsersGet().subscribe((r) => {
      this.dataSource = new MatTableDataSource<IdentityUser>(r);
    });
  }

  add() {
    this.router.navigate([`./new-user`], { relativeTo: this.route });
  }

  edit(id: number) {
    this.router.navigate([`./edit-user/${id}`], { relativeTo: this.route });
  }

  delete(id: number) {
    const dialogRef = this.matDialog.open(ConfirmationModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
      }
    });
  }

  getUserName(userId: string) {
    return this.users?.find((x) => x.id === userId)?.userName;
  }
}
