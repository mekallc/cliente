import { Component, OnInit } from '@angular/core';
import { MasterService } from '@core/services/master.service';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Observable } from 'rxjs';
import { UtilsService } from '@core/services/utils.service';
import { CompanyViewModalComponent } from '@modules/categories/pages/company-view-modal/company-view-modal.component';


@Component({
  selector: 'app-widget-banner',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
})
export class BannersWidgetComponent implements OnInit {

  entry$: Observable<any>;
  options = {
    loop: true,
    speed: 600,
    autoplay: true,
    spaceBetween: 100,
    slidesPerView: 1,
  };

  constructor(
    private ms: MasterService,
    private uService: UtilsService,
  ) { }

  async ngOnInit() {
    await this.getBanner();
  }

  async getBanner(): Promise<void> {
    const position: Position = await Geolocation.getCurrentPosition();
    if (position) {
      const data = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      this.entry$ = this.ms.postMaster('banners/client', data);
      this.entry$.subscribe(res => console.log('BANNER ', res));
    }
  };

  goToCompany(id: string) {
    console.log(id);
    this.ms.getMaster(`companies/${id}`)
    .subscribe(async (provider: any) => {
      if(provider) {
        console.log(provider);
        await this.uService.modal({
          mode: 'ios',
          initialBreakpoint: 0.95,
          breakpoints: [0, 1, 1],
          component: CompanyViewModalComponent,
          componentProps: { provider }
        });
      }
    });
  }
}
