import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from 'api-clients/api';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private weatherForecastService: WeatherForecastService) {}
  ngOnInit(): void {
    this.weatherForecastService
      .weatherForecastGetSampleDataGet()
      .subscribe((r) => {
        console.log(r);
      });
  }
}
