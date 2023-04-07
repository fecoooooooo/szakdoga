import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IdentityUser,
  Software,
  SoftwareHistory,
  SoftwaresService,
  UsersService,
} from 'api-clients/api';
import { forkJoin } from 'rxjs';
import { ExportService } from 'src/app/shared/export.service';

@Component({
  selector: 'app-software-history',
  templateUrl: './software-history.component.html',
  styleUrls: ['./software-history.component.scss'],
})
export class SoftwareHistoryComponent {
  displayedColumns: string[] = [
    'id',
    'user',
    'software',
    'startDate',
    'endDate',
  ];
  dataSource = new MatTableDataSource<Software>();

  users: IdentityUser[] | null = null;
  softwares: Software[] | null = null;

  @ViewChild('TABLE') table: ElementRef | undefined;

  constructor(
    private softwaresService: SoftwaresService,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    let id: string | null = this.route.snapshot.paramMap.get('id');

    forkJoin({
      history: this.softwaresService.apiSoftwaresHistoryForSoftwareIdGet(+id!),
      users: this.usersService.allUsersGet(),
      softwares: this.softwaresService.apiSoftwaresAllSoftwaresGet(),
    }).subscribe((result) => {
      this.dataSource = new MatTableDataSource<SoftwareHistory>(result.history);
      this.users = result.users;
      this.softwares = result.softwares;
    });
  }

  getUserName(userId: string) {
    return this.users?.find((x) => x.id === userId)?.userName;
  }

  getSoftwareName(softwareId: number) {
    return this.softwares?.find((x) => x.id === softwareId)?.name;
  }

  cancel() {
    this.router.navigate([`/manage-softwares`]);
  }

  exportToExcel() {
    this.exportService.tableToExcel(this.table, 'Szoftver történet', 1);
  }
}
