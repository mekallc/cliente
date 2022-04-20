import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { GeolocationService } from '@core/services/geolocation.service';
@Component({
  selector: 'app-solicitud',
  templateUrl: 'solicitud.page.html',
  styleUrls: ['solicitud.page.scss'],
})
export class SolicitudPage implements OnInit {

  expert: number;
  segment = 'mechanics';

  constructor(
    activate: ActivatedRoute,
    private geo: GeolocationService
  ) {
    activate.paramMap.subscribe((res: any) => this.expert = res.params.id);
  }

  ngOnInit(): void {
    this.geo.currentPosition2();
  }

  segmentChanged = (ev: any) => this.segment = ev.detail.value;


}
