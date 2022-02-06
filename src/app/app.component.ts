import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'bit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public mobileQuery: MediaQueryList;

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }
}
