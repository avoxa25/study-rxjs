import { Component } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of, ReplaySubject, interval } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';

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
  private behaviorSubject$?: BehaviorSubject<number>;
  private replaySubject$?: ReplaySubject<number>;
  private observable2$: Observable<number> = new Observable();

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

    this.behaviorSubject$ = new BehaviorSubject(100);
    this.behaviorSubject$.subscribe(value => console.log('behaviorSubject, first subscribe ', value));
    this.behaviorSubject$.next(1);
    this.behaviorSubject$.next(2);
    this.behaviorSubject$.subscribe(value => console.log('behaviorSubject, second subscribe ', value));
    this.behaviorSubject$.next(3);

    this.replaySubject$ = new ReplaySubject();
    this.replaySubject$.next(1);
    this.replaySubject$.next(2);
    this.replaySubject$.next(3);
    this.replaySubject$.subscribe(value => console.log('replaySubject', value));

    this.observable2$ = interval(1000)
    this.observable2$
      .pipe(
        take(10),
        map(value => value * 10),
        filter(value => value > 20)
        ).subscribe(value => console.log('observable2, operators', value))
  }

  ngOnDestroy() {
    this.subject$.unsubscribe();
    this.subject2$?.unsubscribe();
    this.behaviorSubject$?.unsubscribe();
    this.replaySubject$?.unsubscribe();
  }



}
