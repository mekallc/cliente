import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { filter, map, Observable, timer } from 'rxjs';
import {v4 as uuidv4} from 'uuid';

import { Geolocation } from '@capacitor/geolocation';
import { UtilsService } from '@core/services/utils.service';
import { CameraService } from '@core/services/camera.service';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';

import { Store } from '@ngrx/store';
import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { StorageService } from '@core/services/storage.service';
import { slidesOptions } from './mechanics.data';
import { FireStorageService } from '@modules/chat/services/fire-storage.service';
import { timeStamp } from 'console';

@Component({
  selector: 'app-mechanics',
  templateUrl: './mechanics.component.html',
  styleUrls: ['./mechanics.component.scss'],
})
export class MechanicsComponent implements OnInit, AfterViewInit {

  @Input() category: any;
  @Input() autopart = false;

  coordinates: any;
  capture: any = [];
  formReactive: FormGroup;
  slideOpts = slidesOptions;

  brands$: Observable<any[]>;
  models$: Observable<any[]>;
  vehicles$: Observable<any[]>;
  conditions$: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private uService: UtilsService,
    private store: Store<AppState>,
    private storage: StorageService,
    private db: DbCategoriesService,
    private cameraService: CameraService,
    private storageService: FireStorageService,
  ) { }

  ngOnInit() {
    this.loadReactiveForm();
    this.getData();
    this.setAutopart();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.setDataForm();
  }

  getData() {
    this.vehicles$ = this.db.getVehicles();
    this.conditions$ = this.db.getTypeCondition();
  }

  async onSubmit(): Promise<void> {
    const photos: { picture: string; service: string }[] = [];
    await this.setReactive();
    const item: any = this.formReactive.value;
    if (this.capture.length > 0) {
      this.capture.forEach(async (el: any) => {
        const picture = await this.storageService.uploadService(uuidv4(), el);
        const photosService: any = { picture };
        photos.push(photosService);
      });
    }
    item.pictures = photos;
    await this.uService.load({ message: 'Salvando tu servicios...', duration: 750 });
    this.store.dispatch(actions.itemAdd({ item }));
    timer(750).subscribe(() =>{
      this.formReactive.reset();
      this.uService.navigate('service-open');
    });
  };

  getBrand(ev: any): void {
    this.brands$ = this.db.getBrand(ev.detail.value);
  };

  getModels(ev: any): void {
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
      type: [0],
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
  };

  removeCapture = (id: string) => {
    this.capture = this.capture.filter((row: any) => row !== id);
  };

  private setAutopart(): void {
    if (this.autopart) {
      this.formReactive.addControl('condition', new FormControl('', Validators.required));
      this.formReactive.controls.type.setValue(1);
    }
  }

  // SETFORM USER
  private async setDataForm() {
    this.formReactive.controls.category.setValue(this.category);
    const user: any = await this.storage.getStorage('oUser');
    this.formReactive.controls.user.setValue(user._id);
  }
}
