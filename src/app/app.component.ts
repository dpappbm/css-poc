import { Component } from '@angular/core';
import * as myclass from './app.component.scss.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'valami';
  cucc = myclass['card-container'];
}
