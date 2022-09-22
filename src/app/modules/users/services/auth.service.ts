import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { map, take } from 'rxjs/operators';
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
    private ms: MasterService,
    private navCtrl: NavController,
    private store: Store<AppState>,
    private storage: StorageService,
    private alertCtrl: AlertController,
  ) { }

  //TODO: Autoriza el accesso
  signIn(data: Login) {
    return this.ms.postMaster('users/login-cliente', data).pipe(
      take(1),
      map(async (res: any) => {
        await this.storage.setStorage('oAccess', res.access);
        await this.storage.setStorage('oUser', res.user);
        this.store.dispatch(loadUser(res));
        return res;
      })
    );
  }

  // TODO: Crea un usuario
  signUp(data: any) {
    return this.ms.postMaster( 'users', data).pipe(
      map(async (res: any) => {
        console.log(res);
        await this.storage.setStorage('oProfile', res);
        return this.navCtrl.navigateRoot('/user/signIn');
      })
    );
  }

  // TODO: Desloga la app
  signOut = async () => {
    await this.storage.clearStorages();
    return this.navCtrl.navigateRoot('/user/signIn');
  };

  // TODO: Get Countries
  getCountries = () => this.ms.getMaster('/tables/countries');

  updateToken = (token: string) => this.ms.changeToken(token);

  changePassword = (data: any) =>
    this.ms.postMaster('user/change-password/', data);

  forgotSenha = (data: any) =>
    this.ms.postMaster('user/password-code/', data);

  codeValidate = (data: any) =>
    this.ms.postMaster('user/change-password-code/', data);

  alertErr = async (message: string) => {
    const alert = await this.alertCtrl.create(
      { header: 'Error', message, buttons: ['OK'], mode:'ios'});
    await alert.present();
  };

  getRating = () => this.ms.getMaster('ratings/');

  private refreshUser = async (user: any) => {
    await this.storage.removeStorage('userClient');
    await this.storage.setStorage('userClient', user);
  };

  private refreshToken = async (token: string) => {
    await this.storage.removeStorage('tokenClient');
    await this.storage.setStorage('tokenClient', token);
  };
}
