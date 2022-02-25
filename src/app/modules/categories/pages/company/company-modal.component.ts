import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { timer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';
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
    private db: DbCategoriesService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    timer(400).subscribe(() => console.log(this.res));
    this.companies$ = this.db.getCompanies(1, 2, this.res.latitude, this.res.longitude)
    .pipe(map((res: any) => res.search));
    this.companies$.subscribe((res) => console.log(res));
  }

  clickedMarker(item: any) {
    console.log(`clicked the marker:`, item);
  }

  mapClicked(ev: any) {
    console.log(ev.coords);
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng,
    //   draggable: true
    // });
  }

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
