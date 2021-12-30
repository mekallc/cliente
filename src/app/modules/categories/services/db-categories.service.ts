import { Injectable } from '@angular/core';
import { MasterService } from '@core/services/master.service';
import { Geolocation } from '@capacitor/geolocation';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DbCategoriesService {
  constructor(
    private ms: MasterService
  ) {}

  getBrand = () => this.ms.getMaster('master/vehicle-brand/');
  getModel = () => this.ms.getMaster('master/vehicle-model/');
  getVehicles = () => this.ms.getMaster('master/types-vehicle/');
  getTypeCondition = () => this.ms.getMaster('master/vehicle-condition/');
  getIcone = () => this.ms.getMaster('master/expert/');

  setServices = (data: any) => this.ms.postMaster(`service/request/add/`, data);
  getServices = () => this.ms.getMaster('service/request/list/?ordering=-date_reg').pipe(map((res: any) => res.search));
  getTypeExpert = () => this.ms.getMaster('master/expert/');
}
