import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { Observable } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-get-profile',
  templateUrl: './get-profile.page.html',
  styleUrls: ['./get-profile.page.scss'],
})
export class GetProfilePage implements AfterViewInit {

  load = true;
  user$: Observable<any>;
  countries: any = [];
  segment = 'editar';

  constructor(
    private navCtrl: NavController,
    private store: Store<AppState>,
  ) { }

  ngAfterViewInit() {
    this.user$ = this.store.select('user').pipe(
      delay(700), tap(({ loading }) => this.load = loading),
      map(({ user }) => user), delay(300),
    );
  }

  segmentChanged = (ev: any) => {
    console.log(ev);
    this.segment = ev.detail.value;
  };

  onBack = () => this.navCtrl.navigateRoot('');
}
