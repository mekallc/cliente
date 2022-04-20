import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpEvent } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { StorageService } from '@core/services/storage.service';
import { ValidationTokenService } from '@core/services/validation-token.service';

@Injectable()
export default class ApiInterceptor implements HttpInterceptor {
  token: any;

  constructor(
    private storage: StorageService,
    private validationTokenService: ValidationTokenService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request.url);
    const promise = this.storage.getStorage('userClient');
    if (
    request.url.includes('setting')  ||
    request.url.includes('user/add') ||
    request.url.includes('user/change-password') ||
    request.url.includes('master/countries') ||
    request.url.includes('user/password-code') ||
    request.url.includes('user/change-password-code/') ||
    request.url.includes('/assets/i18n/')) {
      return next.handle(request);
    }
    this.validationTokenService.validate();
    return from(promise).pipe(
      mergeMap((user) => {
        const newClone = this.addToken(request, user.access);
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
      return clone;
    }
  }
}
