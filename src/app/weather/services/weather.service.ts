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
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant,sunrise,sunset',
      timezone: 'Europe/Paris'
    };
    return this.http.get(this.apiUrl, { params });
  }

  getCommuneName(lat: number, lon: number): Observable<any> {
    const apiUrl = 'https://geo.api.gouv.fr/communes';
    const params = {
      lat: lat.toString(),
      lon: lon.toString(),
      fields: 'nom',
      format: 'json',
      geometry: 'centre'
    };
    return this.http.get(apiUrl, { params });
  }
}

