// eslint-disable-next-line max-len
import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import * as actions from '@store/actions';
import { UtilsService } from '@core/services/utils.service';
import { MasterService } from '@core/services/master.service';
import { RoomChatPage } from '@modules/chat/pages/room/room.page';

declare let google: any;

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss'],
})
export class WaitingComponent implements OnInit {

  @Input() res: any;
  iconCompany = 'https://meka-server.s3.us-east-2.amazonaws.com/app/icons/01.svg';
  openImage = false;
  slideOpts = { spaceBetween: 10, slidesPerView: 2.3, };

  constructor(
    private store: Store<AppState>,
    private uService: UtilsService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {}

  async onChat(uid: string): Promise<void> {
    this.uService.modalDimiss();
    await this.uService.modal({
      component: RoomChatPage,
      componentProps: { uid },
      mode: 'ios',
      initialBreakpoint: 1,
      breakpoints: [0, .5, 1],
    });
    // this.uService.navigate(`chat/service/${room}`);
  };

  async onCancelService(item: any): Promise<void> {
    await this.uService.alert({
      header: 'Info',
      message: this.translate.instant('WILL_YOU_ELIMINATE_THIS_SERVICE'),
      buttons:[
        { text: 'Cancel', role: 'cancel', },
        {
          text: 'Okay', id: 'confirm-button',
          handler: async (): Promise<void> => this.executeOnCancel(item)
        }
      ]
    });
  };

  onClose(): void {
    this.uService.modalDimiss();
  }
  toogle = () => this.openImage = !this.openImage;
  openPicture = (url: string) => console.log('Photo Viewer');

  private async executeOnCancel(item: any): Promise<void> {
    await this.uService.load({ message: this.translate.instant('PROCESSING') });
    item.status = 'cancelled';
    // eslint-disable-next-line no-underscore-dangle
    this.store.dispatch(actions.itemDelete({ id: item._id, data: item }));
    this.uService.loadDimiss();
    this.uService.modalDimiss();
    this.uService.navigate('/pages/home');
  };
}
