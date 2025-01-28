import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherDisplayComponent } from './components/weather-display/weather-display.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    WeatherDisplayComponent
  ]
})
export class WeatherModule {}
