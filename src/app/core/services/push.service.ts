import { Injectable } from '@angular/core';
import { PushNotifications, PushNotificationSchema } from '@capacitor/push-notifications';
import { MasterService } from '@core/services/master.service';
import { StorageService } from '@core/services/storage.service';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';


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

  addListeners = () => {
    PushNotifications.addListener('registration', async (token: any) => {
      console.log('TOKEN VDD', token.value);
      await this.storage.setStorage('oPush', token.value);
    });
    PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });
    PushNotifications.addListener('pushNotificationReceived',
    async (notification: PushNotificationSchema): Promise<void> => {
      console.log('Push notification received: ', notification);
      const not: ScheduleOptions = {
        notifications: [{
          id: Date.now(),
          body: notification.body,
          title: notification.title,
          ongoing: false,
        }]
      };
      const result = await LocalNotifications.schedule(not);
      console.log(result);
    });
    PushNotifications.addListener('pushNotificationActionPerformed', notification => { });
  };

  getDeliveredNotifications = async () => {
    const notificationList = await PushNotifications.getDeliveredNotifications();
  };
}
