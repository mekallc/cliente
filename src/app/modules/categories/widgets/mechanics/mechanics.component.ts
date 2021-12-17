import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GeolocationService } from '@core/services/geolocation.service';
import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';
import { CameraService } from '@core/services/camera.service';

@Component({
  selector: 'app-mechanics',
  templateUrl: './mechanics.component.html',
  styleUrls: ['./mechanics.component.scss'],
})
export class MechanicsComponent implements OnInit, AfterViewInit{

  @Input() expert: number;

  formReactive: FormGroup;
  brands$: Observable<any[]>;
  models$: Observable<any[]>;
  vehicles$: Observable<any[]>;
  capture: any = [];
  coordinates: any;
  slideOpts = {
    speed: 400,
    loop: true,
    freeMode: true,
    spaceBetween: 20,
    slidesPerView: 2.5,
    allowTouchMove: true,
    autoplay: {delay: 2000},
  };

  constructor(
    private fb: FormBuilder,
    private db: DbCategoriesService,
    private geo: GeolocationService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private cameraService: CameraService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.loadReactiveForm();
    this.vehicles$ = this.db.getVehicles();
  }

  async ngAfterViewInit() {
    const { coords } = await this.geo.currentPosition();
    this.coordinates = coords;
  }
  onSubmit = async () => {
    this.setReactive();
    console.log(this.formReactive.value);
    const load = await this.loadingCtrl.create({ message: 'Loading...' });
    await load.present();
    this.db.setServices(this.formReactive.value).subscribe(
      async (res) => {
        await load.dismiss();
        const modal = await this.modalCtrl.create({ component: WaitingComponent, componentProps: { res } });
        await modal.present();
        console.log('RES ', res);
    }, async (err) => {
      console.log(err);
      await load.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'ERROR', message: err.error.description, buttons: ['OK']
        });
        await alert.present();
    });
  };

  fiterBrand = (ev: any) => {
    const value = ev.detail.value;
    this.brands$ = this.db.getBrand().pipe(
      map((res) => res.filter((row: any) => row.types_vehicle.find((el: any) => el.id === value)))
    );
      this.brands$.subscribe((res) => console.log(res));
  };

  filterModel = (ev: any) => {
    this.models$ = this.db.getModel().pipe(
      map((res: any) => res.filter((row: any) => row.brand === ev.detail.value))
    );
  };

  loadReactiveForm = () => {
    this.formReactive = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(4)]],
      type_expert: [''], type_company: [1],
      vehicle_model: ['', Validators.required],
      latitude: [''], longitude: [''],
      year: [''], pictures: ['']
    });
  };

  setReactive = () => {
    this.formReactive.controls.type_expert.setValue(+this.expert);
    this.formReactive.controls.latitude.setValue(this.coordinates.latitude);
    this.formReactive.controls.longitude.setValue(this.coordinates.longitude);
    this.formReactive.controls.pictures.setValue(this.capture);
  };

  capturePhoto = async () => {
    const photo = await this.cameraService.takePhoto();
    this.capture.push(photo);
  };

  removeCapture = (id: string) => {
    this.capture = this.capture.filter((row: any) => row !== id);
  };
}
