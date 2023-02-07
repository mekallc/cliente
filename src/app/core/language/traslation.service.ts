import { Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class TraslationService {

  constructor(
    storage: StorageService,
    private translate: TranslateService
    ) {
    translate.addLangs(['en', 'es', 'pt']);
    storage.getStorage('oUser')
    .then((res: any) => {
      if(res) {
        translate.use(res.language);
      }
    })
    .catch(err => {
      translate.setDefaultLang('es');
    });
  }

  use = (lang: string) => this.translate.use(lang);

  getDefaultLang = () => this.translate.getDefaultLang();
}
