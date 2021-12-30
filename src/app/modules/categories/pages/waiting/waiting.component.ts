import { Observable } from 'rxjs';
import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FirebaseService } from '@core/services/firebase.service';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { RoomsChatPage } from '@modules/chat/pages/rooms/rooms.page';
import { SoporteChatPage } from '@modules/chat/pages/soporte/soporte.page';
import { ConnectService } from '@modules/chat/services/connect.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

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
    loop: true,
    freeMode: true,
    spaceBetween: 10,
    slidesPerView: 2.3,
    allowTouchMove: true,
  };

  constructor(
    private fs: FirebaseService,
    private conn: ConnectService,
    private navCtrl: NavController,
    private photoViewer: PhotoViewer,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.loadMap();
    this.room$ = this.conn.getRoomsCompany(this.res.code);
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

  onCancelService = () => console.log('nCancelService');

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
