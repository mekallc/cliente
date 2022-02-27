import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { timer, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';
import { loadService, loadInProcess } from '@store/actions';
declare let google: any;

@Component({
  selector: 'app-company-modal',
  templateUrl: './company-modal.component.html',
  styleUrls: ['./company-modal.component.scss'],
})
export class CompanyModalComponent implements OnInit {

  @Input() res: any;
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  value = 'maps';
  companies$: Observable<any[]>;
  constructor(
    private store: Store<AppState>,
    private db: DbCategoriesService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    timer(400).subscribe(() => console.log(this.res));
    this.companies$ = this.db.getCompanies(1, 2, this.res.latitude, this.res.longitude)
    .pipe(map((res: any) => res.search));
    this.companies$.subscribe((res) => console.log(res));
  }

  clickedMarker = async (item: any) => {
    const data = {
      status: 'IN_PROCESS',
      company_request: item.id,
      distance: item.distance.distance,
      duration: item.distance.duration
    };
    const alert = await this.alertCtrl.create({
      header: 'Info', message: 'Do you want to send the service to this provider?',
      buttons:[
        { text: 'Cancel', role: 'cancel', },
        {
          text: 'Okay',
          id: 'confirm-button',
          handler: async () => {
            const loading = await this.loadingCtrl.create({ message: 'Loading...' });
            loading.present();
            this.db.sendService(this.res.id, data).pipe(delay(500)).subscribe((res: any) => {
              console.log(res);
              this.store.dispatch(loadService({ status: 'OPEN'}));
              this.store.dispatch(loadInProcess());
            }, err => console.log(err));
            loading.dismiss();
            this.modalCtrl.dismiss();
          }
        }
      ]
    });
    await alert.present();
  };
  viewProfile = (item: any) => console.log(`clicked the marker:`, item);

  mapClicked = (ev: any) => console.log(ev.coords);

  markerDragEnd(m: marker, ev: any) {
    console.log('dragEnd', m, ev);
  }

  loadMap() {
    const latLng = new google.maps.LatLng(this.res.latitude, this.res.longitude);
    // const marker = new google.maps.Marker({ position: latLng });
    const marker = new google.maps.Marker({ position: latLng });
    const mapOptions = {
      zoom: 15, center: latLng,
      disableDefaultUI:true,
      gestureHandling: 'none',
      keyboardShortcuts: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    marker.setMap(this.map);
  }

  public getRandom = () => Math.floor(Math.random() * (5 - 1 + 1) + 1);
  segment = (ev: any) => this.value = ev.detail.value;
  onClose = () => this.modalCtrl.dismiss();

}


interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
