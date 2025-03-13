import { Component } from '@angular/core';
import css from './app.component.scss.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  contentClass = css.content;
}
