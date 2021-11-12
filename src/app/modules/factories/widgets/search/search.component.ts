import { IonInput, ModalController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-factories-search-widget',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchFactoriesWidgetComponent implements OnInit {

  @ViewChild('search') search: IonInput;
  constructor(
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    await this.search.setFocus();
  }

  onClose = () => this.modalCtrl.dismiss();
}
