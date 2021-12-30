import { Component, Input, OnInit } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';
import { map } from 'rxjs/operators';
import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-service-status-list',
  templateUrl: './service-status-list.component.html',
  styleUrls: ['./service-status-list.component.scss'],
})
export class ServiceStatusListComponent implements OnInit {

  @Input() type = 'OPEN';
  items$: Observable<any>;

  constructor(
    private db: DbCategoriesService,
    private modalCrtl: ModalController,
  ) { }

  ngOnInit() {
    this.listService();
  }

  listService = () => {
    const items = zip(this.db.getServices(), this.db.getIcone()).pipe(
      map((x: any) => {
        const data = [];
        x[0].forEach(el => {
          el.expert_icon = x[1].filter((row: any) => row.name === el.type_expert)[0].picture;
          data.push(el);
        });
        return data;
      })
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
