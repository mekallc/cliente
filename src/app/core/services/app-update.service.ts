import { Injectable } from '@angular/core';
// import { AppUpdate, AppUpdateInfo } from '@capawesome/capacitor-app-update';

@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {

  async initialize(): Promise<void> {
    // const appUpdateInfo: AppUpdateInfo = await AppUpdate.getAppUpdateInfo();
    // if (appUpdateInfo && appUpdateInfo.immediateUpdateAllowed) {
    //   await AppUpdate.performImmediateUpdate();
    // }
  }
}
