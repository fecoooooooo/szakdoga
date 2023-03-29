import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Device, DevicesService } from 'api-clients/api';

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
  ];
  dataSource = new MatTableDataSource<Device>();

  constructor(private devicesService: DevicesService) {}

  ngOnInit(): void {
    this.devicesService.apiDevicesAllDevicesGet().subscribe((r) => {
      console.log(r);

      this.dataSource = new MatTableDataSource<Device>(r);
    });
  }

  add() {}
}
