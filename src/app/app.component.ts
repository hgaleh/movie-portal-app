import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'bit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  search: FormControl;

  constructor(
    fb: FormBuilder,
    router: Router
  ) {
    this.search = fb.control('');

    this.search.valueChanges.pipe(debounceTime(1000)).subscribe(keyword => {
      router.navigate(['/'], {
        queryParams: {
          keyword
        }
      })
    })
  }
}
