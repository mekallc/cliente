import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';
import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss'],
})
export class HistoryPage implements OnInit{

  load = true;
  total = 0;
  items$: Observable<any>;
  toggle = '';

  constructor(
    private store: Store<AppState>,
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    this.items$ = this.store.select('history').pipe(
      delay(700),
      tap(({ loading, total }) => {
        if (total === 0) { this.load = false; }
        else { this.load = loading; }
        this.total = total;
      }),
      map((res: any) => {
        console.log(res);
        return res.history;
      }),
      delay(300),
    );
    this.items$.subscribe((res) => console.log(res));
  }

  doRefresh(ev: any) {
    timer(2000).subscribe(() => {
      ev.target.complete();
    });
  }

  segmentChanged = (ev: any) => this.toggle = ev.detail.value;

  onModal = async (res: any) => {
    const modal = await this.modalCtrl.create({
      component: WaitingComponent,
      componentProps: { res }
    });
    await modal.present();
  };
}
