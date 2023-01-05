/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MasterService } from '@core/services/master.service';
import { UtilsService } from '@core/services/utils.service';
import { AppState } from '@store/app.state';
import * as actions from '@store/actions';
import { filter, map, Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ifError } from 'assert';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
})
export class RateComponent implements OnInit {

  @Input() service: any;
  activeButton = false;
  comments: string;
  score = 4;

  constructor(
    private socket: Socket,
    private ms: MasterService,
    private store: Store<AppState>,
    private uService: UtilsService,
  ) { }

  ngOnInit(): void {
    this.getService();
  }

  async onSubmit(): Promise<void> {
    await this.uService.load({message: 'Procesando...'});
    this.getService().subscribe((item: any) => {
      const data = {
        service: item._id,
        score_company: this.score,
        user: item.user._id,
        comment_company: this.comments,
      };
      this.sendComments(item, data);
      timer(1000).subscribe(() => {
        this.uService.loadDimiss();
        this.uService.modalDimiss();
      });
    });
  }

  getStar(ev: number): void {
    this.score = ev;
  }

  private sendComments(item: any, data: any) {
    this.ms.patch2Master(`comments/${item.comment._id}`, data).subscribe(() => {
      item.status = 'closed';
      this.store.dispatch(actions.itemClosed({
        id: item._id,
        data: item
      }));
    });
  }

  private getService() {
    const data$: Observable<any> = this.store.select('item')
      .pipe(
        filter(row => !row.loading),
        map(({ item }: any) => {
          if (item.status === 'finished') {
            return item;
          }
        })
      );
    data$.subscribe(res => console.log(res));
    return data$;
  }
}
