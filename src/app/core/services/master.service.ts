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

  postMaster(collection: string, data: any) {
    return this.http.post(`${url}/${version}/${collection}`, data);
  }
}
