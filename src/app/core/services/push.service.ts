import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { MasterService } from '@core/services/master.service';
import { StorageService } from '@core/services/storage.service';

@Injectable({
  providedIn: 'root'
})

export class PushService {
  constructor(
    private ms: MasterService,
    private storage: StorageService,
  ) { }


  initPush(): void {
    this.registerNotifications();
    this.addListeners();
    this.getDeliveredNotifications();
  }

  registerNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
    await PushNotifications.register();
  };

  addListeners = async () => {
    await PushNotifications.addListener('registration', async (token: any) => {
      await this.storage.setStorage('push', token.value);
      await this.updateToken(token.value);
    });
    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });
    await PushNotifications.addListener('pushNotificationReceived', notification => { });
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => { });
  };

  getDeliveredNotifications = async () => {
    const notificationList = await PushNotifications.getDeliveredNotifications();
  };

  updateToken = async (token: any)=>{
    this.ms.changeToken(token).subscribe((res) => {});
  };
}
