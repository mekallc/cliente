import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { cancelledError, cancelledLoad, cancelledLoaded } from '../actions/cancelled.actions';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';



@Injectable()
export class CancelledEffects {
  services$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cancelledLoad),
      mergeMap(() => this.db.getStatusServices('cancelled')
        .pipe(
          map((cancelled) => cancelledLoaded({ cancelled })),
          catchError(async ({ error }) => cancelledError({ error }))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private db: DbCategoriesService
  ) {}
}
