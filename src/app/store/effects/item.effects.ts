import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as actions from '../actions';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';

@Injectable()

export class ItemEffects {
  service$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.itemLoad),
      mergeMap(() => this.db.getService()
        .pipe(
          map((item) => actions.itemLoaded({ item: item.search[0] })),
          catchError(async ({ error }) => actions.itemError({ error }))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.itemAdd),
      mergeMap((action: any) => this.db.setServices(action.item)
        .pipe(
          map((item) => actions.itemLoaded({ item })),
          catchError(async ({ error }) => actions.itemError({ error }))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.itemUpdate),
      mergeMap((action: any) => this.db.sendService(action.id, action.data)
        .pipe(
          map((item) => actions.itemLoaded({ item })),
          catchError(async ({ error }) => actions.itemError({ error }))
        )
      )
    )
  );

  changed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.itemStatus),
      map((item) => actions.itemLoaded({ item })),
      catchError(async ({ error }) => actions.itemError({ error }))
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.itemDelete),
      mergeMap((action: any) => this.db.cancelService(action.item)
        .pipe(
          map((item) => actions.itemLoaded({ item })),
          catchError(async ({ error }) => actions.itemError({ error }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private db: DbCategoriesService,
  ) {}
}
