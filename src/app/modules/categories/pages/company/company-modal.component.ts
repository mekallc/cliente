import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { timer, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';
import * as actions from '@store/actions';
import { CompanyViewModalComponent } from '@modules/categories/pages/company-view-modal/company-view-modal.component';
import { threadId } from 'worker_threads';
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
    this.companies$ = this.db.getCompanies(1, 2, this.res.latitude, this.res.longitude)
    .pipe(map((res: any) => res.search));
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
            this.db.sendService(this.res.id, data).pipe(delay(500))
              .subscribe((res: any) => this.dispatch());
            loading.dismiss();
            this.modalCtrl.dismiss();
          }
        }
      ]
    });
    await alert.present();
  };
  viewProfile = (item: any) => console.log(`clicked the marker:`, item);

  mapClicked = (ev: any) => null;

  markerDragEnd(m: marker, ev: any) {
    console.log('dragEnd', m, ev);
  }

  loadMap() {
    const latLng = new google.maps.LatLng(this.res.latitude, this.res.longitude);
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

  onView = async (company: any, id: number) => {
    const modal = await this.modalCtrl.create({
      component: CompanyViewModalComponent,
      componentProps: { company, id }
    });
    modal.present();
  };

  onCancelService = async (id: number) => {
    const alert = await this.alertCtrl.create({
      header: 'Info',
      message: 'Will you cancel this service?',
      buttons:[
        { text: 'Cancel', role: 'cancel', },
        {
          text: 'Okay',
          id: 'confirm-button',
          handler: async () => {
            const loading = await this.loadingCtrl.create({ message: 'Loading...' });
            loading.present();
            this.db.cancelService(id).pipe(delay(700)).subscribe(
              () => this.dispatch(),
              (err) => console.log('Error ', err)
            );
            loading.dismiss();
            this.modalCtrl.dismiss();
          }
        }
      ]
    });
    await alert.present();
  };

  dispatch = () => {
    this.store.dispatch(actions.loadService({ status: 'OPEN'}));
    this.store.dispatch(actions.loadInProcess());
  };

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
