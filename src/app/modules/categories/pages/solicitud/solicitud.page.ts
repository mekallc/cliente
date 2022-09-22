import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { GeolocationService } from '@core/services/geolocation.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-solicitud',
  templateUrl: 'solicitud.page.html',
  styleUrls: ['solicitud.page.scss'],
})

export class SolicitudPage implements OnInit {

  service$: Observable<any>;
  service = false;
  expert: number;
  segment = 'mechanics';

  constructor(
    activate: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    activate.paramMap.subscribe((res: any) => this.expert = res.params.id);
  }

  ngOnInit(): void {
    this.getService();
  }

  getService = () => {
    this.service$ = this.store.select('item')
    .pipe(
      filter(row => !row.loading),
      map((res: any) => {
        this.serviceActive(res.item);
        return res.item;
      }),
    );
    this.service$.subscribe((res) => console.log(res));
  };

  serviceActive(service: any) {
    console.log('SERVICE ', service);
    if (service !== null) {
      console.log('SERVICE ', service);
      this.service = true;
    }
  }

  segmentChanged = (ev: any) => this.segment = ev.detail.value;
}
