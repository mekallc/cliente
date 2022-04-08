import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { timer } from 'rxjs';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';
import { loadService, loadInProcess } from '@store/actions';
import { delay } from 'rxjs/operators';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';
declare let google: any;

@Component({
  selector: 'app-company-view-modal',
  templateUrl: './company-view-modal.component.html',
  styleUrls: ['./company-view-modal.component.scss'],
})
export class CompanyViewModalComponent implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  @Input() id: number;
  @Input() company: any;

  map: any;

  constructor(
    private store: Store<AppState>,
    private db: DbCategoriesService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    timer(300).subscribe(() => console.log(this.company));
  }

  loadMap() {
    const latLng = new google.maps.LatLng(this.company.distance.latitude, this.company.distance.longitude);
    const marker = new google.maps.Marker({ position: latLng });
    const mapOptions = {
      zoom: 18, center: latLng,
      disableDefaultUI:true,
      gestureHandling: 'none',
      keyboardShortcuts: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    marker.setMap(this.map);
  }

  onSend = async (item: any, id: number) => {
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
            this.db.sendService(id, data).pipe(delay(500)).subscribe((res: any) => {
              this.store.dispatch(loadService({ status: 'OPEN'}));
              this.store.dispatch(loadInProcess());
            });
            loading.dismiss();
            this.modalCtrl.dismiss();
          }
        }
      ]
    });
    await alert.present();
  };

  onClose = () => this.modalCtrl.dismiss();

}
