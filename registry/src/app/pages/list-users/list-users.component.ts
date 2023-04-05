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
  displayedColumns: string[] = ['id', 'userName', 'email', 'phone', 'actions'];
  dataSource = new MatTableDataSource<IdentityUser>();

  users: IdentityUser[] | null = null;

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.allUsersGet().subscribe((result) => {
      this.dataSource = new MatTableDataSource<IdentityUser>(result);
    });
  }

  add() {
    this.router.navigate([`./new-user`], { relativeTo: this.route });
  }

  edit(id: number) {
    this.router.navigate([`./edit-user/${id}`], { relativeTo: this.route });
  }

  delete(id: string) {
    const dialogRef = this.matDialog.open(ConfirmationModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.usersService.deleteIdDelete(id).subscribe((r) => {
          let temp = this.dataSource.data.filter((x) => x.id != id);
          this.dataSource.data = temp;
        });
      }
    });
  }
}
