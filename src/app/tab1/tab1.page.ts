import { Component } from '@angular/core';
import { WeatherService } from 'src/app/weather.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  weather: any;
  location: {
    city: string;
    state: string;
  };
  constructor(private weatherService: WeatherService) { }

  viewEnter() {
    this.location = {
      city: 'London',
      state: 'uk'
    };
    // tslint:disable-next-line:align
    this.weatherService.getweather(this.location.city, this.location.state);
  }

}
