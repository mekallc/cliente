import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';

import { MasterService } from '@core/services/master.service';
import { StorageService } from '@core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationTokenService {

  constructor(
    private ms: MasterService,
    private storage: StorageService,
  ) { }

  validate = async () => {
    const user = await this.storage.getStorage('userClient');
    const decode: any = jwt_decode(user.access);
    const exp = moment().diff(moment.unix(decode.exp), 'hours');
    if (exp >= -1) {
      this.refreshToken(user.refresh);
     }
  };

  refreshToken = (refresh: string) => {
    this.ms.postMaster('setting/token/refresh/', { refresh }).subscribe(async (res: any) => {
      await this.storage.removeStorage('tokenClient');
      await this.storage.setStorage('tokenClient', res.access);
    });
  };

}
