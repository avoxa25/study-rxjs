import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rxjs-study';

  constructor() {
    const obs: Observable<number> = of(1, 2, 3);;

    obs.pipe(map(item => item + 1))
      .subscribe(value => console.log(value))
  }

}
