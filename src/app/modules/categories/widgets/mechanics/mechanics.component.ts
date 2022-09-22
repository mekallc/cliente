import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, timer } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Geolocation } from '@capacitor/geolocation';
import { UtilsService } from '@core/services/utils.service';
import { CameraService } from '@core/services/camera.service';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';

import { Store } from '@ngrx/store';
import * as actions from '@store/actions';
import { AppState } from '@store/app.state';

@Component({
  selector: 'app-mechanics',
  templateUrl: './mechanics.component.html',
  styleUrls: ['./mechanics.component.scss'],
})
export class MechanicsComponent implements OnInit, AfterViewInit {

  @Input() category: any;

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
    private uService: UtilsService,
    private store: Store<AppState>,
    private db: DbCategoriesService,
    private cameraService: CameraService,
  ) { }

  ngOnInit() {
    this.loadReactiveForm();
    this.getData();
    console.log(this.formReactive);
  }

  ngAfterViewInit(): void {
    this.setDataForm();
  }

  getData() {
    this.vehicles$ = this.db.getVehicles();
  }

  onSubmit = async () => {
    await this.setReactive();
    const item = this.formReactive.value;
    console.log('VALUE ', item);
    await this.uService.load({ message: 'Loading...' });
    this.store.dispatch(actions.itemAdd({ item }));
    timer(500).subscribe(() =>{
      this.uService.loadDimiss();
      this.formReactive.reset();
      this.uService.navigate('service-open');
    });
  };

  getBrand = (ev: any) => {
    this.brands$ = this.db.getBrand(ev.detail.value);
  };

  getModels = (ev: any) => {
    this.models$ = this.db.getModel(ev.detail.value);
  };

  loadReactiveForm = () => {
    this.formReactive = this.fb.group({
      description: ['Test #1', [Validators.required, Validators.minLength(4)]],
      vehicle: ['', Validators.required],
      user: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      category: ['', Validators.required],
      latitude: [''],
      longitude: [''],
      year: ['2020'],
      pictures: [''],
    });
  };

  setReactive = async () => {
    this.formReactive.controls.pictures.setValue(this.capture);
    const position = await Geolocation.getCurrentPosition();
    if(position) {
      this.formReactive.controls.latitude.setValue(position.coords.latitude);
      this.formReactive.controls.longitude.setValue(position.coords.longitude);
    }

  };

  capturePhoto = async () => {
    const photo = await this.cameraService.takePhoto();
    if (photo) {
      this.capture.push(photo);
    }
    console.log(this.capture);
  };

  removeCapture = (id: string) => {
    this.capture = this.capture.filter((row: any) => row !== id);
  };

  // SETFORM USER
  private setDataForm() {
    this.formReactive.controls.category.setValue(this.category);
    this.store.select('user')
    .pipe(filter(row => !row.loading), map((res: any) => res.user))
    .subscribe((res) => {
      console.log(res);
      // eslint-disable-next-line no-underscore-dangle
      this.formReactive.controls.user.setValue(res._id);
    });
  }
}
