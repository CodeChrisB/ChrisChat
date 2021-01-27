import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  links = [{
    label: "ChrisChat",
    url: "/chatapp"
  }];
  activeLink = window.location.pathname;
}
