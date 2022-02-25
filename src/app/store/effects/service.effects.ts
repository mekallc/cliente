import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as serviceActions from '../actions/service.actions';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';



@Injectable()
export class ServiceEffects {
  seervice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(serviceActions.loadService),
      mergeMap((action) => this.db.getServices(action.status)
        .pipe(
          map((service) => serviceActions.successService({ service })),
          catchError(async ({ error }) => serviceActions.errorService({ error }))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private db: DbCategoriesService
  ) {}
}
