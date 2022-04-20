import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';

@Component({
  selector: 'app-widget-categories',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HomeWidgetComponent implements OnInit {

  toogleCategory = false;
  categories$: Observable<any[]>;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.categories$ = this.loadData();
  }

  loadData = () => this.store.select('expert')
    .pipe(filter(row => !row.loading), map(res => res.items));

  goToSolicitud = (item: any) =>
    this.router.navigate(['pages', 'solicitud', 'home',item.id]);

  onToogleCategories = () => this.toogleCategory = !this.toogleCategory;

}
