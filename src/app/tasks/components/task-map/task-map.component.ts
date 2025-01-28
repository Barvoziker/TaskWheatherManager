import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-task-map',
  templateUrl: './task-map.component.html',
  imports: [
    IonicModule
  ],
  styleUrls: ['./task-map.component.scss']
})
export class TaskMapComponent implements OnInit {
  @Input() latitude!: number;
  @Input() longitude!: number;
  @Input() taskName!: string;
  map!: L.Map;

  ngOnInit(): void {
    this.loadMap();
  }

  loadMap(): void {
    this.map = L.map('map').setView([this.latitude, this.longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([this.latitude, this.longitude])
      .addTo(this.map)
      .bindPopup(this.taskName)
      .openPopup();
  }
}
