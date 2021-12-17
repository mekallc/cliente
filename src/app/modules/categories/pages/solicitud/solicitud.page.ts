import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-solicitud',
  templateUrl: 'solicitud.page.html',
  styleUrls: ['solicitud.page.scss'],
})
export class SolicitudPage {

  expert: number;
  segment = 'mechanics';

  constructor(
    private activate: ActivatedRoute,
  ) {
    activate.paramMap.subscribe((res: any) => this.expert = res.params.id);
  }

  segmentChanged = (ev: any) => this.segment = ev.detail.value;
}
