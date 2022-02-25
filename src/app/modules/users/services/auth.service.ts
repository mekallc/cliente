import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Login, Register } from './interfaces';
import { MasterService } from '@core/services/master.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { loadUser } from '@store/actions/user.actions';
import { AppState } from '@store/app.state';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private ms: MasterService,
    private navCtrl: NavController,
    private store: Store<AppState>,
    private storage: StorageService,
    private alertCtrl: AlertController,
  ) { }

  /** Tokens */
  signIn(data: Login) {
    return this.ms.postMaster('setting/token/', data).pipe(
      map((res: any) => {
        this.refreshUser(res);
        this.refreshToken(res.access);
        this.store.dispatch(loadUser(res));
        return res;
      })
    );
  }

  signUp(data: any) {
    return this.ms.postMaster( '/user/add/', data).pipe(
      map(async (res: any) => {
        await this.refreshToken(res.token.access_token);
        delete res.token;
        await this.refreshUser(res);
        return res;
      })
    );
  }

  signOut = async () => {
    await this.storage.removeStorage('userClient');
    await this.storage.removeStorage('tokenClient');
    return this.navCtrl.navigateRoot('/user/signIn');
  };

  alertErr = async (message: string) => {
    const alert = await this.alertCtrl.create(
      { header: 'Error', message, buttons: ['OK'], mode:'ios'});
    await alert.present();
  };

  private refreshUser = async (user: any) => {
    await this.storage.removeStorage('userClient');
    await this.storage.setStorage('userClient', user);
  };

  private refreshToken = async (token: string) => {
    await this.storage.removeStorage('tokenClient');
    await this.storage.setStorage('tokenClient', token);
  };

  // signIn = async (data: any): Promise<any> => {
  //   try {
  //     const result = await this.http.post(`${api.url}/${api.version}/setting/token/`, data, api.headers);
  //     console.log(result.data);
  //     if (!result.data || !result.data.length) { return []; }
  //     this.setStorage(result.data);
  //     this.router.navigate(['pages', 'home']);
  //     this.getTokenRefresh();
  //   } catch (err) {
  //     const error = JSON.parse(err);
  //     const alert = await this.alertCtrl.create({header: 'Error', message: error.detail });
  //     await alert.present();
  //     return err;
  //   }
  // };

  // getRootToken = async (): Promise<any> => {
  //   const data = api.admin;
  //   try {
  //     const result = await this.http.post(`${api.url}/${api.version}/setting/token/`, data, api.headers);
  //     if (!result.data || !result.data.length) { return []; }
  //     const user = JSON.parse(result.data);
  //     return user.access;
  //   } catch (err) {
  //     console.error('An error occurred loading all customers:', err);
  //     return [];
  //   }
  // };

  // signUp = async (data: any): Promise<any> =>{
  //   try {
  //     const result = await this.http.post(`${api.url}/${api.version}/user/add/`, data, api.headers);
  //     return this.handle(result);
  //   } catch (err) {
  //     console.error('An error occurred loading all customers:', err);
  //     return err;
  //   }
  // };

  // signOut = async () => {
  //   await this.storage.removeStorage('token');
  //   return this.navCtrl.navigateRoot('/user/signIn');
  // };

  // decoded = async () => {
  //   const token = await this.storage.getStorage('token');
  //   if (token) {
  //     const { exp } = jwt_decode(token) as any;
  //     const hour = moment.unix(exp).diff(moment(), 'hours');
  //     if (hour === 1) {
  //       this.getTokenRefresh();
  //     }
  //   }
  // };
  // private setStorage = async (result: any) => {
  //   const user = JSON.parse(result);
  //   await this.storage.setStorage('token', { access: user.access, refresh: user.refresh });
  //   delete user.access;
  //   delete user.refresh;
  //   await this.storage.setStorage('user', user);
  //   await this.storage.getStorage('token');
  // };
  // private getTokenRefresh = async (token?: string): Promise<any> => {
  //   try {
  //     if (!token) {
  //       const  tok = await this.storage.getStorage('token');
  //       token = tok.refresh;
  //     };
  //     const result = await this.http.post(`${api.url}/${api.version}/setting/token/refresh/`, { refresh: token }, api.headers);
  //     const user = this.handle(result);
  //     await this.storage.setStorage('token', user.access);
  //   } catch (err) {
  //     console.error('An error occurred loading all customers:', err);
  //     return [];
  //   }
  // };

  // private handle = (result: any) => {
  //   if (!result.data || !result.data.length) { return []; }
  //   return JSON.parse(result.data);
  // };
}
