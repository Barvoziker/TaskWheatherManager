import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import {IonicModule} from "@ionic/angular";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  imports: [
    IonicModule,
    NgIf
  ],
  styleUrls: ['./weather-display.component.scss']
})
export class WeatherDisplayComponent {
  weather: any;

  constructor(private weatherService: WeatherService) {}

  getWeather(): void {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.weatherService.getWeather(latitude, longitude).subscribe(data => {
        this.weather = data.current_weather;
      });
    });
  }
}
