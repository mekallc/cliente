import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModalController, AlertController, NavController, LoadingController } from '@ionic/angular';
import { SoporteChatPage } from '@modules/chat/pages/soporte/soporte.page';
import { ConnectService } from '@modules/chat/services/connect.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { loadInProcess, loadService } from '@store/actions';

declare let google: any;

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss'],
})
export class WaitingComponent implements OnInit, AfterViewInit {

  @Input() res: any;
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  room$: Observable<any>;
  company$: Observable<any>;
  openImage = false;
  slideOpts = {
    spaceBetween: 10,
    slidesPerView: 2.3,
  };

  constructor(
    private conn: ConnectService,
    private store: Store<AppState>,
    private navCtrl: NavController,
    private db: DbCategoriesService,
    private photoViewer: PhotoViewer,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.log('WAITING ', this.res);
    this.loadMap();
    this.room$ = this.conn.getRoomsCompany(this.res.code).pipe(map((res: any) => res));
  }

  onCancel = async () => {
    const alert = await this.alertCtrl.create({
      header: 'INFO',
      message: 'Do you want to cancel this service?',
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'secondary', handler: () => {} },
        { text: 'Ok', handler: () => console.log('Confirm Okay') }
      ]
    });
    await alert.present();
  };

  onActive = (status: string) => {
    if(status === 'IN_PROCESS') { this.modalChat(); }
    else { this.onCancel(); }
  };

  onChat = (code: string) => {
    this.modalCtrl.dismiss();
    this.navCtrl.navigateForward(`chat/room/${this.res.code}/${code}`);
  };

  onCancelService = async (id: number) => {
    console.log('nDeleteService ', id);
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
              () => this.store.dispatch(loadInProcess()),
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
  onDeleteService = async (id: number) => {
    console.log('nDeleteService ', id);
    const alert = await this.alertCtrl.create({
      header: 'Info',
      message: 'Will you eliminate this service?',
      buttons:[
        { text: 'Cancel', role: 'cancel', },
        {
          text: 'Okay',
          id: 'confirm-button',
          handler: async () => {
            const loading = await this.loadingCtrl.create({ message: 'Loading...' });
            loading.present();
            this.db.deleteService(id).pipe(delay(700)).subscribe(
              () => this.store.dispatch(loadService({status: 'OPEN'})),
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

  loadMap() {
    const latLng = new google.maps.LatLng(this.res.latitude, this.res.longitude);
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

  onClose = () => this.modalCtrl.dismiss();
  toogle = () => this.openImage = !this.openImage;
  openPicture = (url: string) => this.photoViewer.show(url, '', { share: true });

  private modalChat = async () => {
    const chat = await this.modalCtrl.create({ component: SoporteChatPage });
    await chat.present();
  };
}
