import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MasterService } from '@core/services/master.service';
import { GeolocationService } from '@core/services/geolocation.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-widget-banner',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
})
export class BannersWidgetComponent implements OnInit {

  entry$: Observable<any[]>;
  options = {
    loop: true,
    speed: 600,
    autoplay: true,
    spaceBetween: 100,
    slidesPerView: 1,
  };

  constructor(
    private ms: MasterService,
    private geo: GeolocationService,
  ) { }

  async ngOnInit() {
    await this.getBanner();
  }

  getBanner = async () => {
    const { coords } = await this.geo.currentPosition();
    // this.entry$ = this.ms.getBanner(coords.longitude, coords.latitude).pipe(map((res: any) => res.search));
    this.entry$ = this.ms.getBanner(10.256092197650664, -67.61916302825504).pipe(map((res: any) => res.search));
    this.entry$.subscribe(res => console.log(res));
  };

}
