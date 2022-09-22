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
    translate.setDefaultLang('es');
    const browserLang = translate.getBrowserLang();
    storage.getStorage('language').then(res => {
      if(res === 2) {
        translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
      } else if(res === 3) {
        translate.use(browserLang.match(/en|es/) ? browserLang : 'pt');
      } else {
        translate.use(browserLang.match(/en|es/) ? browserLang : 'es');
      }
    });
  }

  use = (lang: string) => this.translate.use(lang);

  getDefaultLang = () => this.translate.getDefaultLang();
}
