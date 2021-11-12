import { Component, OnInit } from '@angular/core';
import { CameraService } from 'src/app/core/services/camera.service';
import { TablesService } from 'src/app/core/services/tables.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: 'solicitud.page.html',
  styleUrls: ['solicitud.page.scss'],
})
export class SolicitudPage implements OnInit {

  segment = 'mechanics';
  now: any;
  years: any = [];
  brands: any = [];
  models: any = [];
  capture: any = [];
  vehicles: any = [];
  conditions: any = [];
  filterBrands: any = [];
  filterModels: any = [];

  slideOpts = {
    speed: 400,
    loop: true,
    freeMode: true,
    spaceBetween: 20,
    slidesPerView: 1.2,
    allowTouchMove: true,
    autoplay: {delay: 2000},
  };

  constructor(
    private cameraService: CameraService,
    private tablesService: TablesService,
  ) {}

    async ngOnInit() {
      const currentime = new Date();
      this.now = currentime.getFullYear();
      this.brands = await this.tablesService.getTable('vehicle-brand');
      this.models = await this.tablesService.getTable('vehicle-model');
      this.vehicles = await this.tablesService.getTable('types-vehicle');
      this.conditions = await this.tablesService.getTable('vehicle-condition');
    }

  getBrand = (ev: any) => {
    const value = ev.detail.value;
    const filter = this.brands.filter((row: any) => row.types_vehicle.find((el: any) => el === value));
    this.filterBrands = filter;
  };

  getModel = (ev: any) => {
    const value = ev.detail.value;
    const filter = this.models.filter((row: any) => row.brand === value);
    this.filterModels = filter;
  };

  capturePhoto = async () => {
    const photo = await this.cameraService.takePhoto();
    this.capture.push(photo);
  };

  removeCapture = (id: string) => {
    this.capture = this.capture.filter((row: any) => row !== id);
  };

  segmentChanged = (ev: any) => this.segment = ev.detail.value;
}
