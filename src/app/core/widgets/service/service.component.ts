import { WaitingComponent } from './../../../modules/categories/pages/waiting/waiting.component';
import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UtilsService } from '@core/services/utils.service';
import { MasterService } from '@core/services/master.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements AfterViewInit {

  service$: Observable<any>;

  constructor(
    private store: Store<AppState>,
    private uService: UtilsService,
  ) { }
  ngAfterViewInit(): void {
    this.getData();
  }

  getData(): void {
    this.service$ = this.store.select('item')
    .pipe(filter(row => !row.loading),
    map(({ item }: any) => item));
    this.service$.subscribe(res => console.log(res));
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
}
