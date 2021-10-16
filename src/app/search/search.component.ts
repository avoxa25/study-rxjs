import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private http: HttpClient) { }
  private searchSubject$ = new Subject<string>();
  public results$?: Observable<any>;
  public searchString: string = '';


  ngOnInit() {
    this.results$ = this.searchSubject$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => this.queryApi(value))
      );
  }

  public queryApi(searchString: string): Observable<any> {
    console.log('queryApi', searchString);
    return this.http.get(`https://www.reddit.com/r/battlemaps/search.json?q=${searchString}`)
    .pipe(
      map<any, any>(value => value['data']['children'])
      )
  }

  public inputChanged($event: string): void {
    console.log($event);
    this.searchSubject$.next($event);
  }

}
