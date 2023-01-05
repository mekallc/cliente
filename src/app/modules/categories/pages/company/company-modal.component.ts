import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Geolocation, Position } from '@capacitor/geolocation';

import { Store } from '@ngrx/store';
import * as actions from '@store/actions';
import { AppState } from '@store/app.state';

import { DbCategoriesService } from '../../services/db-categories.service';
import { CompanyViewModalComponent } from '../company-view-modal/company-view-modal.component';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-company-modal',
  templateUrl: './company-modal.component.html',
  styleUrls: ['./company-modal.component.scss'],
})

export class CompanyModalComponent implements OnInit {

  item$: Observable<any>;
  provider$: Observable<any>;
  position: any;
  value = 'LIST';

  latLng: any;
  address: string;
  showMaps = false;
  service: any = [];

  res: any;
  maps: any;
  companies$: Observable<any[]>;
  coords: any = [];
  latitude: number;
  longitude: number;
  pathIcon = './assets/images/location-home.png';
  serviceIcon = './assets/images/location-services.png';

  constructor(
    private store: Store<AppState>,
    private uService: UtilsService,
    private db: DbCategoriesService,
    private translate: TranslateService,
  ) { }


  async ngOnInit(): Promise<void> {
    await this.currentPosition();
  }

  segment(ev: any): void {
    this.value = ev.detail.value;
  }

  async currentPosition(): Promise<void> {
    await this.uService.load({ message: this.translate.instant('PROCESSING')});
    const position: Position = await Geolocation.getCurrentPosition();
    if (position) {
      this.position =  {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
    }
    this.getService();
    this.getProvider();
    this.uService.loadDimiss();
  }

  getService() {
    this.item$ = this.store.select('item')
    .pipe(filter(row => !row.loading), map((res: any) => res.item));
  }

  getProvider() {
    this.provider$ = this.item$.pipe(
      switchMap(res => {
        const data = this.setDataSearchProvider(res);
        return this.db.getProviderByServise(data).pipe(
          map((provider: any) => this.sortProviderNearBord(provider))
        );
      })
    );
  }

  loadPage = (service: any) => this.res = service;

  async sendProviderService(service: any, provider: any): Promise<void> {
    const distance = this.getDistance(service, provider);
    service.distance = distance;
    service.status = 'in_process';
    service.company = provider._id;
    await this.uService.alert({
      header: this.translate.instant('ALERT_INFO'),
      message: this.translate.instant('DO_YOU_WANT_TO_SEND_THE_SERVICE_TO_THIS_PROVIDER'),
      buttons: [
        { text: 'Cancel', role: 'cancel', },
        { text: 'Okay', id: 'confirm-button',
          handler: async () => {
            await this.uService.load({ message: this.translate.instant('PROCESSING'), duration: 1500 });
            this.store.dispatch(actions.itemUpdate({ id: service._id, data: service }));
            this.uService.navigate('/pages/home');
          }
        }
      ]
    });
  }

  async onViewProfileProvider(service: any, provider: any): Promise<void> {
    console.log('PROVIDER ', provider);
    await this.uService.modal({
      mode: 'ios',
      initialBreakpoint: 0.85,
      breakpoints: [0, 0.85, 1],
      component: CompanyViewModalComponent,
      componentProps: { service, provider }
    });
  }

  async onCancelService(service: any): Promise<void> {
    await this.uService.alert({
      header: this.translate.instant('ALERT_WARNING'),
      message: this.translate.instant('WILL_YOU_CANCEL_THIS_SERVICE'),
      buttons:[
        { text: 'Cancel', role: 'cancel', },
        { text: 'Okay', handler: async () => this.cancelservice(service) }
      ]
    });
  };

  onBack() {
    this.uService.navigate('/pages/home');
  }

  private getDistance(p1: any, p2: any) {
    const data1 = { latitude: p1.latitude, longitude: p1.longitude };
    const data2 = { latitude: p2.latitude, longitude: p2.longitude };
    console.log(data1);
    console.log(data2);
    return this.uService.distance(data1, data2);
  }

  private async cancelservice(service: any): Promise<void> {
    service.status = 'cacelled';
    await this.uService.load({ message: this.translate.instant('PROCESSING') });
    this.store.dispatch(actions.itemDelete({ id: service._id, data: service }));
    this.uService.navigate('/pages/home');
    this.uService.loadDimiss();
  }

  private sortProviderNearBord(objs: any) {
    return objs.sort((a: any,b: any): 0 | 1 | -1 =>
      (a.distance.distance > b.distance.distance) ? 1 :
      ((b.distance.distance > a.distance.distance) ? -1 : 0));
  }

  private setDataSearchProvider(res: any) {
    return {
      user: res.user._id ? res.user._id : '',
      category: res.category._id,
      latitude: this.position.latitude,
      longitude: this.position.longitude
    };
  }
}
