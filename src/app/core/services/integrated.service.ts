/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs/operators';
import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { ChatService } from '@core/services/chat.service';
import { UtilsService } from '@core/services/utils.service';
import { StorageService } from '@core/services/storage.service';
import { RatingModalComponent } from '@modules/rate/pages/rating-modal/rating-modal.component';

@Injectable({
  providedIn: 'root'
})

export class IntegratedService {
  private constructor(
    private uService: UtilsService,
    private store: Store<AppState>,
    private storage: StorageService,
    private chatService: ChatService,
  ) { }


  async initStates(): Promise<void> {
    const user = await this.storage.getStorage('oUser');
    if (user) {
      this.store.dispatch(actions.loadUser(user));
      this.store.dispatch(actions.itemLoad({ user: user._id }));
    }
  };

  pageStates() {
    this.store.dispatch(actions.expertLoad());
    this.store.dispatch(actions.finishedLoad());
    this.store.dispatch(actions.cancelledLoad());
  }

  // INGRESA EL ROOM SI EL SERVICIO ESTA ABIERTO
  onServiceStatus() {
    this.store.select('item')
    .pipe(
      filter(row => !row.loading),
      map((res: any) => res.item)
    )
    .subscribe((res: any) => {
      if (res) {
        this.chatService.joinService(res._id);
        this.navigateWithStatus(res);
      }
    });
  }

  private async navigateWithStatus(service: any) {
    const status = service.status;
    if (status === 'open') {
      this.uService.navigate('service-open');
    }
    else if(status === 'finished') {
      await this.uService.modal({
        mode: 'ios',
        initialBreakpoint: 0.85,
        breakpoints: [0, 0.85, 1],
        component: RatingModalComponent,
        componentProps: { service }
      });
    }
  }
}
