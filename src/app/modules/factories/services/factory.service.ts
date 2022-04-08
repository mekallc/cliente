import { Injectable } from '@angular/core';
import { MasterService } from '@core/services/master.service';



@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor(
    private ms: MasterService
  ) { }

  getCompaniesLocation = () => { };

  private calculate = (start: any, end: any) => {
    const a = new google.maps.LatLng(start);
    const b = new google.maps.LatLng(end);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(a, b);
    return distance;
  };
}
