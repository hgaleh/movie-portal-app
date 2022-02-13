import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { debounceTime, Subscription } from 'rxjs';
import { slideInAnimation } from './app.animation';

@Component({
  selector: 'bit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnDestroy {
  search: FormControl;
  private subscription: Subscription;
  constructor(
    fb: FormBuilder,
    router: Router
  ) {

    this.search = fb.control('');

    this.subscription = this.search.valueChanges.pipe(debounceTime(1000)).subscribe(keyword => {
      router.navigate(['/'], {
        queryParams: {
          keyword
        }
      })
    });
  
  }

  prepareRoute(outlet: RouterOutlet): void {
    return outlet?.activatedRouteData?.['animation'];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
