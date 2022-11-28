import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';
import { Component, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UtilsService } from '@core/services/utils.service';
import { Socket } from 'ngx-socket-io';
import { RateComponent } from '@modules/rate/rate.component';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements AfterViewInit {

  service$: Observable<any> = this.socket.fromEvent('changeMessage');

  constructor(
    private socket: Socket,
    private store: Store<AppState>,
    private uService: UtilsService,
  ) { }
  ngAfterViewInit(): void {
    this.getData();
  }

  getData(): void {
    this.service$.subscribe(async res => {
      console.log(res);
      if (res.status === 'finished') {
        await this.setRating(res);
      }
    });
    // this.service$ = this.store.select('item')
    // .pipe(
    //   filter(row => !row.loading),
    //   map((res: any) => res.item)
    // );
  }

  openService(res: any){
    this.openWaiting(res);
  }

  private async openWaiting(res: any): Promise<void> {
    await this.uService.modal({
      mode: 'ios',
      initialBreakpoint: 1,
      breakpoints: [0, .5, 1],
      component: WaitingComponent,
      componentProps: { res },
   });
  }

  private async setRating(res: any) {
    await this.uService.modal({
      mode: 'ios',
      initialBreakpoint: 0.9,
      breakpoints: [0, 0.5, 1],
      component: RateComponent,
      componentProps: { service: res }
    });
  }
}
