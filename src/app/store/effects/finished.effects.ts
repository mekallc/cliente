import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { finishedLoad, finishedLoaded, finishedError } from '../actions/finished.actions';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';



@Injectable()
export class FinishedEffects {
  history$ = createEffect(() =>
    this.actions$.pipe(
      ofType(finishedLoad),
      mergeMap(() => this.db.getStatusServices('closed')
        .pipe(
          map((finished) => finishedLoaded({ finished })),
          catchError(async ({ error }) => finishedError({ error }))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private db: DbCategoriesService
  ) {}
}
