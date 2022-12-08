/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Store } from '@ngrx/store';

import * as action from '@store/actions';
import { AppState } from '@store/app.state';
import { UtilsService } from '@core/services/utils.service';
import { MasterService } from '@core/services/master.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  styleUrls: ['./rating-modal.component.scss'],
})
export class RatingModalComponent implements OnInit {

  @Input() service: any;
  activeButton = false;

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private ms: MasterService,
    private store: Store<AppState>,
    private uService: UtilsService,
  ) { }


  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.form = this.fb.group({
      score: ['', Validators.required],
      comment: ['']
    });
  }

  async onSubmit(): Promise<void> {
    const data = {
      service: this.service._id,
      score: this.form.value.score,
      comment: this.form.value.comment,
      user: this.service.user._id
    };
    console.log(data);
    await this.uService.load({ message: 'Procesando...', duration: 1300 });
    this.ms.postMaster('comments', data).subscribe(() => {
      this.store.dispatch(action.itemClosed({
        id: this.service._id,
        data: { status: 'closed' }
      }));
      timer(1500).subscribe(() => this.uService.modalDimiss());
    });
  };

  getStar(ev: number): void {
    this.form.controls.score.setValue(ev);
  }
}
