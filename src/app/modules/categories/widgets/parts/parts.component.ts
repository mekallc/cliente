import { Component, OnInit } from '@angular/core';
import { CameraService } from '@core/services/camera.service';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss'],
})
export class PartsComponent implements OnInit {

  brands$: Observable<any[]>;
  models$: Observable<any[]>;
  vehicles$: Observable<any[]>;
  conditions$: Observable<any[]>;

  now: any;
  years: any = [];
  brands: any = [];
  models: any = [];
  capture: any = [];

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
    private db: DbCategoriesService,
    private cameraService: CameraService,
  ) { }

  ngOnInit() {
    this.vehicles$ = this.db.getVehicles();
    this.conditions$ = this.db.getTypeCondition();
  }

  fiterBrand = (ev: any) => {
    const value = ev.detail.value;
    this.brands$ = this.db.getBrand().pipe(
      map((res) => res.filter((row: any) => row.types_vehicle.find((el: any) => el.id === value)))
    );
      // this.brands$.subscribe((res) => console.log(res));
  };

  filterModel = (ev: any) => {
    this.models$ = this.db.getModel().pipe(
      map((res: any) => res.filter((row: any) => row.brand === ev.detail.value))
    );
  };

  capturePhoto = async () => {
    const photo = await this.cameraService.takePhoto();
    this.capture.push(photo);
  };

  removeCapture = (id: string) => {
    this.capture = this.capture.filter((row: any) => row !== id);
  };
}
