import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { ModalController, NavController } from '@ionic/angular';
import { delay, map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { loadService, loadInProcess } from '@store/actions';
import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';
import { CompanyModalComponent } from '@modules/categories/pages/company/company-modal.component';

@Component({
  selector: 'app-service-status-list',
  templateUrl: './service-status-list.component.html',
  styleUrls: ['./service-status-list.component.scss'],
})
export class ServiceStatusListComponent implements OnInit, AfterViewInit {

  @Input() type = 'OPEN';
  items$: Observable<any>;
  load = true;
  total: number;

  constructor(
    private nav: NavController,
    private store: Store<AppState>,
    private db: DbCategoriesService,
    private modalCrtl: ModalController,
  ) { }

  ngOnInit() {
    this.store.dispatch(loadService({ status: this.type || 'OPEN' }));
  }

  ngAfterViewInit() {
    this.loadData(this.type);
  }

  listService = (service: any) => {
    this.items$ = undefined;
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

  goTochat = (item: any) =>
  this.nav.navigateRoot(`/chat/room/${item.code}/${item.company_request.id}`);

  openService = async (res: any) => {
    if (this.type === 'OPEN') {
      const modal = await this.modalCrtl.create({
        component: CompanyModalComponent,
        componentProps: { res }
      });
      modal.present();
    } else {
      const modal = await this.modalCrtl.create({
        component: WaitingComponent,
        componentProps: { res }
      });
      modal.present();
    }
  };

  private loadData = (type: string) => {
    switch (type) {
      case 'OPEN':
        this.store.select('service').pipe(
          delay(500),
          tap((res: any) => {
            this.load = res.loading;
            this.total = res.total;
          }),
          map((res: any) => res.service)).subscribe((res: any) => {
          this.listService(res);
        });
      break;
      case 'IN_PROCESS':
        this.store.select('inProcess').pipe(
          delay(500),
          tap((res: any) => {
            this.load = res.loading;
            this.total = res.total;
          }),
          map((res: any) => res.inProcess)).subscribe((res: any) => {
          this.listService(res);
        });
      break;
      case 'ACCEPTED':
        this.store.select('accepted').pipe(
          delay(500),
          tap((res: any) => {
            this.load = res.loading;
            this.total = res.total;
          }),
          map((res: any) => res.accepted)).subscribe((res: any) => {
          this.listService(res);
        });
      break;
    }
  };
}
