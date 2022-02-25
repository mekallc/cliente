import { loadService } from './../../../../store/actions/service.actions';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';
import { delay, map, tap } from 'rxjs/operators';
import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';
import { ModalController } from '@ionic/angular';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-service-status-list',
  templateUrl: './service-status-list.component.html',
  styleUrls: ['./service-status-list.component.scss'],
})
export class ServiceStatusListComponent implements OnInit, AfterViewInit {

  @Input() type = 'OPEN';
  items$: Observable<any>;
  load = true;

  constructor(
    private store: Store<AppState>,
    private db: DbCategoriesService,
    private modalCrtl: ModalController,
  ) { }

  ngOnInit() {
    this.store.dispatch(loadService({ status: this.type || 'OPEN' }));
  }

  ngAfterViewInit() {
    this.store.select('service').pipe(
      delay(1000),
      tap((res: any) => this.load = res.loading),
      map((res: any) => res.service)).subscribe((res: any) => {
      this.listService(res);
    });
  }

  listService = (service: any) => {
    const items = zip( of(service), this.db.getIcone() ).pipe(
      map((x: any) => {
        const data = [];
        x[0].forEach(el => {
          el.expert_icon = x[1].filter((row: any) => row.name === el.type_expert)[0].picture;
          data.push(el);
        });
        return data;
      }),
    );
    this.items$ = items.pipe(
      map((res: any) => {
        const filter = res.filter((row: any) => row.status === this.type);
        return filter;
      })
    );
  };

  openService = async (res: any) => {
    const modal = await this.modalCrtl.create({
      component: WaitingComponent,
      componentProps: { res }
    });
    modal.present();
  };
}
