import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number): Observable<any> {
    const params = {
      latitude: lat.toString(),
      longitude: lon.toString(),
      current_weather: 'true',
      timezone: 'Europe/Paris'
    };
    return this.http.get(this.apiUrl, { params });
  }
}

