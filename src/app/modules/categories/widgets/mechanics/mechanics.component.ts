import { Component, OnInit, AfterViewInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { CameraService } from '@core/services/camera.service';
import { GeolocationService } from '@core/services/geolocation.service';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';
import { CompanyModalComponent } from '@modules/categories/pages/company/company-modal.component';

import { Store } from '@ngrx/store';
import * as actions from '@store/actions';
import { AppState } from '@store/app.state';

@Component({
  selector: 'app-mechanics',
  templateUrl: './mechanics.component.html',
  styleUrls: ['./mechanics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MechanicsComponent implements OnInit, AfterViewInit {

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
    private nav: NavController,
    private store: Store<AppState>,
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
    const load = await this.loadingCtrl.create({ message: 'Loading...' });
    await load.present();
    this.store.dispatch(actions.itemAdd({ item: this.formReactive.value }));
    this.store.select('item')
    .pipe(filter(row => !row.loading), map(res => res.item))
    .subscribe(async (res) => {
      this.store.dispatch(actions.statusLoad());
      load.dismiss();
      this.formReactive.reset();
      const modal = await this.modalCtrl.create({ component: CompanyModalComponent, componentProps: { res } });
      await modal.present();
      this.nav.navigateRoot('pages/home');
    }, async (err) => {
      load.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'ERROR', message: err.error.description, buttons: ['OK'] });
      await alert.present();
    });
  };

  fiterBrand = (ev: any) => {
    this.brands$ = this.db.getBrand(ev.detail.value);
  };

  filterModel = (ev: any) => {
    this.models$ = this.db.getModel(ev.detail.value);

  };

  loadReactiveForm = () => {
    this.formReactive = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(4)]],
      type_expert: [''], type_company: [1],
      vehicle_model: ['', Validators.required],
      latitude: [''], longitude: [''], distance: [],
      year: [''], pictures: [''], company_request: [0]
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
