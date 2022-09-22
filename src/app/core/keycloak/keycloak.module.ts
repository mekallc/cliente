import { APP_INITIALIZER, NgModule } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://keycloak.meka.do/auth',
        realm: 'meka',
        clientId: 'angular-web-client',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '../../../assets/silent-check-sso.html',
      },
    });
}

@NgModule({
  declarations: [],
  imports: [KeycloakAngularModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
})
export class KeycloakModule { }
