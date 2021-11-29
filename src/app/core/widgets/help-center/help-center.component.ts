import { ModalController } from '@ionic/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TawkService } from '@core/services/tawk.service';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss'],
  providers: [TawkService]
})
export class HelpCenterComponent implements OnInit, OnDestroy {

  constructor(
    private tawk: TawkService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.tawk.SetChatVisibility(false);
  }

  ngOnDestroy() {
    this.tawk.SetChatVisibility(true);
  }

  onClose = () => this.modalCtrl.dismiss();
}
