import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as historyActions from '../actions/history.actions';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';



@Injectable()
export class HistoryEffects {
  history$ = createEffect(() =>
    this.actions$.pipe(
      ofType(historyActions.loadHistory),
      mergeMap(() => this.db.getServicesClosed()
        .pipe(
          map((history) => {
            console.log(history);
            return historyActions.successHistory({ history });
          }),
          catchError(async ({ error }) => historyActions.errorHistory({ error }))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private db: DbCategoriesService
  ) {}
}
