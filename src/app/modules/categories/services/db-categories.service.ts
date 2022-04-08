import { Injectable } from '@angular/core';
import { MasterService } from '@core/services/master.service';
import { Geolocation } from '@capacitor/geolocation';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { StringFormat } from 'firebase/storage';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbCategoriesService {
  constructor(
    private ms: MasterService
  ) {}

  getBrand = (type: any) => this.ms.getMaster(`master/vehicle-brand-type-vehicle/?type=${type}`);
  getModel = (brand: any) => this.ms.getMaster(`master/vehicle-model-brand/?brand=${brand}`);
  getVehicles = () => this.ms.getMaster('master/types-vehicle/');
  getTypeCondition = () => this.ms.getMaster('master/vehicle-condition/');
  getIcone = () => this.ms.getMaster('master/expert/');

  setServices = (data: any) => this.ms.postMaster(`service/request/add/`, data);
  getServices = (status='OPEN') => this.ms.getMaster(`service/request/list/?ordering=-date_reg&search=${status}`).pipe(
    map((res: any) => res.search.filter((row: any) => row.status === status))
  );
  getServicesClosed = () => this.ms.getMaster(`service/request/history/?ordering=-date_reg`).pipe(map((res: any) => res.search));
  getTypeExpert = () => this.ms.getMaster('master/expert/');

  cancelService = (id: any) => this.ms.patchMaster('service/request', id, { status: 'CANCELLED' });
  deleteService = (id: any) => this.ms.patchMaster('service/request', id, { is_delete: true });

  getCompanies = (company: number, expert: number, lat: string, lng: string) => {
    const query = `?longitude=${lng}&latitude=${lat}&type_company=${company}&type_expert=${expert}`;
    return this.ms.getMaster(`user/company/list${query}`);
  };

  sendService = (id: number, data: any) => this.ms.patchMaster('service/request', id, data);
}
