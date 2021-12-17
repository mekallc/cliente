import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CameraService } from '@core/services/camera.service';
import { GeolocationService } from '@core/services/geolocation.service';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss'],
})
export class PartsComponent implements OnInit, AfterViewInit {

  @Input() expert: number;

  formReact: FormGroup;
  brands$: Observable<any[]>;
  models$: Observable<any[]>;
  vehicles$: Observable<any[]>;
  conditions$: Observable<any[]>;

  now: any;
  years: any = [];
  brands: any = [];
  models: any = [];
  capture: any = [];
  coordinates: any;

  slideOpts = {
    spaceBetween: 20, slidesPerView: 1.2,
    speed: 400, loop: true, freeMode: true,
    allowTouchMove: true, autoplay: {delay: 2000},
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
    this.conditions$ = this.db.getTypeCondition();
  }

  async ngAfterViewInit() {
    const { coords } = await this.geo.currentPosition();
    this.coordinates = coords;
  }

  onSubmit = async () => {
    this.setReactive();
    console.log(this.formReact.value);
    const load = await this.loadingCtrl.create({ message: 'Loading...' });
    await load.present();
    this.db.setServices(this.formReact.value).subscribe(
      async (res) => {
        console.log(res);
        await load.dismiss();
        const modal = await this.modalCtrl.create({ component: WaitingComponent, componentProps: { res } });
        await modal.present();
    }, async (err) => {
      console.log(err);
      await load.dismiss();
        const alert = await this.alertCtrl.create({ header: 'ERROR', message: err.error.description, buttons: ['OK'] });
        await alert.present();
    });
  };
  fiterBrand = (ev: any) => {
    const value = ev.detail.value;
    this.brands$ = this.db.getBrand().pipe(
      map((res) => res.filter((row: any) => row.types_vehicle.find((el: any) => el.id === value)))
    );
  };

  loadReactiveForm = () => {
    this.formReact = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(4)]],
      type_expert: [''], type_company: [2],
      vehicle_model: ['', Validators.required],
      vehicle_condition: [''],
      latitude: [''], longitude: [''],
      year: [''], pictures: ['']
    });
  };

  setReactive = () => {
    this.formReact.controls.type_expert.setValue(+this.expert);
    this.formReact.controls.latitude.setValue(this.coordinates.latitude);
    this.formReact.controls.longitude.setValue(this.coordinates.longitude);
    this.formReact.controls.pictures.setValue(this.capture);
  };


  filterModel = (ev: any) => {
    this.models$ = this.db.getModel().pipe(map((res: any) =>
      res.filter((row: any) => row.brand === ev.detail.value)));
  };

  capturePhoto = async () => {
    const photo = await this.cameraService.takePhoto();
    this.capture.push(photo);
  };

  removeCapture = (id: string) => {
    this.capture = this.capture.filter((row: any) => row !== id);
  };
}
