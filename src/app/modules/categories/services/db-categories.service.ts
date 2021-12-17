import { Injectable } from '@angular/core';
import { MasterService } from '@core/services/master.service';
import { Geolocation } from '@capacitor/geolocation';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbCategoriesService {
  constructor(
    private ms: MasterService
  ) {}

  getIcone = () => this.ms.getMaster('master/expert/');
  getBrand = () => this.ms.getMaster('master/vehicle-brand/');
  getModel = () => this.ms.getMaster('master/vehicle-model/');
  getVehicles = () => this.ms.getMaster('master/types-vehicle/');
  getTypeCondition = () => this.ms.getMaster('master/vehicle-condition/');

  setServices(data: any) {
    return this.ms.postMaster(`service/request/add/`, data);
  }

  getServices() {
    return this.ms.getMaster('service/request/list/');
  }
}
