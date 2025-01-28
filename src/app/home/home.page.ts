import { Component } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  imports: [
    IonicModule,
    RouterLink
  ],
  styleUrls: ['./home.page.scss']
})
export class HomePage {}
