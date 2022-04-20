import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as actions from '../actions/accepted.actions';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';



@Injectable()
export class AcceptedEffects {
  seervice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadAccepted),
      mergeMap(() => this.db.getServices('ACCEPTED')
        .pipe(
          map((accepted) => actions.successAccepted({ accepted })),
          catchError(async ({ error }) => actions.errorAccepted({ error }))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private db: DbCategoriesService
  ) {}
}
