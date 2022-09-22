import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
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
export class ServiceComponent implements OnInit {

  service$: Observable<any>;
  provider$: Observable<any>;

  constructor(
    private ms: MasterService,
    private store: Store<AppState>,
    private uService: UtilsService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.service$ = this.store.select('item')
    .pipe(filter(row => !row.loading),
    map((res: any) => {
      this.getProvider(res.item);
      return res.item;
    }));
    this.service$.subscribe(res => console.log(res));
  }

  getProvider(service: any) {
    if (service) {
      this.provider$ = this.ms.getMaster(`companies/${service.company}`);
    }
  }

  openService = () => {
    this.uService.navigate('in-progress');
  };

}
