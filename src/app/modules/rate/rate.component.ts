/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MasterService } from '@core/services/master.service';
import { UtilsService } from '@core/services/utils.service';
import { AppState } from '@store/app.state';
import * as actions from '@store/actions';
import { timer } from 'rxjs';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
})
export class RateComponent {

  @Input() service: any;
  activeButton = false;
  comments: string;
  score = 4;

  constructor(
    private ms: MasterService,
    private store: Store<AppState>,
    private uService: UtilsService,
  ) { }

  async onSubmit(): Promise<void> {
    // await this.uService.load({message: 'Procesando...'});
    const data = {
      service: this.service._id,
      score_company: this.score,
      user: this.service.user._id,
      comment_company: this.comments,
    };
    console.log(data);
    this.ms.patch2Master(`comments/${this.service.comment._id}`, data).subscribe(() => {
      this.store.dispatch(actions.itemClosed({
        id: this.service._id,
        data: { status: 'closed' }
      }));
      timer(1500).subscribe(() => {
        this.uService.loadDimiss();
        this.uService.modalDimiss();
      });
    });
  }

  getStar(ev: number): void {
    this.score = ev;
  }
}
