import { Component, OnInit  } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, timer } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

import { AppState } from '@store/app.state';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  finished$: Observable<any>;
  cancelled$: Observable<any>;
  toggle = 'FINISHED';
  progress = true;

  constructor(
    private store: Store<AppState>,
  ){}

  ngOnInit(): void {
    this.getFinished();
    this.getCancelled();
  }

  progressBar(res: any) {
    const length = res.length;
    if(length === 0) {
      timer(2000).subscribe(() => this.progress = false);
    } else {
      timer(1000).subscribe(() => this.progress = false);
    }
  }

  getFinished() {
    this.finished$ = this.store.select('finished')
    .pipe(
      filter(row => !row.loading),
      tap(({ finished }) => this.progressBar(finished)),
      map((res: any) => res.finished)
    );
  }



  getCancelled() {
    this.cancelled$ = this.store.select('cancelled')
    .pipe(
      filter(row => !row.loading),
      map(res => res.cancelled)
    );
  }

  segmentChanged(ev: any) {
    this.toggle = ev.detail.value;
  }
}
