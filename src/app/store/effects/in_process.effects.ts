import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as actions from '../actions/in_process.actions';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';



@Injectable()
export class InProcessEffects {
  seervice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadInProcess),
      mergeMap(() => this.db.getServices('IN_PROCESS')
        .pipe(
          map((inProcess) => actions.successInProcess({ inProcess })),
          catchError(async ({ error }) => actions.errorInProcess({ error }))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private db: DbCategoriesService
  ) {}
}
