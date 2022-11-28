import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Login } from './interfaces';
import { MasterService } from '@core/services/master.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { AppState } from '@store/app.state';
import { Observable } from 'rxjs';

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
  signIn(data: Login): Observable<any> {
    return this.ms.postMaster('users/login-cliente', data);
  }

  // TODO: Crea un usuario
  signUp(data: any): Observable<Promise<boolean>> {
    return this.ms.postMaster( 'users', data).pipe(
      map(async (res: any): Promise<boolean> => {
        console.log(res);
        await this.storage.setStorage('oProfile', res);
        return this.navCtrl.navigateRoot('/user/signIn');
      })
    );
  }

  // TODO: Desloga la app
  async signOut(): Promise<boolean> {
    await this.storage.clearStorages();
    return this.navCtrl.navigateRoot('/user/signIn');
  };

  // TODO: Get Countries
  getCountries = () => this.ms.getMaster('/tables/countries');

  changePassword(data: any): Observable<any> {
    return this.ms.postMaster('auth/change-password', data);
  }

  forgotSenha(data: any): Observable<any> {
    return this.ms.postMaster('auth/forgot-password', data);
  }

  alertErr = async (message: string) => {
    const alert = await this.alertCtrl.create(
      { header: 'Error', message, buttons: ['OK'], mode:'ios'});
    await alert.present();
  };

  getRating = () => this.ms.getMaster('ratings/');
}
