import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const { url, version } = environment.api;

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor(
    private http: HttpClient
  ) {}

  getMaster(collection: string): Observable<any> {
    return this.http.get<any>(`${url}/${version}/${collection}`);
  }

  getMasterObserve(collection: string): Observable<any> {
    return this.http.get<any>(`${url}/${version}/${collection}`, { observe: 'response' });
  }

  postMaster(collection: string, data: any) {
    console.log(data);
    return this.http.post(`${url}/${version}/${collection}`, data);
  }

  patchMaster(collection: string, id: any, data: any) {
    return this.http.patch(`${url}/${version}/${collection}/${id}`, data);
  }

  patch2Master(collection: string, data: any) {
    return this.http.patch(`${url}/${version}/${collection}`, data);
  }

  changeToken(user: string, push: string) {
    return this.http.patch(`${url}/${version}/users/${user}`, { push });
  }

  getBanner = (lat: number, lng: number): Observable<any> =>  this.http.get<any>(
    `${url}/${version}/banner/list/user/?longitude=${lng}&latitude=${lat}`);
}
