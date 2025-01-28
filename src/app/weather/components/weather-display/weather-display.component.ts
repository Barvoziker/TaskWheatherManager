import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { IonicModule } from '@ionic/angular';
import {NgIf, NgFor, DatePipe} from '@angular/common';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss'],
  standalone: true,
  imports: [IonicModule, NgIf, NgFor, DatePipe]
})
export class WeatherDisplayComponent implements OnInit {
  weather: any;
  dailyForecast: any;
  communeName: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(): void {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.weatherService.getWeather(latitude, longitude).subscribe(data => {
        this.weather = data.current_weather;
        this.dailyForecast = data.daily;
      });
      this.weatherService.getCommuneName(latitude, longitude).subscribe(data => {
        if (data && data.length > 0) {
          this.communeName = data[0].nom;
        } else {
          this.communeName = 'Localisation inconnue';
        }
      });
    });
  }
}
