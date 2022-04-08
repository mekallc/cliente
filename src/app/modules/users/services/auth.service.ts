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
    return this.ms.postMaster( 'user/add/', data).pipe(
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

  private refreshUser = async (user: any) => {
    await this.storage.removeStorage('userClient');
    await this.storage.setStorage('userClient', user);
  };

  private refreshToken = async (token: string) => {
    await this.storage.removeStorage('tokenClient');
    await this.storage.setStorage('tokenClient', token);
  };
}
