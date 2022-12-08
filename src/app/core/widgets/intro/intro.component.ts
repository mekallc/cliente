import { Component, OnInit } from '@angular/core';import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-intro-widget',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroWidgetComponent implements OnInit {

  user$: Observable<any>;
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.user$ = this.store.select('user').pipe(map((res: any) => res.user));
  }

}
