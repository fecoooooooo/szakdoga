import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from 'api-clients/api';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private service: WeatherForecastService) {}
  ngOnInit(): void {
    this.service.weatherForecastGetSampleDataGet().subscribe((r) => {
      console.log(r);
    });
  }
}
