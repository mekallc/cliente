import { NgModule } from '@angular/core';
import { KeycloakAngularModule, KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';


@NgModule({
  declarations: [],
  imports: [KeycloakAngularModule],
  providers: [
    {
      provide: KeycloakService,
      useValue: KeycloakService
   }
  ],
})

export class KeycloakModule { }
