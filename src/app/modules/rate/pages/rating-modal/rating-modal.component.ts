import { ModalController } from '@ionic/angular';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  styleUrls: ['./rating-modal.component.scss'],
})
export class RatingModalComponent implements OnInit, OnChanges {

  num = 4;
  data: any = [];
  constructor(
    private modal: ModalController,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    throw new Error('Method not implemented.');
  }

  ngOnInit() {}

  onSubmit = () => console.log('object');

  getStar = (ev: number) => console.log(ev);

  onClose = () => this.modal.dismiss();

}
