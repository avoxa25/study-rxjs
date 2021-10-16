import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rxjs-study';

  private observable$: Observable<number>;
  private subject$: Subject<number>;
  private subject2$?: Subject<number>;

  constructor() {
    this.observable$ = of(1, 2, 3);;

    this.observable$.pipe(map(item => item + 1))
      .subscribe(value => console.log('of` ', value))

    this.subject$ = new Subject();
    this.subject$.subscribe(value => console.log('subject1, first subscribe ', value));
    this.subject$.next(1);
    this.subject$.next(2);
    this.subject$.subscribe(value => console.log('subject1, second subscribe ', value));
    this.subject$.next(3);
  }

  ngOnInit() {
    this.subject2$ = new Subject();
    this.subject2$.subscribe(value => console.log('subject2, first subscribe ', value));
    this.subject2$.next(1);
    this.subject2$.next(2);
    this.subject2$.subscribe(value => console.log('subject2, second subscribe ', value));
    this.subject2$.next(3);
    this.subject2$.next(4);
  }

  ngOnDestroy() {
    this.subject$.unsubscribe();
    this.subject2$?.unsubscribe();
  }



}
