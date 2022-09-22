// eslint-disable-next-line max-len
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import * as actions from '@store/actions';
import { UtilsService } from '@core/services/utils.service';
import { MasterService } from '@core/services/master.service';

declare let google: any;

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss'],
})
export class WaitingComponent implements OnInit, AfterViewInit {

  service$: Observable<any>;
  provider$: Observable<any>;
  openImage = false;
  slideOpts = { spaceBetween: 10, slidesPerView: 2.3, };

  constructor(
    private ms: MasterService,
    private store: Store<AppState>,
    private uService: UtilsService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit(): void { }

  getData = () => {
    this.service$ = this.store.select('item').pipe(
      filter(row => !row.loading),
      map((res: any) => {
        this.getProvider(res.item.company);
        return res.item;
      }),
    );
  };

  getProvider(company: string) {
    this.provider$ = this.ms.getMaster(`companies/${company}`);
  }

  onChat = (room: any,) => {
    this.uService.navigate(`chat/service/${room}`);
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

  onClose = () => this.uService.navigate('pages/home');
  toogle = () => this.openImage = !this.openImage;
  openPicture = (url: string) => console.log('Photo Viewer');

  private async executeOnCancel(item: any): Promise<void> {
    await this.uService.load({ message: this.translate.instant('PROCESSING') });
    this.store.dispatch(actions.itemDelete({ id: item.id }));
    this.uService.loadDimiss();
    this.uService.navigate('/pages/home');
  };
}
