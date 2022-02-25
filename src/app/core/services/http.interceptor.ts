import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpEvent } from '@angular/common/http';
import { EMPTY, from, Observable } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { StorageService } from '@core/services/storage.service';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';

@Injectable()
export default class ApiInterceptor implements HttpInterceptor {
  token: any;

  constructor(
    private store: Store<AppState>,
    private storage: StorageService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const promise = this.storage.getStorage('tokenClient');
    console.log(request.url);
    if (
    request.url.includes('setting')  ||
    request.url.includes('user/add') ||
    request.url.includes('/assets/i18n/') ||
    request?.url.includes('master')) {
      console.log('Bloqueado');
      return next.handle(request);
    }
    return from(promise).pipe(
      mergeMap((token) => {
        const newClone = this.addToken(request, token);
        return next.handle(newClone);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: any) {
    if (token) {
      const clone: HttpRequest<any> = request.clone({
        setHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      });
      console.log('Paso');
      return clone;
    }
  }
}
