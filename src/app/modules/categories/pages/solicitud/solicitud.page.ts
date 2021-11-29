import { Component } from '@angular/core';

@Component({
  selector: 'app-solicitud',
  templateUrl: 'solicitud.page.html',
  styleUrls: ['solicitud.page.scss'],
})
export class SolicitudPage  {

  segment = 'mechanics';
  segmentChanged = (ev: any) => this.segment = ev.detail.value;
}
