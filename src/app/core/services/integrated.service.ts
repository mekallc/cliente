import { statusChanged } from './../../store/actions/status.actions';
import { itemStatus } from './../../store/actions/item.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { LocalNotifications } from '@capacitor/local-notifications';
import * as action from '@store/actions';
import { AppState } from '@store/app.state';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';

@Injectable({
  providedIn: 'root'
})

export class IntegratedService {
  private constructor(
    private store: Store<AppState>,
    private db: DbCategoriesService,
  ) {
  }

  newAccepted = () => {
    interval(1 * 5 * 1000).subscribe(() => {
      this.getFunctions();
    });
  };

  getStatus = () => {
    this.store.select('item').pipe(
      filter(row => !row.loading), map(res => res.item)
    )
    .subscribe(res => {
      if(res) {
        this.store.dispatch(action.statusChanged({ status: res.status }));
      }
    });
  };

  private getFunctions = () => {
    this.store.select('status').subscribe(
      ({status}) => {
        if(status === 'IN_PROCESS') {
          console.log('IN PROCESS');
        }
      }
    );
    // const item$: Observable<any> = this.store.select('item')
    // .pipe(
    //   filter(row => !row.loading),
    //   map((data: any) => data.item),
    //   switchMap(data => {
    //     console.log(data.status);
    //     if (data.status !== 'CANCELLED') {
    //       return this.db.getChangedStatusService(data.id)
    //       .pipe(
    //         take(1),
    //         map((res: any) => {
    //           if (data.status !== res.status) {
    //             this.store.dispatch(action.itemStatus({ item: res}));
    //             console.log(res);
    //           } else {
    //             console.log(`IGUAL: ${res.status} === ${data.status} `);
    //           }
    //           return res;
    //         })
    //       );
    //     }
    //   })
    // );
    // item$.subscribe(data => console.log('DATA ', data));
    // let count = 0;
    // this.getStore().pipe(take(1)).subscribe(res => {
    //   console.log('COUNT ', count++);
    //   if(res && res.status !== 'OPEN') {
    //     this.db.getChangedStatusService(res.id).pipe(take(1))
    //     .subscribe(data => {
    //       if(res.status !== data.status) {
    //         console.log(`[${count++}] CHANGED: ${res.status} === ${data.status}`);
    //         console.log(data);
    //         // this.store.dispatch(action.itemDelete({ id: id.status }));
    //         this.store.dispatch(action.itemStatus({ item: data }));
    //       }
    //     });
    //   }
    // });
  };
}
